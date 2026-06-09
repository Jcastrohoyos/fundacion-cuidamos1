'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import styles from './Aliados.module.css'

export default function Aliados() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.aliados-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
    gsap.from('.aliados-description', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out'
    })
  }, { scope: containerRef })

  return (
    <section className={styles.aliados} ref={containerRef}>
      <div className={styles.container}>
        <h2 className={`${styles.title} aliados-title`}>Nuestros aliados</h2>
        <p className={`${styles.description} aliados-description`}>
          Trabajamos junto a organizaciones comprometidas con el bienestar de los niños y familias
        </p>
      </div>
    </section>
  )
}
