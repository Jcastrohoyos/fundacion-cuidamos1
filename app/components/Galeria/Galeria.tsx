'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import styles from './Galeria.module.css'

export default function Galeria() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.galeria-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
    gsap.from('.galeria-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out'
    })
    gsap.from('.galeria-description', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.3,
      ease: 'power3.out'
    })
    gsap.from('.galeria-image', {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.5,
      ease: 'power2.out'
    })
  }, { scope: containerRef })

  return (
    <section className={styles.galeria} ref={containerRef} id="galeria">
      <div className={styles.container}>
        <h2 className={`${styles.title} galeria-title`}>Galería</h2>
        <h3 className={`${styles.subtitle} galeria-subtitle`}>Pequeños artistas</h3>
        <p className={`${styles.description} galeria-description`}>
          Estas son algunas de las expresivas y creativas obras de arte elaboradas por los niños y niñas en la sala quimioterapia ambulatoria
        </p>
        
        <div className={styles.grid}>
          {[
            { src: '/images/galeria1.webp', alt: 'Niño mostrando un dibujo de color naranja en sala de quimioterapia ambulatoria' },
            { src: '/images/galeria2.webp', alt: 'Mural colectivo realizado por niños y niñas durante taller de arte' },
            { src: '/images/galeria3.webp', alt: 'Actividad recreativa con pinturas y manualidades en hospital' },
            { src: '/images/galeria4.webp', alt: 'Niña sonriente con gorro tejido a mano en sesión de apoyo' },
            { src: '/images/galeria5.webp', alt: 'Voluntarias acompañando a familiares en sala de espera' },
            { src: '/images/galeria6.webp', alt: 'Obras de arte elaboradas por niños en tratamiento oncológico' },
          ].map((item, n) => (
            <div key={n} className={styles.imageCard}>
              <img
                src={item.src}
                alt={item.alt}
                className={`${styles.image} galeria-image`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
