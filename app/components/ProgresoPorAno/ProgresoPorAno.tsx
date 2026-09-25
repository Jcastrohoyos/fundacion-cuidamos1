'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import dynamic from 'next/dynamic'
import { totals } from '../../utils/impactData'
import styles from './ProgresoPorAno.module.css'

const ProgresoPorAnoChart = dynamic(() => import('./ProgresoPorAnoChart'), {
  ssr: false,
  loading: () => <div style={{ height: 420 }} aria-hidden="true" />,
})

export default function ProgresoPorAno() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.progreso-title', {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: 'power3.out',
    })
    gsap.from('.chart-enter', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    })
  }, { scope: containerRef })

  return (
    <section className={styles.section} ref={containerRef} id="progreso-por-ano">
      <div className={styles.container}>
        <h2 className={`${styles.title} progreso-title`}>
          Nuestro progreso
        </h2>
        <p className={`${styles.subtitle} progreso-title`}>
           Cifras acumuladas desde 2022 hasta {totals.corte}
        </p>

        <div className={`${styles.chartWrapper} chart-enter`}>
          <ProgresoPorAnoChart />
        </div>
      </div>
    </section>
  )
}
