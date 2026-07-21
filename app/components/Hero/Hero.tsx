'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import styles from './Hero.module.css'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.hero-logo', {
      opacity: 0,
      scale: 0.8,
      rotation: -10,
      duration: 1.2,
      ease: 'back.out(1.7)'
    })
    gsap.from('.hero-welcome', {
      opacity: 0,
      x: 30,
      duration: 0.8,
      delay: 0.3,
      ease: 'power3.out'
    })
    gsap.from('.hero-title', {
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out'
    })
    gsap.from('.hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.8,
      ease: 'power3.out'
    })
  }, { scope: containerRef })

  return (
    <section className={styles.hero} ref={containerRef} id="hero">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={`${styles.logoSection} hero-logo`}>
            <div className={styles.circularLogo}>
              <Image
                src="/images/logo1.webp"
                alt="Fundación Cuidamos con Amor"
                width={420}
                height={420}
                className={styles.logoImage}
                priority
              />
            </div>
          </div>
          
          <div className={styles.textSection}>
            <p className={`${styles.welcome} hero-welcome`}>Bienvenid@</p>
            <h1 className={`${styles.title} hero-title`}>
              CUIDAMOS<br />
              CON<br />
              AMOR
            </h1>
            <p className={`${styles.subtitle} hero-subtitle`}>y alimentamos la esperanza</p>
          </div>
        </div>
      </div>
    </section>
  )
}
