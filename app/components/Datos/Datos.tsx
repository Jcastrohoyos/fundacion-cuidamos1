'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import styles from './Datos.module.css'

const stats = [
  { value: '88', suffix: '%', label: 'Actividades realizadas', img: '/images/datos1.webp' },
  { value: '33', suffix: '%', label: 'Actividades realizadas', img: '/images/datos2.webp' },
  { value: '56', suffix: '%', label: 'Población más vulnerable Sisben', img: '/images/datos3.webp' },
  { value: '36', suffix: '%', label: 'Más de 1 mes hospitalizados', img: '/images/datos4.webp' },
  { value: '4',  suffix: '%', label: 'Indígenas', img: '/images/datos5.webp' },
  { value: '12', suffix: '%', label: 'Venezolanos', img: '/images/datos6.webp' },
  { value: '10', suffix: '%', label: 'Afrocolombianos', img: '/images/datos7.webp' },
  { value: '11', suffix: '%', label: 'Campesinos', img: '/images/datos8.webp' },
]

export default function Datos() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isVisibleRef = useRef(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const percentEls = Array.from(node.querySelectorAll<HTMLElement>('.dato-percentage'))
    const originalValues = percentEls.map((el) => el.dataset.value || '0')

    const animateIn = () => {
      gsap.fromTo(
        '.datos-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )

      gsap.fromTo(
        '.datos-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      )

      gsap.fromTo(
        '.datos-stat',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
      )

      percentEls.forEach((el, index) => {
        const raw = originalValues[index]
        const value = parseFloat(raw)
        const suffix = el.textContent?.includes('%') ? '%' : ''

        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: value,
            duration: 1.6,
            delay: 0.4,
            ease: 'power2.out',
            snap: { innerText: 1 },
            onUpdate() {
              const current = parseInt(gsap.getProperty(el, 'innerText') as string, 10) || 0
              el.textContent = `${current}${suffix}`
            },
          }
        )
      })
    }

    const reset = () => {
      gsap.set('.datos-title', { opacity: 0, y: 30 })
      gsap.set('.datos-subtitle', { opacity: 0, y: 20 })
      gsap.set('.datos-stat', { opacity: 0, y: 40 })
      percentEls.forEach((el) => {
        const suffix = el.textContent?.includes('%') ? '%' : ''
        el.textContent = `0${suffix}`
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisibleRef.current) {
            isVisibleRef.current = true
            animateIn()
          }
          if (!entry.isIntersecting && isVisibleRef.current) {
            isVisibleRef.current = false
            reset()
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.datos} ref={containerRef} id="datos">
      <div className={styles.container}>
        <h2 className={`${styles.title} datos-title`}>Quienes nos inspiran</h2>
        <h3 className={`${styles.subtitle} datos-subtitle`}>Datos</h3>
        
        <div className={styles.grid}>
          {stats.map(({ value, suffix, label, img }, i) => (
            <div key={i} className={`${styles.stat} datos-stat`}>
              {img && (
                <div className={styles.imgWrapper}>
                  <Image
                    src={img}
                    alt={label}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className={styles.bgImage}
                  />
                  <div className={styles.overlay} />
                </div>
              )}
              <div className={styles.cardContent}>
                <div
                  className={`${styles.percentage} dato-percentage`}
                  data-value={value}
                >
                  {value}{suffix}
                </div>
                <div className={styles.label}>{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
