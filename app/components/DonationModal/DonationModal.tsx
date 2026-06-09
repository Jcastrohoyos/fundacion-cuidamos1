'use client'

import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { Heart, X } from 'lucide-react'
import styles from './DonationModal.module.css'
import DonationForm from '../DonationForm/DonationForm'

export default function DonationModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
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
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    gsap.to(`.${styles.modalContent}`, {
      opacity: 0,
      scale: 0.9,
      y: 50,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => setIsOpen(false)
    })
    gsap.to(`.${styles.modalOverlay}`, {
      opacity: 0,
      duration: 0.3
    })
  }

  const handleEscKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') handleClose()
  }

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleEscKey)
      return () => window.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen])

  return (
    <>
      <button
        className={styles.stickyButton}
        onClick={() => setIsOpen(true)}
        aria-label="Abrir formulario de donación"
      >
        <Heart size={20} strokeWidth={2.2} />
        Donaciones
      </button>

      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalWrapper}>
            <button
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="Cerrar modal"
              type="button"
            >
              <X size={18} strokeWidth={2.2} />
            </button>
            <div className={styles.modalContent}>
              <DonationForm onClose={handleClose} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
