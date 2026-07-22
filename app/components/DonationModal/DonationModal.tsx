'use client'

import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { Heart, X, CreditCard, FileText, Building2, ArrowLeft, Check } from 'lucide-react'
import styles from './DonationModal.module.css'

const donationAmounts = [
  { value: 10000, label: '$10.000' },
  { value: 25000, label: '$25.000' },
  { value: 50000, label: '$50.000' },
  { value: 100000, label: '$100.000' },
]

const paymentMethods = [
  {
    id: 'paypal',
    title: 'PayPal',
    description: 'Dona a través de PayPal con tarjeta de crédito o débito',
    icon: CreditCard,
    color: '#0070BA',
  },
  {
    id: 'google',
    title: 'Formulario',
    description: 'Completa el formulario de donación',
    icon: FileText,
    color: '#34A853',
  },
  {
    id: 'stripe',
    title: 'Tarjeta Bancaria',
    description: 'Paga con tarjeta de crédito o débito de forma segura',
    icon: Building2,
    color: '#635BFF',
  },
]

export function openDonationModal() {
  window.dispatchEvent(new CustomEvent('openDonationModal'))
}

export default function DonationModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: 0,
    customAmount: '',
  })

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
      onComplete: () => {
        setIsOpen(false)
        setStep(1)
        setFormData({ name: '', email: '', phone: '', amount: 0, customAmount: '' })
      }
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

  const handleAmountSelect = (value: number) => {
    setFormData({ ...formData, amount: value, customAmount: '' })
  }

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setFormData({ ...formData, customAmount: value, amount: parseInt(value) || 0 })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleContinue = () => {
    if (!formData.amount || formData.amount <= 0) {
      alert('Por favor selecciona o ingresa un monto válido')
      return
    }
    if (!formData.name.trim()) {
      alert('Por favor ingresa tu nombre completo')
      return
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      alert('Por favor ingresa un correo electrónico válido')
      return
    }
    setStep(2)
  }

  const handlePaymentSelect = (methodId: string) => {
    const finalAmount = formData.amount
    const userName = encodeURIComponent(formData.name)
    const userEmail = encodeURIComponent(formData.email)
    const userPhone = encodeURIComponent(formData.phone)

    if (methodId === 'paypal') {
      const paypalLink = `https://www.paypal.com/ncp/payment/QBPMD9R97XNUL`
      window.open(paypalLink, '_blank', 'noopener,noreferrer')
    } else if (methodId === 'google') {
      const googleFormLink = `https://docs.google.com/forms/d/e/1FAIpQLSct44ShJq2kK0DELwxdJBMrpYaGQdYpi1ZbNKFyzrjCNWCQcg/viewform?entry.1234567890=${userName}&entry.0987654321=${userEmail}&entry.1122334455=${userPhone}&entry.5566778899=${finalAmount}`
      window.open(googleFormLink, '_blank', 'noopener,noreferrer')
    } else if (methodId === 'stripe') {
      alert('Stripe está en configuración. Pronto estará disponible.')
      return
    }

    handleClose()
  }

  const handleBack = () => {
    setStep(1)
  }

  const getFinalAmount = () => {
    if (formData.customAmount) {
      return parseInt(formData.customAmount) || 0
    }
    return formData.amount
  }

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
              {step === 1 ? (
                <>
                  <div className={styles.donationHeader}>
                    <Heart size={40} className={styles.heartIcon} />
                    <h2 className={styles.donationTitle}>Haz tu donación</h2>
                    <p className={styles.donationSubtitle}>
                      Selecciona el monto y completa tus datos para continuar
                    </p>
                  </div>

                  <div className={styles.formSection}>
                    <h3 className={styles.sectionTitle}>Selecciona el monto</h3>
                    <div className={styles.amountGrid}>
                      {donationAmounts.map((item) => (
                        <button
                          key={item.value}
                          type="button"
                          className={`${styles.amountButton} ${formData.amount === item.value && !formData.customAmount ? styles.active : ''}`}
                          onClick={() => handleAmountSelect(item.value)}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                    <div className={styles.customAmountWrapper}>
                      <span className={styles.currencySymbol}>$</span>
                      <input
                        type="text"
                        placeholder="Otro monto"
                        className={`${styles.customAmountInput} ${formData.customAmount ? styles.active : ''}`}
                        value={formData.customAmount}
                        onChange={handleCustomAmount}
                      />
                      <span className={styles.currencyLabel}>COP</span>
                    </div>
                  </div>

                  <div className={styles.formSection}>
                    <h3 className={styles.sectionTitle}>Tus datos</h3>
                    <div className={styles.inputGroup}>
                      <label htmlFor="donor-name" className={styles.label}>Nombre completo *</label>
                      <input
                        type="text"
                        id="donor-name"
                        name="name"
                        className={styles.input}
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Tu nombre completo"
                        required
                      />
                    </div>
                    <div className={styles.inputRow}>
                      <div className={styles.inputGroup}>
                        <label htmlFor="donor-email" className={styles.label}>Correo electrónico *</label>
                        <input
                          type="email"
                          id="donor-email"
                          name="email"
                          className={styles.input}
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="tu@email.com"
                          required
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label htmlFor="donor-phone" className={styles.label}>Teléfono</label>
                        <input
                          type="tel"
                          id="donor-phone"
                          name="phone"
                          className={styles.input}
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+57 300 123 4567"
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.summarySection}>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Monto a donar:</span>
                      <span className={styles.summaryValue}>${getFinalAmount().toLocaleString('es-CO')} COP</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.continueButton}
                    onClick={handleContinue}
                  >
                    Continuar
                    <span className={styles.arrowRight}>→</span>
                  </button>
                </>
              ) : (
                <>
                  <div className={styles.donationHeader}>
                    <button type="button" className={styles.backButton} onClick={handleBack}>
                      <ArrowLeft size={20} />
                      Volver
                    </button>
                    <Heart size={40} className={styles.heartIcon} />
                    <h2 className={styles.donationTitle}>Elige cómo donar</h2>
                    <p className={styles.donationSubtitle}>
                      Monto: <strong>${getFinalAmount().toLocaleString('es-CO')} COP</strong>
                    </p>
                  </div>

                  <div className={styles.paymentGrid}>
                    {paymentMethods.map((method) => {
                      const Icon = method.icon
                      const isDisabled = method.id === 'stripe'
                      return (
                        <button
                          key={method.id}
                          type="button"
                          className={`${styles.paymentCard} ${isDisabled ? styles.disabled : ''}`}
                          onClick={() => !isDisabled && handlePaymentSelect(method.id)}
                          disabled={isDisabled}
                        >
                          <div
                            className={styles.paymentIcon}
                            style={{ backgroundColor: `${method.color}15`, color: method.color }}
                          >
                            <Icon size={28} />
                          </div>
                          <h3 className={styles.paymentTitle}>{method.title}</h3>
                          <p className={styles.paymentDescription}>{method.description}</p>
                          {isDisabled && (
                            <span className={styles.comingSoon}>Próximamente</span>
                          )}
                          {!isDisabled && (
                            <span className={styles.paymentArrow}>→</span>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  <div className={styles.donationInfo}>
                    <Check size={16} className={styles.checkIcon} />
                    <span>Tu donación es segura y 100% deducible de impuestos</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
