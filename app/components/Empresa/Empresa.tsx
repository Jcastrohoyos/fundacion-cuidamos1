'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import styles from './Empresa.module.css'

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
    gsap.from('.empresa-content', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.4,
      ease: 'power3.out'
    })
    gsap.from('.empresa-listItem', {
      opacity: 0,
      x: -20,
      duration: 0.5,
      stagger: 0.15,
      delay: 0.6,
      ease: 'power3.out'
    })
  }, { scope: containerRef })

  return (
    <section className={styles.empresa} ref={containerRef}>
      <div className={styles.container}>
        <h2 className={`${styles.title} empresa-title`}>Hoy puedes ser la razón por la que alguien no se rinda.</h2>
        <h3 className={`${styles.subtitle} empresa-subtitle`}>Dona ahora</h3>
        
        <div className={`${styles.content} empresa-content`}>
          <h2 className={styles.sectionTitle}>Tu empresa puede hacer la diferencia</h2>
          <h3 className={styles.sectionSubtitle}>Beneficios para empresas</h3>
          
          <ul className={styles.list}>
            <li className={`${styles.listItem} empresa-listItem`}>
              Deducción de impuesto de renta según la normativa vigente.
            </li>
            <li className={`${styles.listItem} empresa-listItem`}>
              Fortalece tu Responsabilidad Social Empresarial (RSE) respaldando un proyecto con impacto social comprobado.
            </li>
            <li className={`${styles.listItem} empresa-listItem`}>
              Vincúlate a una causa transparente, con reportes claros sobre el destino de los recursos y sus resultados.
            </li>
            <li className={`${styles.listItem} empresa-listItem`}>
              Potencia la reputación de tu marca al asociarla con el bienestar de cuidadores y familias en situación vulnerable.
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
