'use client'

import { useState, useEffect } from 'react'
import gsap from 'gsap'
import styles from './CotizacionModal.module.css'

const ITEMS = [
  { label: 'Diseño UI/UX y estructura responsive', value: 200000 },
  { label: 'Glassmorphism, animaciones y mejoras visuales', value: 120000 },
  { label: 'Ajustes funcionales: navegación, donaciones y cierre', value: 100000 },
  { label: 'Optimización y preparación para despliegue', value: 80000 },
]

const TOTAL = ITEMS.reduce((acc, item) => acc + item.value, 0)

export default function CotizacionModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(
        `.${styles.modalContent}`,
        { opacity: 0, scale: 0.92, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      )
      gsap.fromTo(
        `.${styles.modalOverlay}`,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
      gsap.fromTo(
        `.${styles.item}`,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.45, stagger: 0.08, ease: 'power3.out', delay: 0.25 }
      )
      gsap.fromTo(
        `.${styles.totalRow}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.8, ease: 'power3.out' }
      )
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const close = () => {
    gsap.to(`.${styles.modalContent}`, {
      opacity: 0,
      scale: 0.92,
      y: 40,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => setIsOpen(false),
    })
    gsap.to(`.${styles.modalOverlay}`, { opacity: 0, duration: 0.3 })
  }

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const fmt = (n: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)

  return (
    <>
      <button className={styles.ctaButton} onClick={() => setIsOpen(true)} aria-label="Ver cotización">
        Cotización Sitio Web
      </button>

      {isOpen && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label="Cotización del sitio web">
          <div className={styles.modalWrapper}>
            <button
              className={styles.closeButton}
              onClick={close}
              aria-label="Cerrar cotización"
              type="button"
            >
              ✕
            </button>

            <div className={styles.modalContent}>
              <h2 className={styles.heading}>Cotización del sitio web</h2>
              <p className={styles.lead}>
                Incluye mejoras de UI/UX, rendimiento, conversión y mantenibilidad del proyecto.
              </p>

              <ul className={styles.list}>
                {ITEMS.map((item) => (
                  <li key={item.label} className={styles.item}>
                    <span className={styles.labelItem}>{item.label}</span>
                    <span className={styles.valueItem}>{fmt(item.value)}</span>
                  </li>
                ))}
              </ul>

              <div className={`${styles.totalRow} ${styles.item}`}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalValue}>{fmt(TOTAL)}</span>
              </div>

              <p className={styles.note}>
                Precio referencial sujeto a alcance final. Incluye despliegue y soporte inicial.
              </p>

              <button className={styles.primaryAction} onClick={close} type="button">
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
