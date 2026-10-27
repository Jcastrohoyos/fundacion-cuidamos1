'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { Heart, X, CreditCard, Building2, ArrowLeft, Check, Copy, CheckCheck, Gift, Utensils, Award, ArrowUpRight, ExternalLink, MessageCircle, Phone } from 'lucide-react'
import Image from 'next/image'
import styles from './DonationModal.module.css'
import { sendToWeb3Forms } from '../../utils/web3forms'
import { DONATION_AMOUNTS } from '../../utils/donations'
import { whatsappHref } from '../../utils/siteConfig'

const BREVE_ACCOUNT_NUMBER = '191-000032-72'
const BREVE_BREB = '0067641241'
const BREVE_SWIFT = 'COLOCOBM'
const GOOGLE_FORM_LINK = 'https://docs.google.com/forms/d/e/1FAIpQLSct44ShJq2kK0DELwxdJBMrpYaGQdYpi1ZbNKFyzrjCNWCQcg/viewform'
const googleFormLink = process.env.NEXT_PUBLIC_DONATION_FORM_LINK || GOOGLE_FORM_LINK

const MEAL_VOUCHER_PRICE = 13900
const MEAL_VOUCHER_QUANTITIES = [1, 2, 4] as const

type SupportMode = 'money' | 'gifts'

const buildWhatsappLink = (message: string) =>
  `${whatsappHref}?text=${encodeURIComponent(message)}`

const paypalLink = 'https://www.paypal.com/ncp/payment/QBPMD9R97XNUL'

const giftSupportOptions = [
  {
    id: 'meal-voucher',
    title: 'Bono de almuerzo',
    description: 'Ayuda a proporcionar alimentos nutritivos para los cuidadores que más lo necesitan.',
    icon: Utensils,
    color: '#F59E0B',
    href: paypalLink,
    cta: 'Aportar con PayPal',
  },
  {
    id: 'gift-bag',
    title: 'Bolsa solidaria Cuidamos con Amor',
    description: 'Al realizar una donación de $20.000 COP o más, recibirás una bolsa reutilizable como símbolo de tu apoyo a nuestra misión.',
    icon: Gift,
    color: '#EC4899',
    href: buildWhatsappLink('Hola, quiero realizar una donación para recibir la Bolsa Solidaria Cuidamos con Amor. ¿Cómo puedo hacerlo?'),
    cta: 'Realizar donación',
    image: '/images/bolsaderegalo.jpeg',
  },
  {
    id: 'memorial-voucher',
    title: 'Bono conmemorativo',
    description: 'Celebra una fecha especial llevando el nombre de un ser querido.',
    icon: Award,
    color: '#8B5CF6',
    href: paypalLink,
    cta: 'Solicitar bono',
  },
]

const paymentMethods = [
  {
    id: 'paypal-breve',
    title: 'PayPal o Breve',
    description: 'Dona con PayPal (tarjeta) o Breve (transferencia Bancolombia)',
    image: '/images/PayPal-Logo.png',
    secondaryImage: '/images/breve%20logo.webp',
    color: '#0070BA',
  },
  {
    id: 'stripe',
    title: 'Tarjeta Bancaria',
    description: 'Dona con tarjeta de crédito o débito de forma segura',
    icon: Building2,
    color: '#635BFF',
  },
]

export function openDonationModal(giftId?: string) {
  window.dispatchEvent(new CustomEvent('openDonationModal', { detail: { giftId } }))
}

