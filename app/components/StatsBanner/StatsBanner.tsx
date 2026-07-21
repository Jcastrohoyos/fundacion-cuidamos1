'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './StatsBanner.module.css'

const stats = [
  { value: 88,    label: 'Actividades\nrealizadas.' },
  { value: 31692, label: 'Bonos de\nalimentación\ndistribuidos.' },
  { value: 8614,  label: 'Beneficiarios\ntotales.' },
  { value: 538,   label: 'Kits de aseo\nentregados.' },
  { value: 1115,  label: 'Gorros tejidos\ndonados.' },
]

export default function StatsBanner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isVisibleRef = useRef(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const numberEls = Array.from(node.querySelectorAll<HTMLElement>('.stats-number'))
    const formatter = new Intl.NumberFormat('es-CO')

    const animateIn = () => {
      gsap.fromTo(
        node.querySelectorAll('.stats-item'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
      )

      numberEls.forEach((el, i) => {
        const target = stats[i].value
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 1.8,
            delay: 0.2 + i * 0.1,
            ease: 'power2.out',
            snap: { innerText: 1 },
            onUpdate() {
              const current = Math.trunc((gsap.getProperty(el, 'innerText') as number) || 0)
              el.textContent = formatter.format(current)
            },
          }
        )
      })
    }

    const reset = () => {
      gsap.set(node.querySelectorAll('.stats-item'), { opacity: 0, y: 30 })
      numberEls.forEach((el, i) => {
        el.textContent = formatter.format(0)
        // reset to 0 shown as "0"
        el.textContent = '0'
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
    <div className={styles.banner} ref={containerRef}>
      <div className={styles.inner}>
        {stats.map(({ value, label }, i) => (
          <div key={i} className={`${styles.item} stats-item`}>
            <span className={`${styles.number} stats-number`}>
              {value.toLocaleString('es-CO')}
            </span>
            <span className={styles.label}>
              {label.split('\n').map((line, j) => (
                <span key={j}>{line}<br /></span>
              ))}
            </span>
            {i < stats.length - 1 && <div className={styles.divider} />}
          </div>
        ))}
      </div>
    </div>
  )
}
