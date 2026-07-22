'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Heart } from 'lucide-react'
import styles from './Donaciones.module.css'
import { openDonationModal } from '../DonationModal/DonationModal'

export default function Donaciones() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.donaciones-content', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
    gsap.from('.donaciones-title', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out'
    })
    gsap.from('.donaciones-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.3,
      ease: 'power3.out'
    })
  }, { scope: containerRef })

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.container}>
        <div className={`${styles.content} donaciones-content`}>
          <p className={`${styles.title} donaciones-title`}>
            ¿Quieres hacer una donación o necesitas un bono de apoyo?
          </p>
          <h2 className={`${styles.subtitle} donaciones-subtitle`}>
            HAZ CLICK AQUÍ
          </h2>
          <p className={styles.tagline}>
            Hoy puedes ser la razón por la que alguien no se rinda.
          </p>
          <button
            onClick={openDonationModal}
            className={`${styles.button} donaciones-button`}
          >
            <Heart size={20} />
            Dona ahora
          </button>
        </div>
      </div>
    </section>
  )
}

