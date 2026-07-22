'use client'

import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { Heart, X, CreditCard, FileText, Building2 } from 'lucide-react'
import styles from './DonationModal.module.css'

const donationOptions = [
  {
    id: 'paypal',
    title: 'PayPal',
    description: 'Dona a través de PayPal con tarjeta de crédito o débito',
    icon: CreditCard,
    href: 'https://www.paypal.com/ncp/payment/QBPMD9R97XNUL',
    color: '#0070BA',
  },
  {
    id: 'form',
    title: 'Formulario',
    description: 'Completa el formulario de donación',
    icon: FileText,
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSct44ShJq2kK0DELwxdJBMrpYaGQdYpi1ZbNKFyzrjCNWCQcg/viewform',
    color: '#34A853',
  },
  {
    id: 'stripe',
    title: 'Tarjeta Bancaria',
    description: 'Paga con tarjeta de crédito o débito de forma segura',
    icon: Building2,
    href: 'https://checkout.stripe.com',
    color: '#635BFF',
  },
]

export function openDonationModal() {
  window.dispatchEvent(new CustomEvent('openDonationModal'))
}

export default function DonationModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('openDonationModal', handleOpen)
    return () => window.removeEventListener('openDonationModal', handleOpen)
  }, [])

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
        aria-label="Abrir opciones de donación"
      >
        <Heart size={20} strokeWidth={2.2} />
        Donaciones
      </button>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="Cerrar modal"
              type="button"
            >
              <X size={18} strokeWidth={2.2} />
            </button>
            <div className={styles.modalContent}>
              <div className={styles.donationHeader}>
                <Heart size={40} className={styles.heartIcon} />
                <h2 className={styles.donationTitle}>Haz tu donación</h2>
                <p className={styles.donationSubtitle}>
                  Elige la forma que prefieras de apoyar a las familias que más lo necesitan
                </p>
              </div>

              <div className={styles.optionsGrid}>
                {donationOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <a
                      key={option.id}
                      href={option.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.optionCard}
                      onClick={handleClose}
                    >
                      <div
                        className={styles.optionIcon}
                        style={{ backgroundColor: `${option.color}15`, color: option.color }}
                      >
                        <Icon size={28} />
                      </div>
                      <h3 className={styles.optionTitle}>{option.title}</h3>
                      <p className={styles.optionDescription}>{option.description}</p>
                      <span className={styles.optionArrow}>→</span>
                    </a>
                  )
                })}
              </div>

              <p className={styles.donationFooter}>
                Tu donación es segura y 100% deducible de impuestos
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

