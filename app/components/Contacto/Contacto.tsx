'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Mail, Users, FileText } from 'lucide-react'
import styles from './Contacto.module.css'

export default function Contacto() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.contacto-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
    gsap.from('.contacto-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out'
    })
    gsap.from('.contacto-content', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.4,
      ease: 'power3.out'
    })
    gsap.from('.contacto-item', {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      stagger: 0.15,
      delay: 0.6,
      ease: 'back.out(1.7)'
    })
  }, { scope: containerRef })

  return (
    <section className={styles.contacto} id="contacto" ref={containerRef}>
      <div className={styles.container}>
        <h2 className={`${styles.title} contacto-title`}>Contáctanos</h2>
        <p className={`${styles.subtitle} contacto-subtitle`}>Si deseas más información o quieres apoyarnos, no dudes en contactarnos a través de</p>
        
        <div className={`${styles.content} contacto-content`}>
          <h3 className={styles.sectionTitle}>Necesitas contactarnos</h3>
          
          <div className={styles.contactInfo}>
            <div className={`${styles.contactItem} contacto-item`}>
              <div className={styles.iconWrap}><Mail size={22} /></div>
              <div>
                <h4 className={styles.label}>CORREO</h4>
                <a href="mailto:contacto@cuidamosconamor.org" className={styles.link}>
                  contacto@cuidamosconamor.org
                </a>
              </div>
            </div>

            <div className={`${styles.contactItem} contacto-item`}>
              <div className={styles.iconWrap}><Users size={22} /></div>
              <div>
                <h4 className={styles.label}>INSTAGRAM</h4>
                <a href="https://instagram.com/cuidamosconamor_gruposocial" target="_blank" rel="noopener noreferrer" className={styles.link}>
                  cuidamosconamor_gruposocial
                </a>
              </div>
            </div>

            <div className={`${styles.contactItem} contacto-item`}>
              <div className={styles.iconWrap}><FileText size={22} /></div>
              <div>
                <h4 className={styles.label}>PQRS</h4>
                <a href="#" className={styles.link}>
                  Haz clic aquí para completar el formulario
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
