'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import styles from './Navbar.module.css'

export default function Navbar() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useGSAP(() => {
    gsap.from('.navbar-item', {
      opacity: 0,
      y: -20,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out'
    })
  }, { scope: containerRef })

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'impacto', 'datos', 'como-apoyarnos', 'galeria', 'contacto']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <nav className={styles.navbar} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src="/images/logo.webp"
            alt="Fundación Cuidamos con Amor"
            width={150}
            height={50}
            className={styles.logoImage}
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
        
        <button 
          className={styles.menuToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <ul className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
          <li className="navbar-item">
            <button 
              onClick={() => scrollToSection('hero')} 
              className={`${styles.navLink} ${activeSection === 'hero' ? styles.active : ''}`}
              aria-label="Navegar a sección de inicio"
            >
              Inicio
            </button>
          </li>
          <li className="navbar-item">
            <button 
              onClick={() => scrollToSection('impacto')} 
              className={`${styles.navLink} ${activeSection === 'impacto' ? styles.active : ''}`}
              aria-label="Navegar a sección de impacto"
            >
              Impacto
            </button>
          </li>
          <li className="navbar-item">
            <button 
              onClick={() => scrollToSection('datos')} 
              className={`${styles.navLink} ${activeSection === 'datos' ? styles.active : ''}`}
              aria-label="Navegar a sección de datos"
            >
              Datos
            </button>
          </li>
          <li className="navbar-item">
            <button 
              onClick={() => scrollToSection('como-apoyarnos')} 
              className={`${styles.navLink} ${activeSection === 'como-apoyarnos' ? styles.active : ''}`}
              aria-label="Navegar a sección de cómo apoyar"
            >
              Cómo Apoyar
            </button>
          </li>
          <li className="navbar-item">
            <button 
              onClick={() => scrollToSection('galeria')} 
              className={`${styles.navLink} ${activeSection === 'galeria' ? styles.active : ''}`}
              aria-label="Navegar a sección de galería"
            >
              Galería
            </button>
          </li>
          <li className="navbar-item">
            <button 
              onClick={() => scrollToSection('contacto')} 
              className={styles.ctaButton}
              aria-label="Navegar a sección de contacto"
            >
              Contacto
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
