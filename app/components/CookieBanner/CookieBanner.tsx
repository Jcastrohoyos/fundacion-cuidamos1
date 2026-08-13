'use client'

import { useState, useEffect } from 'react'
import gsap from 'gsap'
import styles from './CookieBanner.module.css'

const COOKIE_CONSENT_KEY = 'cookieConsent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [rejected, setRejected] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      setVisible(true)
    }
  }, [])

  useEffect(() => {
    if (visible) {
      gsap.fromTo(`.${styles.banner}`, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
    }
  }, [visible])

  const hideBanner = (choice: 'accepted' | 'rejected') => {
    localStorage.setItem(COOKIE_CONSENT_KEY, choice)
    gsap.to(`.${styles.banner}`, {
      y: 100,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        setVisible(false)
        if (choice === 'accepted') setAccepted(true)
        if (choice === 'rejected') setRejected(true)
      },
    })
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="dialog" aria-modal="true" aria-labelledby="cookie-title">
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </div>
        <div className={styles.textWrapper}>
          <h3 id="cookie-title" className={styles.title}>Utilizamos cookies</h3>
          <p className={styles.description}>
            Este sitio web utiliza cookies propias y de terceros para mejorar tu experiencia,
            analizar el tráfico y personalizar el contenido. Al continuar navegando, aceptas nuestra
            política de cookies.
          </p>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.rejectButton}
            onClick={() => hideBanner('rejected')}
          >
            Rechazar
          </button>
          <button
            type="button"
            className={styles.acceptButton}
            onClick={() => hideBanner('accepted')}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
