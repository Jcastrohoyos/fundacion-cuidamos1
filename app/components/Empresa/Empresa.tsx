'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Building2, TrendingUp, Shield, Award } from 'lucide-react'
import styles from './Empresa.module.css'

const benefits = [
  {
    icon: Building2,
    text: 'Deducción de impuesto de renta según la normativa vigente.'
  },
  {
    icon: TrendingUp,
    text: 'Fortalece tu Responsabilidad Social Empresarial (RSE) respaldando un proyecto con impacto social comprobado.'
  },
  {
    icon: Shield,
    text: 'Vincúlate a una causa transparente, con reportes claros sobre el destino de los recursos y sus resultados.'
  },
  {
    icon: Award,
    text: 'Potencia la reputación de tu marca al asociarla con el bienestar de cuidadores y familias en situación vulnerable.'
  }
]

export default function Empresa() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.empresa-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
    gsap.from('.empresa-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out'
    })
    gsap.from('.empresa-benefit', {
      opacity: 0,
      x: -20,
      duration: 0.5,
      stagger: 0.12,
      delay: 0.4,
      ease: 'power3.out'
    })
    gsap.from('.empresa-image', {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      stagger: 0.2,
      delay: 0.3,
      ease: 'power3.out'
    })
  }, { scope: containerRef })

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.layout}>
        <div className={`${styles.imageWrapper} empresa-image`}>
          <Image
            src="/images/empresa1.webp"
            alt="Voluntarias preparando bonos de alimentación"
            width={500}
            height={600}
            className={styles.sideImage}
            priority
          />
        </div>

        <div className={styles.content}>
          <h2 className={`${styles.title} empresa-title`}>Tu empresa puede hacer la diferencia</h2>
          <h3 className={`${styles.subtitle} empresa-subtitle`}>Beneficios para empresas</h3>

          <div className={styles.grid}>
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className={`${styles.benefit} empresa-benefit`}>
                  <div className={styles.iconWrapper}>
                    <Icon size={24} />
                  </div>
                  <p className={styles.benefitText}>{benefit.text}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className={`${styles.imageWrapper} empresa-image`}>
          <Image
            src="/images/empresa2.webp"
            alt="Atención a familias en el hospital"
            width={500}
            height={600}
            className={styles.sideImage}
            priority
          />
        </div>
      </div>
    </section>
  )
}
