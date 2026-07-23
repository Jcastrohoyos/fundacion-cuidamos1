'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import {
  Heart,
  MapPin,
  FileText,
  BookOpen,
  Mail,
  Phone,
  ChevronRight,
} from 'lucide-react'

function FacebookIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
import styles from './Footer.module.css'

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-brand', {
        opacity: 0,
        x: -24,
        duration: 0.8,
        ease: 'power3.out',
      })
      gsap.from('.footer-section', {
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.12,
        delay: 0.2,
        ease: 'power3.out',
      })
      gsap.from('.footer-bottom', {
        opacity: 0,
        duration: 0.6,
        delay: 0.7,
        ease: 'power3.out',
      })
    }, containerRef)
    return () => ctx.revert()
  }, { scope: containerRef })

  return (
    <footer
      className={styles.footer}
      ref={containerRef}
      aria-label="Pie de página de Fundación Cuidamos con Amor"
    >
      <div className={styles.container}>
        <div className={styles.topSection}>

          {/* ── Columna 1: Marca ── */}
          <div className={`${styles.brandSection} footer-brand`}>
            <div className={styles.logoWrapper}>
              <div className={styles.logoImageBox}>
                <Image
                  src="/images/logo1.webp"
                  alt="Fundación Cuidamos con Amor"
                  width={52}
                  height={52}
                  className={styles.logoImage}
                  priority
                  style={{ width: 52, height: 52 }}
                />
              </div>
              <div className={styles.brandName}>
                <span className={styles.brandNameMain}>CUIDAMOS con amor</span>
                <span className={styles.brandNameSub}>Fundación</span>
              </div>
            </div>

            <p className={styles.brandTagline}>
              Acompañamos a niños y niñas con cáncer y a sus familias con amor,
              dignidad y esperanza en cada paso del camino.
            </p>

            <div className={styles.brandBadges}>
              <span className={styles.badge}>
                <Heart size={13} /> NIT 901868580-4
              </span>
              <span className={styles.badge}>
                <MapPin size={13} /> Bogotá, Colombia
              </span>
            </div>

            <div className={styles.socialRow}>
              <a
                href="https://www.instagram.com/cuidamosconamor_fundacion/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61590375045310"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="mailto:info@cuidamosconamor.org"
                className={styles.socialIcon}
                aria-label="Correo electrónico"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* ── Columna 2: Documentos Legales ── */}
          <div className={`${styles.linkSection} footer-section`}>
            <h3 className={styles.sectionTitle}>
              <FileText size={14} className={styles.titleIcon} />
              Documentos y Certificaciones
            </h3>
            <ul className={styles.linkList}>
              {[
                { title: 'Introd. Política contable', href: '/documentos/00__Introducción_Politicas_Contables_Bajo_NIIF_PARA_PYMES[1].pdf' },
                { title: 'Política cambios en políticas', href: '/documentos/01_Política_Cambios_en_políticas_estimados_y_errores_NIIF_para_PYMES[1].pdf' },
                { title: 'Efectivo y equivalente', href: '/documentos/02-1_EFECTIVO_Y_EQUIVALENTE_AL_EFECTIVO[1].pdf' },
                { title: 'Política de pasivos fin. Corrientes', href: '/documentos/03_Politica_de_pasivos_financieos_corrientes[1].pdf' },
                { title: 'Política Prov. Activos y Pasivos', href: '/documentos/04_Política_Provisiones,_Activos_y_Pasivos_Contingentes[1].pdf' },
                { title: 'Política ingreso de actividades', href: '/documentos/05__Politica_Ingresos_de_Actividades_Ordinarias[1].pdf' },
                { title: 'Acta de constitución y Estatutos', href: '/documentos/Acta y Estatutos  (1).pdf' },
                { title: 'Certificado de Existencia y Repr. Legal', href: '/documentos/Certificado CCB (1).pdf' },
                { title: 'Certificación cumplimiento requisitos RTE', href: '/documentos/Certificacion cumplimiento requisitos RTE.pdf' },
              ].map((doc) => (
                <li key={doc.title}>
                  <a href={doc.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <ChevronRight size={13} />
                    {doc.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Columna 3: Políticas e Informes ── */}
          <div className={`${styles.linkSection} footer-section`}>
            <h3 className={styles.sectionTitle}>
              <BookOpen size={14} className={styles.titleIcon} />
              Informes
            </h3>
            <ul className={styles.linkList}>
              {[
                { title: 'EEFF y notas 2025', href: '/documentos/NOTAS ESTADOS FINANCIEROS 2025.pdf' },
                { title: 'Informe de Gestión 2025', href: '/documentos/Informe de Gestión 2025.pdf' },
              ].map((item) => (
                <li key={item.title}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <ChevronRight size={13} />
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Columna 4: Cargo Directivo ── */}
          <div className={`${styles.linkSection} footer-section`}>
            <h3 className={styles.sectionTitle}>
              <FileText size={14} className={styles.titleIcon} />
              Cargo Directivo
            </h3>
            <ul className={styles.linkList}>
              {[
                { title: 'Certificación de cargos directivos', href: '/documentos/Certificacion de  cargos directivos .pdf' },
              ].map((item) => (
                <li key={item.title}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <ChevronRight size={13} />
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Columna 5: Contacto ── */}
          <div className={`${styles.linkSection} footer-section`}>
            <h3 className={styles.sectionTitle}>
              <Mail size={14} className={styles.titleIcon} />
              Contacto
            </h3>
            <ul className={styles.contactList}>
              <li>
                <a
                  href="mailto:info@cuidamosconamor.org"
                  className={styles.contactItem}
                >
                  <div className={styles.iconCircle}>
                    <Mail size={15} />
                  </div>
                  <span>info@cuidamosconamor.org</span>
                </a>
              </li>
              <li>
                <a href="tel:+573135183817" className={styles.contactItem}>
                  <div className={styles.iconCircle}>
                    <Phone size={15} />
                  </div>
                  <span>313 518 3817</span>
                </a>
              </li>
              <li>
                <div className={styles.contactItem}>
                  <div className={styles.iconCircle}>
                    <MapPin size={15} />
                  </div>
                  <span>Bogotá, Colombia</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className={`${styles.bottomSection} footer-bottom`}>
          <div className={styles.bottomTop}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Fundación Cuidamos con Amor
            </p>
            <div className={styles.bottomLinks}>
              <a href="#" className={styles.bottomLink}>Política de Privacidad</a>
              <span className={styles.bottomSeparator} />
              <a href="#" className={styles.bottomLink}>Términos y Condiciones</a>
            </div>
          </div>
          <div className={styles.bottomBottom}>
            <p className={styles.tagline}>
              Cuidamos con amor y alimentamos la esperanza
            </p>
            <span className={styles.bottomDot} />
            <p className={styles.tagline}>
              NIT 901868580-4 · Bogotá, Colombia
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
