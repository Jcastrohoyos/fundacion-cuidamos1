'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Heart, MapPin, FileText, BookOpen } from 'lucide-react'
import styles from './Footer.module.css'

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-mainContent', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      })
      gsap.from('.footer-section', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.3,
        ease: 'power3.out'
      })
      gsap.from('.footer-sectionTitle', {
        opacity: 0,
        y: 10,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.4,
        ease: 'power2.out'
      })
      gsap.from('.footer-bottom', {
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        ease: 'power3.out'
      })
    }, containerRef)
    return () => ctx.revert()
  }, { scope: containerRef })

  return (
    <footer className={styles.footer} ref={containerRef} aria-label="Pie de página de Fundación Cuidamos con Amor">
      <div className={styles.container}>
        <div className={`${styles.mainContent} footer-mainContent`}>
          <div className={styles.logoContainer}>
            <Image
              src="/images/logo.webp"
              alt="Fundación Cuidamos con Amor"
              width={150}
              height={50}
              className={styles.logoImage}
              priority
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
          <h2 className={styles.title}>CUIDAMOS con amor</h2>
          <p className={styles.subtitle}>APOYAMOS NIÑOS Y NIÑAS CON CÁNCER</p>
          <p className={styles.description}>Cuidamos con amor y alimentamos la esperanza</p>
          <div className={styles.meta}>
            <p className={styles.nit}><Heart size={16} /> NIT 901868580-4</p>
            <p className={styles.location}><MapPin size={16} /> Bogotá, Colombia</p>
          </div>
        </div>
        
        <div className={`${styles.documents} ${styles.section} footer-section`}>
          <h3 className={`${styles.sectionTitle} footer-sectionTitle`}>
            <span className={styles.sectionIcon}><FileText size={20} /></span>
            Documentos legales y financieros
          </h3>
          <ul className={styles.list}>
            <li><a href="#" className={`${styles.link} footer-link`}>Introd. Política contable</a></li>
            <li><a href="#" className={`${styles.link} footer-link`}>Política cambios en políticas</a></li>
            <li><a href="#" className={`${styles.link} footer-link`}>Efectivo y equivalente al efectivo</a></li>
            <li><a href="#" className={`${styles.link} footer-link`}>Política de pasivos fin. Corrientes</a></li>
            <li><a href="#" className={`${styles.link} footer-link`}>Política Prov. Activos y Pasivos contingentes</a></li>
            <li><a href="#" className={`${styles.link} footer-link`}>Política ingreso de actividades ordi.</a></li>
            <li><a href="#" className={`${styles.link} footer-link`}>Acta de constitución y Estatutos</a></li>
            <li><a href="#" className={`${styles.link} footer-link`}>Certificado de Existencia y Repr. Legal</a></li>
          </ul>
        </div>

        <div className={`${styles.policies} ${styles.section} footer-section`}>
          <h3 className={`${styles.sectionTitle} footer-sectionTitle`}>
            <span className={styles.sectionIcon}><BookOpen size={20} /></span>
            Políticas
          </h3>
          <ul className={styles.list}>
            <li><a href="#" className={`${styles.link} footer-link`}>Fundacion EEFF y notas 2025</a></li>
            <li><a href="#" className={`${styles.link} footer-link`}>Informe de Gestión 2025</a></li>
          </ul>
        </div>
      </div>
      
      <div className={`${styles.bottom} footer-bottom`}>
        <p className={styles.copyright}>© {new Date().getFullYear()} Fundación Cuidamos con Amor. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
