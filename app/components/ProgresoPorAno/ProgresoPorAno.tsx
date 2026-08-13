'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import styles from './ProgresoPorAno.module.css'

const yearData = [
  { year: '2022', bonos: 256, beneficiarios: 128, kits: 0, gorros: 0 },
  { year: '2023', bonos: 4417, beneficiarios: 1472, kits: 0, gorros: 0 },
  { year: '2024', bonos: 8463, beneficiarios: 2628, kits: 252, gorros: 720 },
  { year: '2025', bonos: 14482, beneficiarios: 3367, kits: 286, gorros: 395 },
  { year: 'A julio 2026', bonos: 5679, beneficiarios: 1349, kits: 212, gorros: 196 },
]

const formatNumber = (value: number) => value.toLocaleString('es-CO')

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
           Cifras acumuladas desde 2022 hasta julio de 2026
        </p>

        <div className={`${styles.chartWrapper} chart-enter`}>
          <ResponsiveContainer width="100%" height={420}>
            <BarChart data={yearData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
              <XAxis dataKey="year" stroke="var(--color-text-light)" tick={{ fill: 'var(--color-text-light)' }} />
              <YAxis stroke="var(--color-text-light)" tick={{ fill: 'var(--color-text-light)' }} tickFormatter={formatNumber} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-primary)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                }}
                labelStyle={{ color: 'white', fontWeight: 'bold' }}
              />
              <Legend />
              <Bar dataKey="bonos" name="Bonos de almuerzo" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="beneficiarios" name="Beneficiarios" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="kits" name="Kits de aseo" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="gorros" name="Gorros" fill="var(--color-text-light)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
