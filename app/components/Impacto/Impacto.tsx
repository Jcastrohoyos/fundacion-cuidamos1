'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import styles from './Impacto.module.css'

export default function Impacto() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.impacto-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
    gsap.from('.impacto-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out'
    })
    gsap.from('.impacto-card', {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.15,
      delay: 0.4,
      ease: 'power3.out'
    })
  }, { scope: containerRef })

  return (
    <section className={styles.impacto} ref={containerRef} id="impacto">
      <div className={styles.container}>
        <h2 className={`${styles.title} impacto-title`}>Impacto</h2>
        <p className={`${styles.subtitle} impacto-subtitle`}>Transformando vidas, dejando huellas</p>
        
        <div className={styles.grid}>
          <div className={`${styles.card} impacto-card`}>
            <h3 className={styles.cardTitle}>Kits de higiene</h3>
            <p className={styles.cardText}>
              Hasta la fecha hemos distribuido aprox. 438 kits de higiene entregados semanalmente a familias de bajos ingresos recién llegadas al hospital. Esta actividad busca mejorar el bienestar, la higiene y el autocuidado del cuidador.
            </p>
          </div>
          
          <div className={`${styles.card} impacto-card`}>
            <h3 className={styles.cardTitle}>Vales de comida</h3>
            <p className={styles.cardText}>
              Actualmente estamos distribuyendo 300 vales de comida a 75 cuidadores, cubriendo de 4 a 5 comidas semanales. En total hemos distribuido más de 17.337 vales de comida a más de 5.074 cuidadores.
            </p>
          </div>
          
          <div className={`${styles.card} impacto-card`}>
            <h3 className={styles.cardTitle}>Actividades recreativas</h3>
            <p className={styles.cardText}>
              Hemos entregado materiales recreativos a 5.074 familias con un niño hospitalizado. Hemos organizado 88 actividades con una participación promedio de 12 niños por sesión que reciben tratamiento ambulatorio, totalizando 1056 participantes.
            </p>
          </div>
          
          <div className={`${styles.card} impacto-card`}>
            <h3 className={styles.cardTitle}>Apoyo psicosocial</h3>
            <p className={styles.cardText}>
              Hemos realizado más de 88 talleres con una participación promedio de siete cuidadores de niños que asisten a quimioterapia ambulatoria. Estas sesiones son dirigidas por una psicóloga infantil y familiar.
            </p>
          </div>
          
          <div className={`${styles.card} impacto-card`}>
            <h3 className={styles.cardTitle}>Gorros tejidos</h3>
            <p className={styles.cardText}>
              Distribuimos aproximadamente 10 gorros tejidos a mano cada semana a niños en tratamiento contra el cáncer que pierden su cabello. Hemos distribuido aproximadamente 1016 gorros.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
