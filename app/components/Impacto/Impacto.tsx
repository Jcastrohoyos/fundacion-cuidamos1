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
                <strong>305 bonos de alimentación</strong> entregados semanalmente a cuidadores de niños
                con cáncer, brindando un alivio económico para que puedan permanecer al lado de sus hijos
                durante el tratamiento.
              </p>
            </div>

            <div className={`${styles.block} impacto-block`}>
              <p className={styles.blockText}>
                <strong>Kits de higiene personal</strong> que promueven el bienestar y el autocuidado de
                las familias que atraviesan esta difícil situación.
              </p>
            </div>

            <div className={`${styles.blockAccent} impacto-block`}>
              <p className={styles.blockText}>
                <strong>Gorros tejidos a mano por voluntarias</strong>, elaborados con amor para brindar
                abrigo, fortalecer la autoestima y acompañar a los niños durante su tratamiento.
              </p>
            </div>

            <div className={`${styles.block} impacto-block`}>
              <p className={styles.blockText}>
                <strong>21 familias</strong> que han recibido bonos por más de un mes, evidenciando un
                acompañamiento sostenido que fortalece la estabilidad de quienes más lo necesitan.
              </p>
            </div>

          </div>

          {/* ── Right column: subsections ── */}
          <div className={styles.rightCol}>

            <div className={`${styles.subsection} impacto-block`}>
              <h3 className={styles.subsectionTitle}>
                Actividades recreativas y educativas
              </h3>
              <p className={styles.subsectionText}>
                Actividades recreativas y educativas que ofrecen espacios de aprendizaje,
                entretenimiento y expresión emocional para los niños mientras reciben atención médica.
              </p>
            </div>

            <div className={`${styles.subsection} impacto-block`}>
              <h3 className={styles.subsectionTitle}>Talleres de apoyo psicosocial</h3>
              <p className={styles.subsectionText}>
                Talleres de apoyo psicosocial, dirigidos por profesionales, donde los cuidadores
                y niños reciben orientación, herramientas y acompañamiento emocional para afrontar
                el proceso de la enfermedad.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
