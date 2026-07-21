'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Mail, Camera, MapPin } from 'lucide-react'
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
      const sections = ['hero', 'sobre-nosotros', 'nuestro-trabajo', 'impacto', 'datos', 'como-apoyarnos', 'galeria', 'contacto']
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
        <div className={styles.left}>
          <div className={styles.logo}>
            <Image
              src="/images/logo2.webp"
              alt="Fundacion Cuidamos con Amor"
              width={50}
              height={50}
              className={styles.logoImage}
              priority
            />
          </div>
          <div className={styles.location}>
            <MapPin size={16} />
            <span>Bogota, Colombia</span>
          </div>
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
            >
              Inicio
            </button>
          </li>
          <li className="navbar-item">
            <button
              onClick={() => scrollToSection('sobre-nosotros')}
              className={`${styles.navLink} ${activeSection === 'sobre-nosotros' ? styles.active : ''}`}
            >
              Sobre Nosotros
            </button>
          </li>
          <li className="navbar-item">
            <button
              onClick={() => scrollToSection('nuestro-trabajo')}
              className={`${styles.navLink} ${activeSection === 'nuestro-trabajo' ? styles.active : ''}`}
            >
              Nuestro Trabajo
            </button>
          </li>
          <li className="navbar-item">
            <button
              onClick={() => scrollToSection('impacto')}
              className={`${styles.navLink} ${activeSection === 'impacto' ? styles.active : ''}`}
            >
              Impacto
            </button>
          </li>
          <li className="navbar-item">
            <button
              onClick={() => scrollToSection('como-apoyarnos')}
              className={`${styles.navLink} ${activeSection === 'como-apoyarnos' ? styles.active : ''}`}
            >
              Como Apoyar
            </button>
          </li>
          <li className={styles.navRight}>
            <div className={styles.navActions}>
              <a
                href="mailto:contacto@cuidamosconamor.org"
                className={styles.iconLink}
                aria-label="Enviar correo electronico"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://www.instagram.com/cuidamosconamor_fundacion/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label="Seguir en Instagram"
              >
                <Camera size={18} />
              </a>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSct44ShJq2kK0DELwxdJBMrpYaGQdYpi1ZbNKFyzrjCNWCQcg/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.donateButton}
              >
                Dona aqui
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}