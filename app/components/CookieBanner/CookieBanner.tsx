'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './CookieBanner.module.css'

const COOKIE_CONSENT_KEY = 'cookieConsent'
const COOKIE_PREFERENCES_KEY = 'cookiePreferences'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  timestamp: number
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: 0,
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences)
  const gsapCtxRef = useRef<any>(null)

  useEffect(() => {
    gsapCtxRef.current = gsap.context()
    return () => {
      gsapCtxRef.current?.revert()
    }
  }, [])

  useEffect(() => {
    if (visible) {
      gsap.fromTo(`.${styles.banner}`, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
    }
  }, [visible])

  const saveConsent = (choice: 'accepted' | 'rejected' | 'customize', customPrefs?: CookiePreferences) => {
    const prefs: CookiePreferences = customPrefs || defaultPreferences
    prefs.timestamp = Date.now()

    if (choice === 'accepted') {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify({ ...defaultPreferences, analytics: true, marketing: true }))
    } else if (choice === 'rejected') {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected')
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify({ ...defaultPreferences, analytics: false, marketing: false }))
    } else if (choice === 'customize' && customPrefs) {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'customize')
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(customPrefs))
    }

    gsap.killTweensOf(`.${styles.banner}`)
    gsap.to(`.${styles.banner}`, {
      y: 100,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        setVisible(false)
        setShowPreferences(false)
      },
    })
  }

  const togglePreference = (key: 'analytics' | 'marketing') => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  if (!visible) return null

  return (
    <div className={styles.overlay} onClick={showPreferences ? undefined : undefined}>
      <div className={styles.banner} role="dialog" aria-modal="true" aria-labelledby="cookie-title">
        {!showPreferences ? (
          <>
            <div className={styles.content}>
              <div className={styles.iconWrapper}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <div className={styles.textWrapper}>
                <h3 id="cookie-title" className={styles.title}>Usamos cookies para mejorar tu experiencia</h3>
                <p className={styles.description}>
                  Este sitio utiliza cookies propias y de terceros para funcionar correctamente, analizar el tráfico y mostrarte contenido relevante. Puedes aceptar todas las cookies o configurar tus preferencias.
                </p>
                <div className={styles.learnMore}>
                  <a href="/politica-de-privacidad" target="_blank" rel="noopener noreferrer" className={styles.learnMoreLink}>
                    Ver política de privacidad
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.rejectButton}
                onClick={() => saveConsent('rejected')}
              >
                Rechazar todas
              </button>
              <button
                type="button"
                className={styles.customizeButton}
                onClick={() => setShowPreferences(true)}
              >
                Configurar
              </button>
              <button
                type="button"
                className={styles.acceptButton}
                onClick={() => saveConsent('accepted')}
              >
                Aceptar todas
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.preferencesHeader}>
              <button
                type="button"
                className={styles.backButton}
                onClick={() => setShowPreferences(false)}
                aria-label="Volver"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className={styles.preferencesTitle}>Configurar cookies</h3>
            </div>
            <div className={styles.preferencesContent}>
              <div className={styles.preferenceItem}>
                <div className={styles.preferenceInfo}>
                  <div className={styles.preferenceIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div className={styles.preferenceText}>
                    <h4 className={styles.preferenceTitleText}>Cookies necesarias</h4>
                    <p className={styles.preferenceDescription}>
                      Esenciales para que el sitio funcione correctamente (seguridad, gestión de sesión, accesibilidad). No se pueden desactivar.
                    </p>
                  </div>
                </div>
                <div className={styles.preferenceToggle}>
                  <span className={styles.toggleLabel}>Siempre activas</span>
                  <input
                    type="checkbox"
                    disabled
                    checked={preferences.necessary}
                    readOnly
                    aria-label="Cookies necesarias"
                  />
                </div>
              </div>

              <div className={styles.preferenceItem}>
                <div className={styles.preferenceInfo}>
                  <div className={styles.preferenceIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </div>
                  <div className={styles.preferenceText}>
                    <h4 className={styles.preferenceTitleText}>Cookies analíticas</h4>
                    <p className={styles.preferenceDescription}>
                      Nos ayudan a entender cómo interactúan los visitantes con el sitio, recopiliendo información de forma anónima para mejorar nuestros servicios.
                    </p>
                  </div>
                </div>
                <div className={styles.preferenceToggle}>
                  <span className={styles.toggleLabel}>{preferences.analytics ? 'Activadas' : 'Desactivadas'}</span>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => togglePreference('analytics')}
                    aria-label="Cookies analíticas"
                  />
                </div>
              </div>

              <div className={styles.preferenceItem}>
                <div className={styles.preferenceInfo}>
                  <div className={styles.preferenceIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div className={styles.preferenceText}>
                    <h4 className={styles.preferenceTitleText}>Cookies de marketing</h4>
                    <p className={styles.preferenceDescription}>
                      Se utilizan para mostrarte anuncios relevantes y medir la efectividad de nuestras campañas publicitarias.
                    </p>
                  </div>
                </div>
                <div className={styles.preferenceToggle}>
                  <span className={styles.toggleLabel}>{preferences.marketing ? 'Activadas' : 'Desactivadas'}</span>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => togglePreference('marketing')}
                    aria-label="Cookies de marketing"
                  />
                </div>
              </div>
            </div>
            <div className={styles.preferencesActions}>
              <button
                type="button"
                className={styles.savePreferencesButton}
                onClick={() => saveConsent('customize', preferences)}
              >
                Guardar preferencias
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
