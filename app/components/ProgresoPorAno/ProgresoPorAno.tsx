'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import styles from './ProgresoPorAno.module.css'

const yearData = [
  { year: '2022', bonos: 256, beneficiarios: 128, kits: 0, gorros: 0 },
  { year: '2023', bonos: 4417, beneficiarios: 1472, kits: 0, gorros: 0 },
  { year: '2024', bonos: 8463, beneficiarios: 2628, kits: 252, gorros: 720 },
  { year: '2025', bonos: 14482, beneficiarios: 3367, kits: 286, gorros: 395 },
  { year: 'A julio 2026', bonos: 5679, beneficiarios: 1349, kits: 212, gorros: 196 },
]

export default function ProgresoPorAno() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.progreso-title', {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: 'power3.out',
    })
    gsap.from('.progreso-row', {
      opacity: 0,
      x: -20,
      duration: 0.5,
      stagger: 0.1,
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
           Cifras acumuladas desde 2022 hasta julio de 2026
        </p>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Año</th>
                <th>Bonos de almuerzo para cuidadores</th>
                <th>Beneficiarios</th>
                <th>Kits de aseo</th>
                <th>Gorros</th>
              </tr>
            </thead>
            <tbody>
              {yearData.map((row) => (
                <tr key={row.year} className="progreso-row">
                  <td className={styles.yearCell}>{row.year}</td>
                  <td>{row.bonos.toLocaleString('es-CO')}</td>
                  <td>{row.beneficiarios.toLocaleString('es-CO')}</td>
                  <td>{row.kits.toLocaleString('es-CO')}</td>
                  <td>{row.gorros.toLocaleString('es-CO')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
