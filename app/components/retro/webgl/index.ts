import * as THREE from "three";
import DeltaTime from "../DeltaTime";
import Screen from "./screen/";
import { loadAssists, type LoaderElements } from "./loader";
import { Vector3 } from "three";
import type { TerminalElements } from "../terminal";

function valMap(x: number, from: [number, number], to: [number, number]) {
  const y = ((x - from[0]) / (from[1] - from[0])) * (to[1] - to[0]) + to[0];

  if (to[0] < to[1]) {
    if (y < to[0]) return to[0];
    if (y > to[1]) return to[1];
  } else {
    if (y > to[0]) return to[0];
    if (y < to[1]) return to[1];
  }

  return y;
}

export type WebGLElements = TerminalElements & LoaderElements;

/**
 * Boot the retro computer scene.
 *
 * Differs from the original in three ways, all of them consequences of living
 * inside a React tree rather than owning the document:
 *   - every DOM node arrives as an argument instead of via `querySelector`
 *   - module-level state (scroll position, listeners) moved inside the call, so
 *     mounting twice cannot have one instance clobber the other's state
 *   - returns `dispose()`, which cancels the animation frame, detaches every
 *     listener, and releases the GPU resources
 */
export default function WebGL(elements: WebGLElements) {
  const { canvas, textarea } = elements;

  // One controller for every listener this function registers.
  const ac = new AbortController();
  const { signal } = ac;
  let frameHandle = 0;
  let disposed = false;
  let teardown: (() => void) | null = null;

  let viewHeight = document.documentElement.clientHeight;
  let scroll = window.scrollY / document.documentElement.clientHeight;
  window.addEventListener(
    "scroll",
    () => {
      scroll = window.scrollY / viewHeight;
    },
    { passive: true, signal }
  );

  loadAssists(elements, (assists) => {
    // The loader is asynchronous — the component may already be gone.
    if (disposed) return;

    if (window.location.hash.toLowerCase() === "#debug") {
      textarea.style.zIndex = "3";
      textarea.style.opacity = "1";
    }

    /**
     * Sizes
     */
    const sizes = {
      width: document.documentElement.clientWidth,
      height: window.innerHeight,
      portraitOffset: valMap(
        window.innerHeight / document.documentElement.clientWidth,
        [0.75, 1.75],
        [0, 2]
      ),
    };

    // Scene
    const scene = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);
    scene.background = new THREE.Color(0xb9b9b9);

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      50,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(0, 0, -2.5);
    // camera.position.set(0, -1, -5.5);
    camera.rotation.set(-Math.PI, 0, Math.PI);
    scene.add(camera);

    // Controls
    const controlProps = {
      computerHeight: 1.5,
      computerAngle: Math.PI * 0.2,
      computerHorizontal: 0.5,

      minAzimuthAngleOffest: -Math.PI * 0.3,
      maxAzimuthAngleOffest: Math.PI * 0.3,

      minPolarAngleOffest: -Math.PI * 0.3,
      maxPolarAngleOffest: 0,
    };

    let mousedown: { x: number; y: number } | null = null;
    function checkIfTouch(event: PointerEvent) {
      if (event.pointerType !== "mouse") {
        mousedown = null;
        computerParallax.x = 0;
        computerParallax.y = 0;
      }
    }
    const computerParallax = { x: 0, y: 0 };
    canvas.addEventListener(
      "pointermove",
      (event) => {
        checkIfTouch(event);
        if (mousedown) {
          computerParallax.x +=
            (event.clientX - mousedown.x) / (window.innerWidth * 0.5);
          computerParallax.x = valMap(computerParallax.x, [-1, 1], [-1, 1]);

          computerParallax.y +=
            (event.clientY - mousedown.y) / (window.innerHeight * 0.5);
          computerParallax.y = valMap(computerParallax.y, [-1, 1], [-1, 1]);

          mousedown = { x: event.clientX, y: event.clientY };
        }
      },
      { passive: true, signal }
    );

    canvas.addEventListener(
      "pointerdown",
      (event) => {
        checkIfTouch(event);
        mousedown = { x: event.clientX, y: event.clientY };
      },
      { passive: true, signal }
    );

    document.addEventListener(
      "pointerup",
      (event) => {
        checkIfTouch(event);
        mousedown = null;
      },
      { passive: true, signal }
    );

    /**
     * Renderer
     */

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(2);
    renderer.outputEncoding = THREE.sRGBEncoding;

    function updateCanvasSize(width: number, height: number) {
      // Update camera
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(width, height);
    }
    window.addEventListener(
      "resize",
      () => {
        // Update sizes

        viewHeight = document.documentElement.clientHeight;
        sizes.width = document.documentElement.clientWidth;
        sizes.height = window.innerHeight;
        updateCanvasSize(sizes.width, sizes.height);
        sizes.portraitOffset = valMap(
          sizes.height / sizes.width,
          [0.8, 1.8],
          [0, 2.5]
        );
      },
      { passive: true, signal }
    );

    const screen = Screen(assists, renderer, elements);

    const planelikeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const plane = new THREE.Mesh(
      planelikeGeometry,
      // texture
      new THREE.MeshBasicMaterial({ color: "blue" })
    );
    plane.scale.x = 1.33;

    // Materials
    const computerMaterial = new THREE.MeshBasicMaterial({
      map: assists.bakeTexture,
    });

    /**
     * Models
     */
    const computerGroup = new THREE.Group();

    assists.screenMesh.material = screen.screenRenderEngine.material;
    computerGroup.add(assists.screenMesh);

    assists.computerMesh.material = computerMaterial;
    computerGroup.add(assists.computerMesh);

    assists.crtMesh.material = computerMaterial;
    computerGroup.add(assists.crtMesh);

    assists.keyboardMesh.material = computerMaterial;
    computerGroup.add(assists.keyboardMesh);

    assists.shadowPlaneMesh.material = new THREE.MeshBasicMaterial({
      map: assists.bakeFloorTexture,
    });
    computerGroup.add(assists.shadowPlaneMesh);

    computerGroup.position.x = controlProps.computerHorizontal;
    computerGroup.position.y = controlProps.computerHeight;
    computerGroup.rotation.y = controlProps.computerAngle;
    scene.add(computerGroup);

    /**
     * Animate
     */

    const clock = new THREE.Clock();
    const tick = () => {
      const deltaTime = DeltaTime();

      const elapsedTime = clock.getElapsedTime();

      const zoomFac = valMap(scroll, [0, 1], [0, 1]);

      camera.position.z = valMap(
        scroll,
        [0, 1],
        [-2.5 - sizes.portraitOffset, -10 - sizes.portraitOffset]
      );

      computerGroup.position.x = controlProps.computerHorizontal * zoomFac;
      computerGroup.position.y = valMap(
        scroll,
        [0, 1],
        [0, controlProps.computerHeight]
      );

      computerGroup.rotation.y = controlProps.computerAngle * zoomFac;

      camera.position.x =
        computerParallax.x * valMap(scroll, [0, 1], [0.2, 5]) * 0.1 +
        camera.position.x * 0.9;
      camera.position.y =
        computerParallax.y * valMap(scroll, [0, 1], [0.2, 1.5]) * 0.1 +
        camera.position.y * 0.9;

      camera.lookAt(new Vector3(0, 0, 0));

      canvas.style.opacity = `${valMap(scroll, [1.25, 1.75], [1, 0])}`;

      if (sizes.portraitOffset > 0.5)
        computerGroup.rotation.z = valMap(scroll, [0, 1], [-Math.PI / 2, 0]);
      else computerGroup.rotation.z = 0;

      if (assists.crtMesh.morphTargetInfluences) {
        assists.crtMesh.morphTargetInfluences[0] = valMap(
          zoomFac,
          [0, 0.1],
          [0.5, 0]
        );
      }

      screen.tick(deltaTime, elapsedTime);

      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      // Call tick again on the next frame
      frameHandle = window.requestAnimationFrame(tick);
    };

    frameHandle = window.requestAnimationFrame(tick);

    // Everything below only exists once the assets have loaded, so the
    // teardown for it is registered here rather than in the outer scope.
    teardown = () => {
      window.cancelAnimationFrame(frameHandle);
      screen.dispose();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const material = mesh.material;
        if (Array.isArray(material)) material.forEach((m) => m.dispose());
        else if (material) material.dispose();
      });
      planelikeGeometry.dispose();
      renderer.dispose();
    };
  });

  /**
   * Tear the scene down. Safe to call before the assets finish loading — the
   * `disposed` flag makes the loader callback a no-op in that case.
   */
  function dispose() {
    disposed = true;
    ac.abort();
    window.cancelAnimationFrame(frameHandle);
    teardown?.();
  }

  return { dispose };
}
