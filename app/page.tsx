'use client'

import Header from './components/Header'
import RetroComputer from './components/retro/RetroComputer'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Marquee from './components/Marquee'

export default function Home() {
  return (
    <main className="min-h-screen grid-pattern">
      <Header />
      <RetroComputer />
      <Marquee />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
