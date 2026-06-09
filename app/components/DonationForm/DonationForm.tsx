'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import styles from './DonationForm.module.css'

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

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
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, customAmount: e.target.value, amount: 'custom' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const finalAmount = formData.amount === 'custom' ? formData.customAmount : formData.amount

      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          amount: finalAmount,
          message: formData.message
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        if (data.data.checkout_url) {
          window.location.href = data.data.checkout_url
        } else {
          setIsSubmitting(false)
          setSubmitted(true)

          setTimeout(() => {
            if (onClose) onClose()
            setSubmitted(false)
            setFormData({
              name: '',
              email: '',
              phone: '',
              amount: '',
              customAmount: '',
              message: ''
            })
          }, 3000)
        }
      } else {
        throw new Error(data.error || 'Error al procesar el pago')
      }
    } catch (error) {
      console.error('Error al procesar donación:', error)
      alert('Error al procesar la donación. Por favor intenta nuevamente.')
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (submitted) {
    return (
      <div className={styles.successMessage} ref={containerRef}>
        <div className={styles.successIcon}>✓</div>
        <h3 className={styles.successTitle}>¡Gracias por tu donación!</h3>
        <p className={styles.successText}>Tu aporte hará una gran diferencia en la vida de muchos niños y familias.</p>
      </div>
    )
  }

  return (
    <div className={styles.donationForm} ref={containerRef}>
      <h2 className={`${styles.title} donation-form-item`}>Haz tu donación</h2>
      <p className={`${styles.subtitle} donation-form-item`}>Tu apoyo transforma vidas</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={`${styles.section} donation-form-item`}>
          <h3 className={styles.sectionTitle}>Selecciona el monto</h3>
          <div className={styles.amountOptions}>
            {['10000', '25000', '50000', '100000'].map((amount) => (
              <button
                key={amount}
                type="button"
                className={`${styles.amountButton} ${formData.amount === amount ? styles.active : ''}`}
                onClick={() => handleAmountChange(amount)}
              >
                ${parseInt(amount).toLocaleString('es-CO')}
              </button>
            ))}
            <input
              type="number"
              placeholder="Otro monto"
              className={`${styles.customAmount} ${formData.amount === 'custom' ? styles.active : ''}`}
              value={formData.customAmount}
              onChange={handleCustomAmountChange}
            />
          </div>
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
            />
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
            />
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
            {isSubmitting ? 'Procesando...' : 'Donar Ahora'}
          </button>
          <p className={styles.disclaimer}>
            Tu donación es segura y privada. Aceptamos tarjetas de crédito, débito y transferencias bancarias.
          </p>
        </div>
      </form>
    </div>
  )
}
