'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/50 backdrop-blur-md shadow-lg' : ''}`}>
      <nav className="container mx-auto px-6 py-4">
        <ul className="flex justify-center space-x-6">
          {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
            <li key={item}>
              <Link 
                href={`#${item.toLowerCase()}`} 
                className="text-white hover:text-blue-300 transition-colors duration-300"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

