'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })

    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    const torusKnot = new THREE.Mesh(geometry, material)

    scene.add(torusKnot)
    camera.position.z = 30

    const animate = () => {
      requestAnimationFrame(animate)
      torusKnot.rotation.x += 0.01
      torusKnot.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden z-10">
      <div ref={containerRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 text-center bg-gray-900/50 backdrop-blur-md p-8 rounded-lg">
        <h1 className="text-5xl font-bold mb-4 animate-fade-in-down">Elon Zito</h1>
        <p className="text-xl mb-8 animate-fade-in-up">Principal Software Engineer</p>
        <a 
          href="#contact" 
          className="relative inline-block bg-blue-500 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 transition duration-300 wave-button"
        >
          Get in Touch
          <span className="absolute inset-0 rounded-full border-2 border-blue-400"></span>
        </a>
      </div>
    </section>
  )
}

