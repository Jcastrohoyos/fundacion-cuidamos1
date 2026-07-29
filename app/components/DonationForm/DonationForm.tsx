'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import styles from './DonationForm.module.css'
import { sendToWeb3Forms } from '../../utils/web3forms'
import { DONATION_AMOUNTS } from '../../utils/donations'

export default function DonationForm({ onClose }: { onClose?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    customAmount: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useGSAP(() => {
    gsap.from('.donation-form-item', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out'
    })
  }, { scope: containerRef })

  const handleAmountChange = (amount: string) => {
    setFormData({ ...formData, amount, customAmount: '' })
    setErrors(prev => ({ ...prev, amount: '' }))
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, customAmount: e.target.value, amount: 'custom' })
    setErrors(prev => ({ ...prev, amount: '' }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    const finalAmount = formData.amount === 'custom' ? formData.customAmount : formData.amount
    const numericAmount = parseFloat(finalAmount)

    if (!numericAmount || numericAmount <= 0) {
      newErrors.amount = 'Selecciona un monto válido para donar.'
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Ingresa tu nombre completo.'
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Ingresa un correo electrónico válido.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    const finalAmount = formData.amount === 'custom' ? formData.customAmount : formData.amount
    const numericAmount = parseFloat(finalAmount)

    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      amount: numericAmount,
      message: formData.message,
    }

    await sendToWeb3Forms(submissionData)

    const wompiLink = process.env.NEXT_PUBLIC_WOMPI_DONATION_LINK
      || 'https://checkout.wompi.co/l/test_VPOS_wIY2x7'

    window.open(wompiLink, '_blank', 'noopener,noreferrer')
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  return (
    <div className={styles.donationForm} ref={containerRef}>
      <h2 className={`${styles.title} donation-form-item`}>Haz tu donación</h2>
      <p className={`${styles.subtitle} donation-form-item`}>Tu apoyo transforma vidas</p>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={`${styles.section} donation-form-item`}>
          <h3 className={styles.sectionTitle}>Selecciona el monto</h3>
          <div className={styles.amountOptions}>
            {DONATION_AMOUNTS.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`${styles.amountButton} ${formData.amount === String(item.value) ? styles.active : ''}`}
                onClick={() => handleAmountChange(String(item.value))}
                aria-pressed={formData.amount === String(item.value)}
              >
                {item.label}
              </button>
            ))}
            <input
              type="number"
              placeholder="Otro monto"
              className={`${styles.customAmount} ${formData.amount === 'custom' ? styles.active : ''}`}
              value={formData.customAmount}
              onChange={handleCustomAmountChange}
              aria-invalid={!!errors.amount}
              aria-describedby={errors.amount ? 'form-amount-error' : undefined}
            />
          </div>
          {errors.amount && (
            <p className={styles.fieldError} id="form-amount-error" role="alert">{errors.amount}</p>
          )}
        </div>

        <div className={`${styles.section} donation-form-item`}>
          <h3 className={styles.sectionTitle}>Información del donante</h3>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Nombre completo *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className={styles.input}
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'form-name-error' : undefined}
            />
            {errors.name && (
              <p className={styles.fieldError} id="form-name-error" role="alert">{errors.name}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Correo electrónico *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'form-email-error' : undefined}
            />
            {errors.email && (
              <p className={styles.fieldError} id="form-email-error" role="alert">{errors.email}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="phone" className={styles.label}>Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={styles.input}
              value={formData.phone}
              onChange={handleChange}
              placeholder="+57 300 123 4567"
            />
          </div>
        </div>

        <div className={`${styles.section} donation-form-item`}>
          <h3 className={styles.sectionTitle}>Mensaje (opcional)</h3>
          <textarea
            name="message"
            className={styles.textarea}
            value={formData.message}
            onChange={handleChange}
            placeholder="Deja un mensaje de aliento..."
            rows={4}
          />
        </div>

        <div className={`${styles.submitSection} donation-form-item`}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Donar Ahora'}
          </button>
          <p className={styles.disclaimer}>
            Tu donación es segura y privada. Aceptamos tarjetas de crédito, débito y transferencias bancarias.
          </p>
        </div>
      </form>
    </div>
  )
}
