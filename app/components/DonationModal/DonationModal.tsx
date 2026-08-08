'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { Heart, X, CreditCard, Building2, ArrowLeft, Check, Wallet, Copy, CheckCheck } from 'lucide-react'
import Image from 'next/image'
import styles from './DonationModal.module.css'
import { sendToWeb3Forms } from '../../utils/web3forms'
import { DONATION_AMOUNTS } from '../../utils/donations'

const BREVE_ACCOUNT_NUMBER = '191-000032-72'
const BREVE_BREB = '0067641241'
const BREVE_SWIFT = 'COLOCOBM'
const GOOGLE_FORM_LINK = 'https://docs.google.com/forms/d/e/1FAIpQLSct44ShJq2kK0DELwxdJBMrpYaGQdYpi1ZbNKFyzrjCNWCQcg/viewform'

const paymentMethods = [
  {
    id: 'paypal',
    title: 'PayPal',
    description: 'Dona a través de PayPal con tarjeta de crédito o débito',
    image: '/images/PayPal-Logo.png',
    color: '#0070BA',
  },
  {
    id: 'stripe',
    title: 'Tarjeta Bancaria',
    description: 'Paga con tarjeta de crédito o débito de forma segura',
    icon: Building2,
    color: '#635BFF',
  },
  {
    id: 'breve',
    title: 'Breve',
    description: 'Paga mediante transferencia Bancolombia',
    image: '/images/breve%20logo.webp',
    color: '#000000',
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
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [copiedAccount, setCopiedAccount] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOpen = () => {
      triggerRef.current = document.activeElement as HTMLButtonElement | null
      setIsOpen(true)
    }
    window.addEventListener('openDonationModal', handleOpen)
    return () => window.removeEventListener('openDonationModal', handleOpen)
  }, [])

  const focusFirstElement = useCallback(() => {
    if (modalRef.current) {
      const focusable = modalRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable) focusable.focus()
    }
  }, [])

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
      setTimeout(focusFirstElement, 50)
      window.addEventListener('keydown', trapFocus)
      return () => window.removeEventListener('keydown', trapFocus)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, focusFirstElement, trapFocus])

  const handleClose = useCallback(() => {
    gsap.to(`.${styles.modalContent}`, {
      opacity: 0,
      scale: 0.9,
      y: 50,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => {
        setIsOpen(false)
        setStep(1)
        setSelectedPayment(null)
        setCopiedAccount(false)
        setErrors({})
        setFormData({ name: '', email: '', phone: '', amount: 0, customAmount: '' })
        triggerRef.current?.focus()
      }
    })
    gsap.to(`.${styles.modalOverlay}`, {
      opacity: 0,
      duration: 0.3
    })
  }, [])

  const handleEscKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') handleClose()
  }, [handleClose])

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleEscKey)
      return () => window.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen, handleEscKey])

  const handleAmountSelect = (value: number) => {
    setFormData({ ...formData, amount: value, customAmount: '' })
    setErrors(prev => ({ ...prev, amount: '' }))
  }

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setFormData({ ...formData, customAmount: value, amount: parseInt(value) || 0 })
    setErrors(prev => ({ ...prev, amount: '' }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    const finalAmount = formData.customAmount ? parseInt(formData.customAmount) || 0 : formData.amount

    if (!finalAmount || finalAmount <= 0) {
      newErrors.amount = 'Selecciona o ingresa un monto válido'
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Ingresa tu nombre completo'
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Ingresa un correo electrónico válido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validateForm()) {
      setStep(2)
    }
  }

  async function handlePaymentSelect(methodId: string) {
    const finalAmount = formData.amount
    const userName = encodeURIComponent(formData.name)
    const userEmail = encodeURIComponent(formData.email)
    const userPhone = encodeURIComponent(formData.phone)

    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      amount: finalAmount,
      payment_method: methodId,
    }

    const success = await sendToWeb3Forms(submissionData)
    if (!success) {
      console.warn('No se pudo enviar la notificación de donación a Web3Forms.')
    }

    const googleFormLink = process.env.NEXT_PUBLIC_DONATION_FORM_LINK
      || 'https://docs.google.com/forms/d/e/1FAIpQLSct44ShJq2kK0DELwxdJBMrpYaGQdYpi1ZbNKFyzrjCNWCQcg/viewform'

    if (methodId === 'paypal') {
      const paypalLink = 'https://www.paypal.com/ncp/payment/QBPMD9R97XNUL'
      window.open(paypalLink, '_blank', 'noopener,noreferrer')
      handleClose()
    } else if (methodId === 'stripe') {
      alert('Stripe está en configuración. Pronto estará disponible.')
      return
    } else if (methodId === 'breve') {
      setSelectedPayment('breve')
      return
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedAccount(true)
      setTimeout(() => setCopiedAccount(false), 2000)
    } catch {
      console.error('No se pudo copiar')
    }
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
        <div className={styles.modalOverlay} onClick={handleClose} role="presentation">
          <div
            className={styles.modalWrapper}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="donation-title"
            ref={modalRef}
          >
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
                    <h2 className={styles.donationTitle} id="donation-title">Haz tu donación</h2>
                    <p className={styles.donationSubtitle}>
                      Selecciona el monto y completa tus datos para continuar
                    </p>
                  </div>

                  <div className={styles.formSection}>
                    <h3 className={styles.sectionTitle}>Selecciona el monto</h3>
                    <div className={styles.amountGrid}>
                      {DONATION_AMOUNTS.map((item) => (
                        <button
                          key={item.value}
                          type="button"
                          className={`${styles.amountButton} ${formData.amount === item.value && !formData.customAmount ? styles.active : ''}`}
                          onClick={() => handleAmountSelect(item.value)}
                          aria-pressed={formData.amount === item.value && !formData.customAmount}
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
                        aria-invalid={!!errors.amount}
                        aria-describedby={errors.amount ? 'amount-error' : undefined}
                      />
                      <span className={styles.currencyLabel}>COP</span>
                    </div>
                    {errors.amount && (
                      <p className={styles.fieldError} id="amount-error" role="alert">{errors.amount}</p>
                    )}
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
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p className={styles.fieldError} id="name-error" role="alert">{errors.name}</p>
                      )}
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
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && (
                          <p className={styles.fieldError} id="email-error" role="alert">{errors.email}</p>
                        )}
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
                    {selectedPayment === 'breve' ? (
                      <button
                        type="button"
                        className={styles.backButton}
                        onClick={() => setSelectedPayment(null)}
                      >
                        <ArrowLeft size={20} />
                        Volver a métodos de pago
                      </button>
                    ) : (
                      <button type="button" className={styles.backButton} onClick={handleBack}>
                        <ArrowLeft size={20} />
                        Volver
                      </button>
                    )}
                    <Heart size={40} className={styles.heartIcon} />
                    <h2 className={styles.donationTitle} id="donation-title">
                      {selectedPayment === 'breve' ? 'Paga con Breve' : 'Elige cómo donar'}
                    </h2>
                    <p className={styles.donationSubtitle}>
                      Monto: <strong>${getFinalAmount().toLocaleString('es-CO')} COP</strong>
                    </p>
                  </div>

                  {selectedPayment === 'breve' ? (
                    <div className={styles.breveInfoCard}>
                      <div className={styles.breveLogoWrapper}>
                        <Image
                          src="/images/breve%20logo.webp"
                          alt="Breve Logo"
                          width={120}
                          height={120}
                          className={styles.breveLogo}
                          priority
                        />
                      </div>
                      <h3 className={styles.breveTitle}>Transferencia Bancolombia</h3>
                      <p className={styles.breveDescription}>
                        Realiza tu donación por transferencia a la siguiente cuenta:
                      </p>

                      <div className={styles.breveAccountBox}>
                        <span className={styles.breveAccountLabel}>Cuenta de ahorros BANCOLOMBIA</span>
                        <span className={styles.breveAccountNumber}>{BREVE_ACCOUNT_NUMBER}</span>
                        <button
                          type="button"
                          className={styles.breveCopyButton}
                          onClick={() => copyToClipboard(BREVE_ACCOUNT_NUMBER)}
                        >
                          {copiedAccount ? <CheckCheck size={18} /> : <Copy size={18} />}
                          {copiedAccount ? 'Copiado' : 'Copiar número'}
                        </button>
                      </div>

                      <div className={styles.breveDetailBox}>
                        <div className={styles.breveDetailRow}>
                          <span className={styles.breveDetailLabel}>Bre-B:</span>
                          <span className={styles.breveDetailValue}>{BREVE_BREB}</span>
                          <button
                            type="button"
                            className={styles.breveCopyButton}
                            onClick={() => copyToClipboard(BREVE_BREB)}
                          >
                            {copiedAccount ? <CheckCheck size={18} /> : <Copy size={18} />}
                            {copiedAccount ? 'Copiado' : 'Copiar'}
                          </button>
                        </div>
                        <div className={styles.breveDetailRow}>
                          <span className={styles.breveDetailLabel}>Código Swift:</span>
                          <span className={styles.breveDetailValue}>{BREVE_SWIFT}</span>
                          <button
                            type="button"
                            className={styles.breveCopyButton}
                            onClick={() => copyToClipboard(BREVE_SWIFT)}
                          >
                            {copiedAccount ? <CheckCheck size={18} /> : <Copy size={18} />}
                            {copiedAccount ? 'Copiado' : 'Copiar'}
                          </button>
                        </div>
                      </div>

                      <a
                        href={GOOGLE_FORM_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.breveFormLink}
                      >
                        Abrir formulario de donación →
                      </a>

                      <p className={styles.breveInstructions}>
                        Una vez realizada la transferencia, envía el comprobante al correo o WhatsApp
                        de la fundación para confirmar tu donación.
                      </p>
                    </div>
                  ) : (
                    <div className={styles.paymentGrid}>
                      {paymentMethods.map((method) => {
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
                            {method.image ? (
                              <Image
                                src={method.image}
                                alt={method.title}
                                width={48}
                                height={48}
                                className={styles.paymentLogo}
                              />
                            ) : method.icon ? (
                              <method.icon size={28} />
                            ) : null}
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
                  )}

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
