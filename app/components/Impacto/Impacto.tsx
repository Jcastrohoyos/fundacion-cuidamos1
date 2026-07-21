'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Impacto.module.css'

export default function Impacto() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isVisibleRef = useRef(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const animateIn = () => {
      const label = node.querySelectorAll('.impacto-label')
      const title = node.querySelectorAll('.impacto-title')
      const blocks = node.querySelectorAll('.impacto-block')

      if (label.length) gsap.fromTo(label, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      if (title.length) gsap.fromTo(title, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: 'power3.out' })
      if (blocks.length) gsap.fromTo(blocks, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, delay: 0.25, ease: 'power3.out' })
    }

    const reset = () => {
      const label = node.querySelectorAll('.impacto-label')
      const title = node.querySelectorAll('.impacto-title')
      const blocks = node.querySelectorAll('.impacto-block')

      if (label.length) gsap.set(label, { opacity: 0, y: 16 })
      if (title.length) gsap.set(title, { opacity: 0, y: 28 })
      if (blocks.length) gsap.set(blocks, { opacity: 0, y: 24 })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisibleRef.current) {
            isVisibleRef.current = true
            animateIn()
          }
          if (!entry.isIntersecting && isVisibleRef.current) {
            isVisibleRef.current = false
            reset()
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section} ref={containerRef} id="impacto">
      <div className={styles.container}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <span className={`${styles.label} impacto-label`}>Impacto</span>
          <h2 className={`${styles.title} impacto-title`}>
            Transformando vidas, dejando huellas
          </h2>
        </div>

        {/* ── Two-column body ── */}
        <div className={styles.body}>

          {/* ── Left column: narrative blocks ── */}
          <div className={styles.leftCol}>

            <div className={`${styles.block} impacto-block`}>
              <p className={styles.blockText}>
                Hasta junio de 2026 hemos distribuido <strong>4.074 bonos de alimentación</strong> a
                <strong> 1.019 beneficiarios</strong> registrados, beneficiando indirectamente a{' '}
                <strong>1.628 miembros de familia</strong>. En total histórico hemos entregado{' '}
                <strong>31.692 bonos</strong> a <strong>8.614 beneficiarios</strong>.
              </p>
            </div>

            <div className={`${styles.block} impacto-block`}>
              <p className={styles.blockText}>
                Hasta la fecha hemos distribuido aprox. <strong>71 kits de higiene</strong> en lo que
                va de 2026, sumando un total histórico de <strong>538 kits de higiene</strong>{' '}
                entregados semanalmente a familias de bajos ingresos recién llegadas al hospital.
                Esta actividad busca mejorar el bienestar, la higiene y el autocuidado del cuidador.
              </p>
            </div>

            <div className={`${styles.blockAccent} impacto-block`}>
              <p className={styles.blockText}>
                Distribuimos <strong>125 gorros tejidos</strong> a mano por voluntarias en lo que va
                de 2026, sumando un total histórico de <strong>1.115 gorros</strong> entregados a
                niños en tratamiento contra el cáncer que pierden su cabello. Esto aumenta su
                autoestima, los protege del frío y les hace sentir valorados al saber que una red de
                mujeres se preocupa por su bienestar.
              </p>
            </div>

          </div>

          {/* ── Right column: subsections ── */}
          <div className={styles.rightCol}>

            <div className={`${styles.subsection} impacto-block`}>
              <h3 className={styles.subsectionTitle}>
                Desarrollo de actividades recreativas y educativas
              </h3>
              <p className={styles.subsectionText}>
                Hemos entregado materiales recreativos a <strong>1.019 familias</strong> con un niño
                hospitalizado en lo que va de 2026. Hemos organizado <strong>88 actividades</strong> con una participación
                promedio de 12 niños por sesión que reciben tratamiento ambulatorio. Cada niño recibe materiales para una actividad
                recreativa, reforzando habilidades, abordando emociones y distrayéndolos durante el
                tratamiento.
              </p>
            </div>

            <div className={`${styles.subsection} impacto-block`}>
              <h3 className={styles.subsectionTitle}>Apoyo psicosocial a las familias</h3>
              <p className={styles.subsectionText}>
                Hemos realizado más de <strong>88 talleres</strong> con una participación promedio de
                siete cuidadores: padres o tíos, entre otros, de niños que asisten a quimioterapia
                ambulatoria. Estas sesiones, dirigidas por una psicóloga infantil y familiar,
                proporcionan pautas para gestionar el comportamiento de los niños, manejar sus
                emociones y permiten a las familias compartir experiencias con quienes están pasando
                por una experiencia similar.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
