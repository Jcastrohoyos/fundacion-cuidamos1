'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Mail, Camera } from 'lucide-react'
import styles from './Navbar.module.css'
import { openDonationModal } from '../DonationModal/DonationModal'

const SECTIONS = ['hero', 'sobre-nosotros', 'nuestro-trabajo', 'impacto', 'datos', 'como-apoyarnos', 'galeria', 'contacto'] as const

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export default function Navbar() {
  const containerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const rafRef = useRef<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<(typeof SECTIONS)[number]>('hero')

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
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        const current = SECTIONS.find(section => {
          let element = sectionRefs.current[section]
          if (!element) {
            const fallback = document.getElementById(section)
            sectionRefs.current[section] = fallback
            element = fallback
          }
          if (element) {
            const rect = element.getBoundingClientRect()
            return rect.top <= 100 && rect.bottom >= 100
          }
          return false
        })
        if (current) setActiveSection(current)
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId] || document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
      toggleRef.current?.focus()
    }
  }

  return (
    <nav className={styles.navbar} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.logoArea}>
          <div className={styles.logo}>
            <Image
              src="/images/logo2.webp"
              alt="Fundacion Cuidamos con Amor"
              width={88}
              height={88}
              className={styles.logoImage}
              priority
            />
          </div>
          <button
            onClick={openDonationModal}
            className={styles.donateButtonHeader}
          >
            Dona aquí
          </button>
        </div>

        <button
          ref={toggleRef}
          className={styles.menuToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="main-menu"
          aria-label="Abrir menú de navegación"
          type="button"
        >
          <span className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <ul
          id="main-menu"
          ref={menuRef}
          className={`${styles.menu} ${isOpen ? styles.open : ''}`}
          aria-hidden={!isOpen}
        >
          <li className="navbar-item">
            <button
              onClick={() => scrollToSection('hero')}
              className={`${styles.navLink} ${activeSection === 'hero' ? styles.active : ''}`}
              aria-current={activeSection === 'hero' ? 'true' : undefined}
            >
              Inicio
            </button>
          </li>
          <li className="navbar-item">
            <button
              onClick={() => scrollToSection('sobre-nosotros')}
              className={`${styles.navLink} ${activeSection === 'sobre-nosotros' ? styles.active : ''}`}
              aria-current={activeSection === 'sobre-nosotros' ? 'true' : undefined}
            >
              Sobre Nosotros
            </button>
          </li>
          <li className="navbar-item">
            <button
              onClick={() => scrollToSection('nuestro-trabajo')}
              className={`${styles.navLink} ${activeSection === 'nuestro-trabajo' ? styles.active : ''}`}
              aria-current={activeSection === 'nuestro-trabajo' ? 'true' : undefined}
            >
              Nuestro Trabajo
            </button>
          </li>
          <li className="navbar-item">
            <button
              onClick={() => scrollToSection('impacto')}
              className={`${styles.navLink} ${activeSection === 'impacto' ? styles.active : ''}`}
              aria-current={activeSection === 'impacto' ? 'true' : undefined}
            >
              Impacto
            </button>
          </li>
          <li className="navbar-item">
            <button
              onClick={() => scrollToSection('como-apoyarnos')}
              className={`${styles.navLink} ${activeSection === 'como-apoyarnos' ? styles.active : ''}`}
              aria-current={activeSection === 'como-apoyarnos' ? 'true' : undefined}
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
                href="https://www.facebook.com/profile.php?id=61590375045310"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label="Facebook"
              >
                <FacebookIcon />
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
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

