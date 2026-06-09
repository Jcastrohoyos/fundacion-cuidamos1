'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import styles from './ComoApoyarnos.module.css'

export default function ComoApoyarnos() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.como-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
    gsap.from('.como-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out'
    })
    gsap.from('.como-card', {
      opacity: 0,
      x: -30,
      duration: 0.6,
      stagger: 0.15,
      delay: 0.4,
      ease: 'power3.out'
    })
    gsap.from('.como-button', {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      delay: 1,
      ease: 'back.out(1.7)'
    })
  }, { scope: containerRef })

  return (
    <section className={styles.comoApoyarnos} ref={containerRef} id="como-apoyarnos">
      <div className={styles.container}>
        <h2 className={`${styles.title} como-title`}>Un donante tiene el poder de cambiar el mundo</h2>
        <p className={`${styles.subtitle} como-subtitle`}>Cómo puedes apoyarnos...</p>
        
        <div className={styles.grid}>
          <div className={`${styles.card} como-card`}>
            <h3 className={styles.cardTitle}>Material recreativo para manualidades</h3>
            <p className={styles.cardText}>
              Una forma de contribuir es a través de la donación de materiales recreativos como papeles, colores, libros para colorear y otros suministros creativos. Estos insumos son esenciales para las actividades manuales, proporcionando a los niños y niñas la oportunidad de expresarse creativamente.
            </p>
          </div>
          
          <div className={`${styles.card} como-card`}>
            <h3 className={styles.cardTitle}>Donación monetaria</h3>
            <p className={styles.cardText}>
              Tu contribución económica es fundamental para el funcionamiento de nuestros programas. Gracias a tu generoso apoyo, podemos adquirir bonos de alimentación para los cuidadores que no pueden costear su almuerzo. Además, tu donación nos permite comprar los implementos necesarios para los kits de aseo personal para los cuidadores.
            </p>
            <p className={styles.cardText}>
              Cada aporte hace una gran diferencia al ofrecer no solo recursos básicos, sino también dignidad y cuidado a aquellos que atraviesan momentos difíciles.
            </p>
          </div>
          
          <div className={`${styles.card} como-card`}>
            <h3 className={styles.cardTitle}>Bonos de apoyo</h3>
            <p className={styles.cardText}>
              Otra forma de colaborar es adquiriendo nuestros bonos de apoyo, que pueden llevar el nombre de un ser querido y ser entregados para conmemorar o celebrar fechas importantes. Estos bonos ofrecen a las familias una manera significativa de honrar a sus seres queridos o celebrar momentos.
            </p>
            <p className={styles.cardText}>
              Para solicitarlo, contáctanos a través de Instagram o nuestro correo.
            </p>
          </div>
        </div>
        
        <div className={styles.cta}>
          <a href="#contacto" className={`${styles.button} como-button`}>Dona aquí</a>
        </div>
      </div>
    </section>
  )
}
