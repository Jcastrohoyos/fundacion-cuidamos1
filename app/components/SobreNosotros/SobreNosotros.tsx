'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import styles from './SobreNosotros.module.css'

const teamMembers = [
  { name: 'MYRIAM', role: 'PSICÓLOGA', image: '/images/Myriampsicologa.webp' },
  { name: 'GLORIA', role: 'TRABAJADORA SOCIAL', image: '/images/gloria.webp' },
  { name: 'YOLANDA', role: 'ADMIN. DE EMPRESAS', image: '/images/yolanda.webp' },
  { name: 'CLEMENCIA', role: 'INGENIERA DE SISTEMAS', image: '/images/clemencia.webp' },
  { name: 'FABIOLA', role: 'ECONOMISTA', image: '/images/fabiola.webp' },
  { name: 'ANDREA', role: 'ADMIN. DE EMPRESAS', image: '/images/andrea.webp' },
  { name: 'MARIANA', role: 'ARQUITECTA', image: '/images/mariana.webp', gridColumn: 2 },
  { name: 'PATRICIA', role: 'EDUCADORA INFANTIL', image: '/images/Patricia Suárez ,educadora infantil.webp' },
]

const stats = [
  {
    icon: Calendar,
    value: 'Octubre 2022',
    label: 'Nuestra labor empezó en',
  },
]

export default function SobreNosotros() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.sobre-label', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out'
    })
    gsap.from('.sobre-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.1,
      ease: 'power3.out'
    })
    gsap.from('.sobre-description', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out'
    })
    gsap.from('.sobre-text', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.3,
      ease: 'power3.out'
    })
    gsap.from('.sobre-member', {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      stagger: 0.08,
      delay: 0.4,
      ease: 'back.out(1.7)'
    })
    gsap.from('.sobre-stat', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.6,
      ease: 'power3.out'
    })
  }, { scope: containerRef })

  return (
    <section className={styles.section} ref={containerRef} id="sobre-nosotros">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.left}>
            <span className={`${styles.label} sobre-label`}>Sobre Nosotras</span>
            <h2 className={`${styles.title} sobre-title`}>Unidas por la esperanza</h2>
            
            <div className={`${styles.description} sobre-description`}>
              <p>Somos un grupo de mujeres unidas por un mismo propósito: llevar alimento, esperanza y apoyo a las familias de niños con cáncer, para que puedan concentrarse en lo más importante: acompañar a sus hijos durante su tratamiento.</p>
            </div>

            <p className={`${styles.text} sobre-text`}>
              Nuestro propósito es brindar apoyo integral a familias en situación de vulnerabilidad. 
              A través de nuestra Fundación, trabajamos con dedicación para ofrecer soluciones que 
              transformen vidas, proporcionando cuidado, nutrición y apoyo emocional a quienes más lo necesitan.
              Cada donación se transforma en un bono de alimentación que brinda alivio, fortaleza y esperanza
              a quienes más lo necesitan.
            </p>

            <div className={styles.stats}>
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className={`${styles.stat} sobre-stat`}>
                    <div className={styles.statIcon}>
                      <Icon size={24} strokeWidth={1.8} />
                    </div>
                    <div className={styles.statContent}>
                      <span className={styles.statValue}>{stat.value}</span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.teamGrid}>
              {teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  className={`${styles.member} sobre-member`}
                  {...(member.gridColumn ? { 'data-col': member.gridColumn } : {})}
                >
                  <div className={styles.memberAvatar}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={160}
                      height={160}
                      className={styles.memberImage}
                      priority={index < 4}
                    />
                  </div>
                  <h4 className={styles.memberName}>{member.name}</h4>
                  <p className={styles.memberRole}>-{member.role}-</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
