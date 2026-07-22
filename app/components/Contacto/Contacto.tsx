'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Mail, FileText, MapPin } from 'lucide-react'
import styles from './Contacto.module.css'

function InstagramIcon({ size = 22, strokeWidth = 1.8 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

const contactItems = [
  {
    icon: Mail,
    label: 'Correo electrónico',
    value: 'contacto@cuidamosconamor.org',
    href: 'mailto:contacto@cuidamosconamor.org',
  },
  {
    icon: InstagramIcon,
    label: 'Instagram',
    value: '@cuidamosconamor_fundacion',
    href: 'https://www.instagram.com/cuidamosconamor_fundacion/',
    external: true,
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'Colombia',
    href: '#',
  },
]

export default function Contacto() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  useGSAP(() => {
    gsap.from('.contacto-badge', {
      opacity: 0, y: 16, duration: 0.6, ease: 'power3.out',
    })
    gsap.from('.contacto-title', {
      opacity: 0, y: 30, duration: 0.8, delay: 0.1, ease: 'power3.out',
    })
    gsap.from('.contacto-subtitle', {
      opacity: 0, y: 20, duration: 0.8, delay: 0.25, ease: 'power3.out',
    })
    gsap.from('.contacto-left', {
      opacity: 0, x: -40, duration: 0.9, delay: 0.4, ease: 'power3.out',
    })
    gsap.from('.contacto-right', {
      opacity: 0, x: 40, duration: 0.9, delay: 0.5, ease: 'power3.out',
    })
    gsap.from('.contacto-item', {
      opacity: 0, y: 20, duration: 0.5, stagger: 0.12, delay: 0.65, ease: 'back.out(1.4)',
    })
  }, { scope: containerRef })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1800)
  }

  return (
    <section className={styles.contacto} id="contacto" ref={containerRef}>
      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <span className={`${styles.badge} contacto-badge`}>Contáctanos</span>
          <h2 className={`${styles.title} contacto-title`}>¿Hablamos?</h2>
          <p className={`${styles.subtitle} contacto-subtitle`}>
            Si deseas más información o quieres apoyarnos, escríbenos y te responderemos con mucho cariño.
          </p>
        </div>

        {/* ── Two‑column layout ── */}
        <div className={styles.grid}>

          {/* Left – contact info */}
          <div className={`${styles.left} contacto-left`}>
            <p className={styles.leftIntro}>
              Estamos aquí para ayudarte. Elige el canal que prefieras o completa el formulario.
            </p>

            <div className={styles.items}>
              {contactItems.map(({ icon: Icon, label, value, href, external }) => (
                <a
                  key={label}
                  href={href}
                  className={`${styles.contactItem} contacto-item`}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <div className={styles.iconBox}>
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <div className={styles.itemText}>
                    <span className={styles.itemLabel}>{label}</span>
                    <span className={styles.itemValue}>{value}</span>
                  </div>
                </a>
              ))}

              {/* PQRS card */}
              <a href="#" className={`${styles.contactItem} ${styles.pqrs} contacto-item`}>
                <div className={styles.iconBox}>
                  <FileText size={22} strokeWidth={1.8} />
                </div>
                <div className={styles.itemText}>
                  <span className={styles.itemLabel}>PQRS</span>
                  <span className={styles.itemValue}>Haz clic para completar el formulario</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right – contact form */}
          <div className={`${styles.right} contacto-right`}>
            {status === 'sent' ? (
              <div className={styles.successBox}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>¡Mensaje enviado!</h3>
                <p className={styles.successText}>
                  Gracias por contactarnos. Te responderemos pronto con mucho amor.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="contact-name">Nombre</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Tu nombre completo"
                      className={styles.input}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="contact-email">Correo</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="tu@correo.com"
                      className={styles.input}
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-subject">Asunto</label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="¿En qué podemos ayudarte?"
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-message">Mensaje</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Escribe tu mensaje aquí…"
                    className={styles.textarea}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>Enviar mensaje <span className={styles.btnArrow}>→</span></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