export default function DonationModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: 0,
    customAmount: '',
  })
  const [supportMode, setSupportMode] = useState<SupportMode>('money')
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null)
  const [mealVoucherQuantity, setMealVoucherQuantity] = useState(1)
  const [memorialFormData, setMemorialFormData] = useState({
    donorName: '',
    recipientName: '',
    occasion: '',
    personalMessage: '',
  })
  const [showingMemorialForm, setShowingMemorialForm] = useState(false)
  const [mealVoucherPaymentMethod, setMealVoucherPaymentMethod] = useState<'paypal' | 'breve' | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [copiedAccount, setCopiedAccount] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ giftId?: string }>
      triggerRef.current = document.activeElement as HTMLButtonElement | null
      setIsOpen(true)
      if (customEvent.detail?.giftId === 'memorial-voucher') {
        setSupportMode('gifts')
        setSelectedGiftId('memorial-voucher')
        setShowingMemorialForm(true)
      }
    }
    window.addEventListener('openDonationModal', handleOpen as EventListener)
    return () => window.removeEventListener('openDonationModal', handleOpen as EventListener)
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
        setSupportMode('money')
        setSelectedGiftId(null)
        setMealVoucherQuantity(1)
        setShowingMemorialForm(false)
        setIsProcessing(false)
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

  const handleSupportModeChange = (mode: SupportMode) => {
    setSupportMode(mode)
    setStep(1)
    setSelectedPayment(null)
    setErrors({})
  }

  const handleAmountSelect = (value: number) => {
    setFormData({ ...formData, amount: value, customAmount: '' })
    setErrors(prev => ({ ...prev, amount: '' }))
  }

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setFormData({ ...formData, customAmount: value, amount: parseInt(value) || 0 })
    setErrors(prev => ({ ...prev, amount: '' }))
  }

  const handleSelectGift = (id: string) => {
    if (id === 'meal-voucher') {
      setSelectedGiftId(id)
      setMealVoucherQuantity(1)
      setShowingMemorialForm(false)
    } else if (id === 'memorial-voucher') {
      setSelectedGiftId(id)
      setShowingMemorialForm(true)
    } else {
      window.open(giftSupportOptions.find(o => o.id === id)?.href || '', '_blank', 'noopener noreferrer')
      handleClose()
    }
  }

  const handleMemorialInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMemorialFormData({ ...memorialFormData, [e.target.name]: e.target.value })
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const handleMemorialDonate = () => {
    const newErrors: Record<string, string> = {}
    if (!memorialFormData.donorName.trim()) newErrors.donorName = 'Ingresa tu nombre'
    if (!memorialFormData.recipientName.trim()) newErrors.recipientName = 'Ingresa el nombre del homenajeado'
    if (!memorialFormData.occasion.trim()) newErrors.occasion = 'Ingresa la fecha u ocasión especial'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    window.open(paypalLink, '_blank', 'noopener noreferrer')
    handleClose()
  }

  const handleMealVoucherQuantity = (q: number) => {
    setMealVoucherQuantity(q)
  }

  const handleMealVoucherPaypal = () => {
    const total = mealVoucherQuantity * MEAL_VOUCHER_PRICE
    const paypalUrl = `${paypalLink}?amount=${total}`
    window.open(paypalUrl, '_blank', 'noopener noreferrer')
    handleClose()
  }

  const handleMealVoucherBreve = () => {
    setMealVoucherPaymentMethod('breve')
  }

  const handleMealVoucherBreveConfirm = () => {
    const total = mealVoucherQuantity * MEAL_VOUCHER_PRICE
    const message = `Hola, he realizado una donación por transferencia Breve de $${total.toLocaleString('es-CO')} COP para comprar ${mealVoucherQuantity} bono${mealVoucherQuantity > 1 ? 's' : ''} de almuerzo de la Fundación Cuidamos con Amor.

Monto: $${total.toLocaleString('es-CO')} COP
Cantidad: ${mealVoucherQuantity} bono${mealVoucherQuantity > 1 ? 's' : ''} de almuerzo ($13.900 COP c/u)
Método: Breve - Transferencia Bancolombia`
    window.open(buildWhatsappLink(message), '_blank', 'noopener noreferrer')
    handleClose()
  }

  const handleMealVoucherContinue = () => {
    setMealVoucherPaymentMethod(null)
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

  const handleConfirmAndPay = () => {
    setStep(3)
  }

  async function handlePaymentSelect(methodId: string) {
    setIsProcessing(true)
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

    if (methodId === 'paypal' || methodId === 'paypal-breve') {
      window.open(paypalLink, '_blank', 'noopener,noreferrer')
      setIsProcessing(false)
      handleClose()
    } else if (methodId === 'stripe') {
      setIsProcessing(false)
      alert('Stripe está en configuración. Pronto estará disponible.')
      return
    } else if (methodId === 'breve') {
      setIsProcessing(false)
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
    if (step === 3) {
      setStep(2)
    } else if (step === 2) {
      setStep(1)
    } else {
      setStep(1)
    }
  }

  const getFinalAmount = () => {
    if (formData.customAmount) {
      return parseInt(formData.customAmount) || 0
    }
    return formData.amount
  }

  let giftSectionContent: React.ReactNode
  if (selectedGiftId === 'meal-voucher') {
    giftSectionContent = (
      <>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => setSelectedGiftId(null)}
        >
          <ArrowLeft size={20} />
          Volver
        </button>
        <div className={styles.mealVoucherOptions}>
          {mealVoucherPaymentMethod === null ? (
            <>
              <h3 className={styles.sectionTitle}>Bono de almuerzo</h3>
              <p className={styles.mealVoucherPrice}>
                Valor de cada bono: <strong>$13.900 COP</strong>
              </p>
              <div className={styles.quantityGrid}>
                {MEAL_VOUCHER_QUANTITIES.map((q) => {
                  const total = q * MEAL_VOUCHER_PRICE
                  const isSelected = mealVoucherQuantity === q
                  return (
                    <button
                      key={q}
                      type="button"
                      className={`${styles.quantityButton} ${isSelected ? styles.quantityActive : ''}`}
                      onClick={() => handleMealVoucherQuantity(q)}
                      aria-pressed={isSelected}
                    >
                      <span>{q} bono{q > 1 ? 's' : ''}</span>
                      <span className={styles.quantityTotal}>
                        $${total.toLocaleString('es-CO')} COP
                      </span>
                    </button>
                  )
                })}
              </div>
              <div className={styles.mealVoucherTotal}>
                <span className={styles.mealVoucherTotalLabel}>Total:</span>
                <span className={styles.mealVoucherTotalValue}>
                  $${(mealVoucherQuantity * MEAL_VOUCHER_PRICE).toLocaleString('es-CO')} COP
                </span>
              </div>
              <div className={styles.mealVoucherPaymentButtons}>
                <button
                  type="button"
                  className={`${styles.continueButton} ${styles.paymentPaypalButton}`}
                  onClick={handleMealVoucherPaypal}
                >
                  Pagar con PayPal
                  <span className={styles.arrowRight}>→</span>
                </button>
                <button
                  type="button"
                  className={`${styles.continueButton} ${styles.paymentBreveButton}`}
                  onClick={handleMealVoucherBreve}
                >
                  Pagar con Breve
                  <span className={styles.arrowRight}>→</span>
                </button>
              </div>
            </>
          ) : mealVoucherPaymentMethod === 'breve' ? (
            <>
              <button
                type="button"
                className={styles.backButton}
                onClick={() => setMealVoucherPaymentMethod(null)}
              >
                <ArrowLeft size={20} />
                Volver
              </button>
              <div className={styles.mealVoucherBreveCard}>
                <h3 className={styles.sectionTitle}>Pagar con Breve</h3>
                <p className={styles.mealVoucherBreveDescription}>
                  Realiza tu transferencia a la siguiente cuenta y luego confirma por WhatsApp.
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
                <p className={styles.breveInstructions}>
                  Monto a transferir: <strong>$${(mealVoucherQuantity * MEAL_VOUCHER_PRICE).toLocaleString('es-CO')} COP</strong>
                </p>
                <a
                  href={googleFormLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.breveFormLink}
                >
                  Abrir formulario de confirmación →
                </a>
                <p className={styles.breveInstructions}>
                  Una vez realizada la transferencia, completa el formulario para confirmar tu donación.
                </p>
                <button
                  type="button"
                  className={styles.continueButton}
                  onClick={handleMealVoucherBreveConfirm}
                >
                  He hecho la transferencia
                  <span className={styles.arrowRight}>→</span>
                </button>
              </div>
            </>
          ) : null}
        </div>
      </>
    )
  } else if (showingMemorialForm && selectedGiftId === 'memorial-voucher') {
    giftSectionContent = (
      <>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => setShowingMemorialForm(false)}
        >
          <ArrowLeft size={20} />
          Volver
        </button>
        <div className={styles.memorialForm}>
          <h3 className={styles.sectionTitle}>Bono conmemorativo</h3>
          <p className={styles.memorialFormDescription}>
            Llena tus datos antes de continuar con tu aporte.
          </p>
          <div className={styles.inputGroup}>
            <label htmlFor="memorial-donor" className={styles.label}>
              Tu nombre completo *
            </label>
            <input
              type="text"
              id="memorial-donor"
              name="donorName"
              className={`${styles.input} ${errors.donorName ? styles.inputError : ''}`}
              value={memorialFormData.donorName}
              onChange={handleMemorialInputChange}
              placeholder="Tu nombre completo"
              required
              aria-invalid={!!errors.donorName}
              aria-describedby={errors.donorName ? 'memorial-donor-error' : undefined}
            />
            {errors.donorName && (
              <p className={styles.fieldError} id="memorial-donor-error" role="alert">
                {errors.donorName}
              </p>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="memorial-recipient" className={styles.label}>
              Nombre del homenajeado *
            </label>
            <input
              type="text"
              id="memorial-recipient"
              name="recipientName"
              className={`${styles.input} ${errors.recipientName ? styles.inputError : ''}`}
              value={memorialFormData.recipientName}
              onChange={handleMemorialInputChange}
              placeholder="Nombre del ser querido"
              required
              aria-invalid={!!errors.recipientName}
              aria-describedby={errors.recipientName ? 'memorial-recipient-error' : undefined}
            />
            {errors.recipientName && (
              <p className={styles.fieldError} id="memorial-recipient-error" role="alert">
                {errors.recipientName}
              </p>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="memorial-occasion" className={styles.label}>
              Ocasión o fecha especial *
            </label>
            <input
              type="text"
              id="memorial-occasion"
              name="occasion"
              className={`${styles.input} ${errors.occasion ? styles.inputError : ''}`}
              value={memorialFormData.occasion}
              onChange={handleMemorialInputChange}
              placeholder="Ej. Cumpleaños, aniversario, fallecimiento"
              required
              aria-invalid={!!errors.occasion}
              aria-describedby={errors.occasion ? 'memorial-occasion-error' : undefined}
            />
            {errors.occasion && (
              <p className={styles.fieldError} id="memorial-occasion-error" role="alert">
                {errors.occasion}
              </p>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="memorial-message" className={styles.label}>
              Mensaje personal
            </label>
            <textarea
              id="memorial-message"
              name="personalMessage"
              className={`${styles.input} ${errors.personalMessage ? styles.inputError : ''}`}
              value={memorialFormData.personalMessage}
              onChange={handleMemorialInputChange}
              placeholder="Un mensaje corto para acompañar el bono"
              rows={3}
              aria-invalid={!!errors.personalMessage}
              aria-describedby={errors.personalMessage ? 'memorial-message-error' : undefined}
            />
            {errors.personalMessage && (
              <p className={styles.fieldError} id="memorial-message-error" role="alert">
                {errors.personalMessage}
              </p>
            )}
          </div>
          <p className={styles.memorialBreveNote}>
            También puedes hacer tu aporte con <strong>Breve por transferencia Bancolombia</strong>.
          </p>
          <button
            type="button"
            className={styles.continueButton}
            onClick={handleMemorialDonate}
            disabled={Object.keys(errors).length > 0}
          >
            Continuar con mi aporte
            <span className={styles.arrowRight}>→</span>
          </button>
        </div>
      </>
    )
  } else {
    giftSectionContent = (
      <>
        <h3 className={styles.sectionTitle}>Elige cómo quieres apoyar</h3>
        <p className={styles.giftSectionDescription}>
          Cada opción abre el enlace de tu aporte correspondiente.
        </p>
        <div className={styles.giftGrid}>
          {giftSupportOptions.map((option) => {
            const OptionIcon = option.icon
            const isSelected = selectedGiftId === option.id
            return (
              <button
                key={option.id}
                type="button"
                className={`${styles.giftCard} ${isSelected ? styles.giftSelected : ''}`}
                onClick={() => handleSelectGift(option.id)}
                aria-pressed={isSelected}
              >
                <span
                  className={styles.giftIcon}
                  style={{ backgroundColor: `${option.color}15`, color: option.color }}
                >
                  {option.image ? (
                    <Image
                      src={option.image}
                      alt={option.title}
                      width={28}
                      height={28}
                      className={styles.giftImage}
                      priority
                    />
                  ) : (
                    <OptionIcon size={28} />
                  )}
                </span>
                <h3 className={styles.giftTitle}>{option.title}</h3>
                <p className={styles.giftDescription}>{option.description}</p>
                {option.id === 'meal-voucher' && (
                  <span className={styles.mealVoucherUnitPrice}>
                    $13.900 COP c/u
                  </span>
                )}
                <span className={styles.giftCta}>
                  {option.cta}
                  <ArrowUpRight size={18} />
                </span>
              </button>
            )
          })}
        </div>
        <div className={styles.giftNotice}>
          <ExternalLink size={17} />
          <span>Los enlaces se abrirán en una pestaña nueva.</span>
        </div>
        <div className={styles.whatsappConsultSection}>
          <div className={styles.whatsappConsultContent}>
            <div className={styles.whatsappConsultIcon}>
              <MessageCircle size={24} />
            </div>
            <div className={styles.whatsappConsultText}>
              <h4 className={styles.whatsappConsultTitle}>¿Tienes dudas?</h4>
              <p className={styles.whatsappConsultDesc}>
                Escríbenos por WhatsApp para cualquier consulta sobre donaciones, bonos o cómo ayudar.
              </p>
            </div>
            <button
              type="button"
              className={styles.whatsappConsultButton}
              onClick={() => {
                window.open(buildWhatsappLink('Hola, tengo una consulta sobre las donaciones y bonos de la Fundación Cuidamos con Amor. Me gustaría más información.'), '_blank', 'noopener noreferrer')
                handleClose()
              }}
            >
              Chatear por WhatsApp
              <Phone size={16} />
            </button>
          </div>
        </div>
      </>
    )
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
                    <h2 className={styles.donationTitle} id="donation-title">
                      {supportMode === 'money' ? 'Haz tu donación' : 'Apoya con un bono o regalo'}
                    </h2>
                    <p className={styles.donationSubtitle}>
                      {supportMode === 'money'
                        ? 'Selecciona el monto y completa tus datos para continuar'
                        : 'Elige una opción y abre el enlace de tu aporte'}
                    </p>
                  </div>

                  <div className={styles.supportTypeSwitch} role="group" aria-label="Elige cómo quieres apoyar">
                    <button
                      type="button"
                      className={`${styles.supportTypeButton} ${supportMode === 'money' ? styles.active : ''}`}
                      onClick={() => handleSupportModeChange('money')}
                      aria-pressed={supportMode === 'money'}
                    >
                      <span className={styles.supportTypeIcon}>
                        <CreditCard size={20} />
                      </span>
                      <span className={styles.supportTypeText}>
                        <strong>Aporte económico</strong>
                        <small>PayPal o Breve</small>
                      </span>
                    </button>
                    <button
                      type="button"
                      className={`${styles.supportTypeButton} ${supportMode === 'gifts' ? styles.active : ''}`}
                      onClick={() => handleSupportModeChange('gifts')}
                      aria-pressed={supportMode === 'gifts'}
                    >
                      <span className={styles.supportTypeIcon}>
                        <Gift size={20} />
                      </span>
                      <span className={styles.supportTypeText}>
                        <strong>Bonos y regalos</strong>
                        <small>Elige una opción especial</small>
                      </span>
                    </button>
                  </div>

                  {supportMode === 'money' ? (
                    <>
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
                        <div className={styles.summaryRow} style={{ marginTop: '0.5rem' }}>
                          <span className={styles.summaryLabel}>Tu nombre:</span>
                          <span className={styles.summaryValue}>{formData.name || '—'}</span>
                        </div>
                        <div className={styles.summaryRow} style={{ marginTop: '0.5rem' }}>
                          <span className={styles.summaryLabel}>Tu correo:</span>
                          <span className={styles.summaryValue}>{formData.email || '—'}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className={styles.continueButton}
                        onClick={handleContinue}
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Procesando...' : 'Revisar y continuar'}
                        <span className={styles.arrowRight}>→</span>
                      </button>
                    </>
                  ) : (
                    <div className={styles.giftSection}>
                      {giftSectionContent}
                    </div>
                  )}
                </>
              ) : step === 2 ? (
                <>
                  <div className={styles.donationHeader}>
                    <button type="button" className={styles.backButton} onClick={handleBack}>
                      <ArrowLeft size={20} />
                      Volver
                    </button>
                    <Heart size={40} className={styles.heartIcon} />
                    <h2 className={styles.donationTitle} id="donation-title">Resumen de tu aporte</h2>
                    <p className={styles.donationSubtitle}>
                      Revisa los detalles antes de continuar con el pago.
                    </p>
                  </div>

                  <div className={styles.summaryCard}>
                    <h3 className={styles.summarySectionTitle}>Detalle del aporte</h3>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Monto total:</span>
                      <span className={styles.summaryValue}>${getFinalAmount().toLocaleString('es-CO')} COP</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Nombre:</span>
                      <span className={styles.summaryValue}>{formData.name}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Correo electrónico:</span>
                      <span className={styles.summaryValue}>{formData.email}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Teléfono:</span>
                      <span className={styles.summaryValue}>{formData.phone || 'No proporcionado'}</span>
                    </div>
                  </div>

                  <div className={styles.trustBadges}>
                    <div className={styles.trustBadge}>
                      <Check size={16} />
                      <span>Pago 100% seguro</span>
                    </div>
                    <div className={styles.trustBadge}>
                      <Gift size={16} />
                      <span>Tu aporte llega directo</span>
                    </div>
                    <div className={styles.trustBadge}>
                      <Heart size={16} />
                      <span>Deducible de impuestos</span>
                    </div>
                  </div>

                  <div className={styles.buttonGroup}>
                    <button
                      type="button"
                      className={styles.backButton}
                      onClick={handleBack}
                    >
                      <ArrowLeft size={20} />
                      Editar datos
                    </button>
                    <button
                      type="button"
                      className={styles.continueButton}
                      onClick={handleConfirmAndPay}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Procesando...' : 'Continuar al pago'}
                      <span className={styles.arrowRight}>→</span>
                    </button>
                  </div>
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
                      {selectedPayment === 'breve' ? 'Dona con Breve' : 'Elige cómo aportar'}
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
                        href={googleFormLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.breveFormLink}
                      >
                        Abrir formulario de confirmación →
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
                            disabled={isDisabled || isProcessing}
                          >
                            <div
                              className={styles.paymentIcon}
                              style={{ backgroundColor: `${method.color}15`, color: method.color }}
                            >
                              {method.image ? (
                                <div className={styles.paymentIconGroup}>
                                  <Image
                                    src={method.image}
                                    alt={method.title}
                                    width={40}
                                    height={40}
                                    className={styles.paymentLogo}
                                  />
                                  {method.secondaryImage && (
                                    <Image
                                      src={method.secondaryImage}
                                      alt="Breve Logo"
                                      width={32}
                                      height={32}
                                      className={styles.paymentSecondaryLogo}
                                    />
                                  )}
                                </div>
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

                  {supportMode === 'money' && (
                    <div className={styles.donationInfo}>
                      <Check size={16} className={styles.checkIcon} />
                      <span>Tu donación es segura y 100% deducible de impuestos</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
