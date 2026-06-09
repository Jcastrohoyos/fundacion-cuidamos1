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
      duration: 1,
      ease: 'back.out(1.7)'
    })
    gsap.from('.title', {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    })
    gsap.from('.subtitle', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.6,
      ease: 'power3.out'
    })
    gsap.from('.description', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.9,
      ease: 'power3.out'
    })
  }, { scope: containerRef })

  return (
    <section className={styles.hero} style={{ backgroundColor: '#096380' }} ref={containerRef} id="hero">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={`${styles.logoWrapper} hero-logo`}>
            <Image
              src="/images/logo.webp"
              alt="Fundación Cuidamos con Amor"
              width={180}
              height={60}
              className={styles.logo}
              priority
            />
          </div>
          <h1 className={`${styles.title} title`}>CUIDAMOS con amor</h1>
          <p className={`${styles.subtitle} subtitle`}>APOYAMOS NIÑOS Y NIÑAS CON CÁNCER</p>
          <p className={`${styles.description} description`}>Cuidamos con amor y alimentamos la esperanza</p>
        </div>
      </div>
    </section>
  )
}
