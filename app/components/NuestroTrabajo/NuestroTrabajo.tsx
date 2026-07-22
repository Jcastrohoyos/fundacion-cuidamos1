'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ClipboardList, Palette, Users } from 'lucide-react'
import styles from './NuestroTrabajo.module.css'

const pillars = [
  {
    Icon: ClipboardList,
    title: 'Nutrición y autocuidado para los cuidadores',
    description:
      'Brindamos bonos de alimentación a los cuidadores de niños con cáncer, además de kits de aseo personal y gorros tejidos a mano para los niños, llevando alivio, cuidado y esperanza a las familias que más lo necesitan.',
  },
  {
    Icon: Palette,
    title: 'Actividades recreativas y educativas',
    description:
      'Proporcionamos materiales recreativos como libros para colorear y actividades, brindando momentos de relajación a cuidadores y niños hospitalizados, mejorando su bienestar emocional.',
  },
  {
    Icon: Users,
    title: 'Apoyo psicosocial a las familias',
    description:
      'Organizamos talleres semanales para los padres/cuidadores de niños que reciben quimioterapia ambulatoria. Estas charlas cubren varios temas, proporcionando herramientas para gestionar emociones, fomentar la resiliencia y crear espacios en los que pueden compartir experiencias y emociones.',
  },
]

export default function NuestroTrabajo() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.trabajo-label', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: 'power3.out',
      })
      gsap.from('.trabajo-title', {
        opacity: 0,
        y: 28,
        duration: 0.8,
        delay: 0.1,
        ease: 'power3.out',
      })
      gsap.from('.trabajo-desc', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.25,
        ease: 'power3.out',
      })
      gsap.from('.trabajo-card', {
        opacity: 0,
        y: 32,
        duration: 0.6,
        stagger: 0.14,
        delay: 0.3,
        ease: 'power3.out',
      })
    }, containerRef)
    return () => ctx.revert()
  }, { scope: containerRef })

  return (
    <section className={styles.section} ref={containerRef} id="nuestro-trabajo">
      <div className={styles.container}>

        {/* ── Header: two-column layout like the design ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={`${styles.label} trabajo-label`}>Nuestro trabajo</span>
            <h2 className={`${styles.title} trabajo-title`}>
              Tejiendo redes de apoyo, transformando vidas con amor
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={`${styles.subtitle} trabajo-desc`}>
              Realizamos actividades semanales para las familias que enfrentan
              enfermedades como el cáncer, basadas en tres pilares principales.
            </p>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className={styles.grid}>
          {pillars.map(({ Icon, title, description }, i) => (
            <div key={i} className={`${styles.card} trabajo-card`}>
              <div className={styles.iconWrapper}>
                <Icon size={26} strokeWidth={1.8} />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardText}>{description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
