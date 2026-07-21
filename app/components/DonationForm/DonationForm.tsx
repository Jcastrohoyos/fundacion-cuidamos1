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

    const finalAmount = formData.amount === 'custom' ? formData.customAmount : formData.amount
    const numericAmount = parseFloat(finalAmount)

    if (!numericAmount || numericAmount <= 0) {
      alert('Selecciona un monto válido para donar.')
      return
    }

    const wompiLink = process.env.NEXT_PUBLIC_WOMPI_DONATION_LINK
      || 'https://checkout.wompi.co/l/test_VPOS_wIY2x7'

    window.open(wompiLink, '_blank', 'noopener,noreferrer')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
          >
            Donar Ahora
          </button>
          <p className={styles.disclaimer}>
            Tu donación es segura y privada. Aceptamos tarjetas de crédito, débito y transferencias bancarias.
          </p>
        </div>
      </form>
    </div>
  )
}
