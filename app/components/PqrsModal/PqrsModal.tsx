'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { X, FileText } from 'lucide-react'
import styles from './PqrsModal.module.css'
import { sendToWeb3Forms } from '../../utils/web3forms'

export default function PqrsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const handleClose = useCallback(() => {
    gsap.to(`.${styles.modalContent}`, {
      opacity: 0,
      scale: 0.9,
      y: 50,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => {
        setStatus('idle')
        onClose()
        triggerRef.current?.focus()
      }
    })
    gsap.to(`.${styles.modalOverlay}`, {
      opacity: 0,
      duration: 0.3
    })
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLButtonElement | null
      document.body.style.overflow = 'hidden'
      gsap.fromTo(
        `.${styles.modalContent}`,
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      )
      gsap.fromTo(
        `.${styles.modalOverlay}`,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
      setTimeout(() => {
        if (modalRef.current) {
          const focusable = modalRef.current.querySelector<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          if (focusable) focusable.focus()
        }
      }, 50)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const trapFocus = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Tab' || !modalRef.current) return
    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusableElements.length === 0) return
    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleEsc)
    window.addEventListener('keydown', trapFocus)
    return () => {
      window.removeEventListener('keydown', handleEsc)
      window.removeEventListener('keydown', trapFocus)
    }
  }, [isOpen, handleClose, trapFocus])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')

    const form = e.target as HTMLFormElement
    const data = {
      name: (form.querySelector('#pqrs-name') as HTMLInputElement)?.value || '',
      email: (form.querySelector('#pqrs-email') as HTMLInputElement)?.value || '',
      phone: (form.querySelector('#pqrs-phone') as HTMLInputElement)?.value || '',
      pqrs_type: (form.querySelector('#pqrs-type') as HTMLSelectElement)?.value || '',
      subject: (form.querySelector('#pqrs-subject') as HTMLInputElement)?.value || '',
      message: (form.querySelector('#pqrs-message') as HTMLTextAreaElement)?.value || '',
    }

    const success = await sendToWeb3Forms({
      ...data,
      from_name: 'Fundación Cuidamos con Amor - PQRS',
      subject: `Nuevo PQRS: ${data.pqrs_type} - ${data.subject}`,
    })

    setTimeout(() => {
      setStatus(success ? 'sent' : 'error')
    }, 800)
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={handleClose} role="presentation">
      <div
        className={styles.modalWrapper}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pqrs-title"
        ref={modalRef}
      >
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Cerrar formulario PQRS"
          type="button"
        >
          <X size={18} strokeWidth={2.2} />
        </button>
        <div className={styles.modalContent}>
          {status === 'sent' ? (
            <div className={styles.successBox}>
              <div className={styles.successIcon}>✓</div>
              <h3 className={styles.successTitle}>PQRS Enviado</h3>
              <p className={styles.successText}>
                Gracias por tu mensaje. Lo revisaremos y te responderemos pronto con mucho amor.
              </p>
              <button type="button" className={styles.closeModalButton} onClick={handleClose}>
                Cerrar
              </button>
            </div>
          ) : status === 'error' ? (
            <div className={styles.errorBox}>
              <div className={styles.errorIcon}>!</div>
              <h3 className={styles.errorTitle}>Error al enviar</h3>
              <p className={styles.errorText}>
                No pudimos enviar tu PQRS. Por favor inténtalo de nuevo más tarde o escríbenos a
                <a href="mailto:contacto@cuidamosconamor.org"> contacto@cuidamosconamor.org</a>.
              </p>
              <button type="button" className={styles.retryButton} onClick={() => setStatus('idle')}>
                Reintentar
              </button>
            </div>
          ) : (
            <>
              <div className={styles.header}>
                <div className={styles.headerIcon}>
                  <FileText size={24} />
                </div>
                <h2 className={styles.title} id="pqrs-title">Formulario PQRS</h2>
                <p className={styles.subtitle}>
                  Peticiones, quejas, reclamos o sugerencias. Tu opinión es muy importante para nosotros.
                </p>
              </div>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="pqrs-type">Tipo de solicitud *</label>
                    <select id="pqrs-type" className={styles.select} required>
                      <option value="">Selecciona una opción</option>
                      <option value="Petición">Petición</option>
                      <option value="Queja">Queja</option>
                      <option value="Reclamo">Reclamo</option>
                      <option value="Sugerencia">Sugerencia</option>
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="pqrs-subject">Asunto *</label>
                    <input
                      id="pqrs-subject"
                      type="text"
                      placeholder="¿En qué podemos ayudarte?"
                      className={styles.input}
                      required
                    />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="pqrs-name">Nombre completo *</label>
                    <input
                      id="pqrs-name"
                      type="text"
                      placeholder="Tu nombre completo"
                      className={styles.input}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="pqrs-email">Correo electrónico *</label>
                    <input
                      id="pqrs-email"
                      type="email"
                      placeholder="tu@correo.com"
                      className={styles.input}
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="pqrs-phone">Teléfono</label>
                  <input
                    id="pqrs-phone"
                    type="tel"
                    placeholder="+57 300 123 4567"
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="pqrs-message">Descripción *</label>
                  <textarea
                    id="pqrs-message"
                    rows={5}
                    placeholder="Describe tu petición, queja, reclamo o sugerencia..."
                    className={styles.textarea}
                    required
                  />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={status === 'sending'}>
                  {status === 'sending' ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>Enviar PQRS <span className={styles.btnArrow}>→</span></>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
