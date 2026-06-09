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
          <div className={styles.imageCard}>
            <img src="/images/0267c625c129de790d7b0e1c5fde4394.png" alt="Arte infantil 1" className={`${styles.image} galeria-image`} />
          </div>
          <div className={styles.imageCard}>
            <img src="/images/2ee906b211c51714073c31b069d8fc7b.png" alt="Arte infantil 2" className={`${styles.image} galeria-image`} />
          </div>
          <div className={styles.imageCard}>
            <img src="/images/7cdf687235a2650c469b8e0ac4df404f.png" alt="Arte infantil 3" className={`${styles.image} galeria-image`} />
          </div>
          <div className={styles.imageCard}>
            <img src="/images/a7dea2e1c25ce4da0a8370ed18669162.png" alt="Arte infantil 4" className={`${styles.image} galeria-image`} />
          </div>
          <div className={styles.imageCard}>
            <img src="/images/ae959f725aa0b0abff727533c624b6f1.png" alt="Arte infantil 5" className={`${styles.image} galeria-image`} />
          </div>
          <div className={styles.imageCard}>
            <img src="/images/caeb75fed24d79e7813536016e9ec11a.png" alt="Arte infantil 6" className={`${styles.image} galeria-image`} />
          </div>
          <div className={styles.imageCard}>
            <img src="/images/dbea80a1c61166d9930598c24b32af04.png" alt="Arte infantil 7" className={`${styles.image} galeria-image`} />
          </div>
          <div className={styles.imageCard}>
            <img src="/images/dfea31785dd3a81af75e8caeb57aaa62.png" alt="Arte infantil 8" className={`${styles.image} galeria-image`} />
          </div>
        </div>
      </div>
    </section>
  )
}
