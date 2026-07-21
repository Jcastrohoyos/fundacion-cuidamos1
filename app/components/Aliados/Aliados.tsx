'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import styles from './Aliados.module.css'

const aliados = [
  { id: 1, src: '/images/aliado1.webp', alt: 'Un Mundo por Crear' },
  { id: 2, src: '/images/aliado2.webp', alt: 'Las Delicias Sunpastel' },
  { id: 3, src: '/images/aliado3.webp', alt: 'Toro Horses' },
  { id: 4, src: '/images/aliado4.webp', alt: 'Shopper Box' },
  { id: 5, src: '/images/aliado5.webp', alt: 'UMCOR' },
  { id: 6, src: '/images/aliado6.webp', alt: 'VAOVA' },
]

export default function Aliados() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.aliados-badge', {
      opacity: 0,
      y: 16,
      duration: 0.6,
      ease: 'power3.out',
    })
    gsap.from('.aliados-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.1,
      ease: 'power3.out',
    })
    gsap.from('.aliados-description', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.25,
      ease: 'power3.out',
    })
    gsap.from('.aliado-card', {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.4,
      ease: 'power3.out',
    })
    gsap.from('.aliados-cta', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 1.0,
      ease: 'power3.out',
    })
  }, { scope: containerRef })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.aliado-card', {
        y: -8,
        duration: 2.2,
        ease: 'sine.inOut',
        stagger: {
          each: 0.35,
          repeat: -1,
          yoyo: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.aliados} ref={containerRef}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={`${styles.badge} aliados-badge`}>
            Nuestros Aliados
          </span>
          <h2 className={`${styles.title} aliados-title`}>
            Juntos, más lejos
          </h2>
          <p className={`${styles.description} aliados-description`}>
            Trabajamos junto a estas organizaciones y empresas para generar un impacto positivo en
            nuestra comunidad y más allá.
          </p>
        </div>

        {/* Logo Grid */}
        <div className={styles.grid}>
          {aliados.map((aliado) => (
            <div key={aliado.id} className={`${styles.card} aliado-card`}>
              <div className={styles.logoWrapper}>
                <Image
                  src={aliado.src}
                  alt={aliado.alt}
                  width={200}
                  height={80}
                  className={styles.logo}
                  sizes="(max-width: 768px) 40vw, 20vw"
                />
              </div>
              <span className={styles.aliadoName}>{aliado.alt}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`${styles.ctaRow} aliados-cta`}>
          <p className={styles.ctaText}>
            ¿Tu empresa quiere ser parte de nuestra red de aliados?
          </p>
          <a href="#contacto" className={styles.ctaBtn}>
            Conviértete en aliado
            <span className={styles.ctaArrow}>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
