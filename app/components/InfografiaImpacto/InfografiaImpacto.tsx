'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Heart, Car, Truck, Mountain, TreePalm, Users, Home, MapPin } from 'lucide-react'
import styles from './InfografiaImpacto.module.css'

const dataBlocks = [
  { id: 1, label: 'Sisben', value: '80%', icon: Car, position: 'topLeft', color: '#1a5276' },
  { id: 2, label: 'Mujeres Cabeza + Familia', value: '65%', icon: Users, position: 'topRight', color: '#1a5276' },
  { id: 3, label: 'Venezolanos', value: '14%', icon: Car, position: 'midLeft', color: '#1a5276' },
  { id: 4, label: 'Afrodescendientes', value: '10%', icon: Users, position: 'midRight', color: '#1a5276' },
  { id: 5, label: 'Desplazados', value: '5%', icon: Truck, position: 'left', color: '#1a5276' },
  { id: 6, label: '', value: '243  24%', icon: TreePalm, position: 'right', color: '#1a5276' },
  { id: 7, label: 'Región Andina', value: '454  45%', icon: Mountain, position: 'bottomLeft', color: '#1a5276' },
  { id: 8, label: '', value: '157  15%', icon: MapPin, position: 'bottomRight', color: '#1a5276' },
  { id: 9, label: 'Desplazados', value: '176  1%', icon: Truck, position: 'bottomLeft2', color: '#1a5276' },
  { id: 10, label: '', value: '122  12%', icon: Home, position: 'bottomMid', color: '#1a5276' },
  { id: 11, label: 'Campesinos', value: '147', icon: Users, position: 'bottomRight2', color: '#1a5276' },
]

export default function InfografiaImpacto() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.infografia-heart', {
        scale: 0,
        rotation: -180,
        duration: 1.2,
        ease: 'back.out(1.7)'
      })

      gsap.from('.infografia-block', {
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        stagger: {
          each: 0.08,
          from: 'random'
        },
        delay: 0.4,
        ease: 'back.out(1.4)'
      })

      gsap.from('.infografia-line', {
        scaleX: 0,
        duration: 0.8,
        stagger: 0.05,
        delay: 0.6,
        ease: 'power3.out'
      })

      gsap.from('.infografia-cta', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 1.2,
        ease: 'power3.out'
      })
    }, containerRef)
    return () => ctx.revert()
  }, { scope: containerRef })

  return (
    <section className={styles.section} ref={containerRef} id="datos">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Nuestro Impacto</span>
          <h2 className={styles.title}>Conozca nuestros datos</h2>
        </div>

        <div className={styles.infografiaWrapper}>
          {/* Líneas conectoras */}
          <svg className={styles.conectionLines} viewBox="0 0 1000 600" fill="none">
            <line className="infografia-line" x1="500" y1="300" x2="200" y2="80" stroke="#0C7B93" strokeWidth="2" strokeDasharray="8 4"/>
            <line className="infografia-line" x1="500" y1="300" x2="800" y2="80" stroke="#0C7B93" strokeWidth="2" strokeDasharray="8 4"/>
            <line className="infografia-line" x1="500" y1="300" x2="100" y2="250" stroke="#0C7B93" strokeWidth="2" strokeDasharray="8 4"/>
            <line className="infografia-line" x1="500" y1="300" x2="900" y2="250" stroke="#0C7B93" strokeWidth="2" strokeDasharray="8 4"/>
            <line className="infografia-line" x1="500" y1="300" x2="50" y2="400" stroke="#0C7B93" strokeWidth="2" strokeDasharray="8 4"/>
            <line className="infografia-line" x1="500" y1="300" x2="950" y2="400" stroke="#0C7B93" strokeWidth="2" strokeDasharray="8 4"/>
            <line className="infografia-line" x1="500" y1="300" x2="200" y2="520" stroke="#0C7B93" strokeWidth="2" strokeDasharray="8 4"/>
            <line className="infografia-line" x1="500" y1="300" x2="500" y2="550" stroke="#0C7B93" strokeWidth="2" strokeDasharray="8 4"/>
            <line className="infografia-line" x1="500" y1="300" x2="800" y2="520" stroke="#0C7B93" strokeWidth="2" strokeDasharray="8 4"/>
          </svg>

          {/* Corazón central */}
          <div className={`${styles.heartContainer} infografia-heart`}>
            <div className={styles.heartGlow}></div>
            <svg viewBox="0 0 100 100" className={styles.heartSvg}>
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e74c3c" />
                  <stop offset="100%" stopColor="#c0392b" />
                </linearGradient>
                <filter id="heartShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#e74c3c" floodOpacity="0.4"/>
                </filter>
              </defs>
              <path 
                d="M50 88 C25 65, 0 45, 0 28 C0 10, 15 0, 28 0 C38 0, 46 5, 50 15 C54 5, 62 0, 72 0 C85 0, 100 10, 100 28 C100 45, 75 65, 50 88Z"
                fill="url(#heartGradient)"
                filter="url(#heartShadow)"
              />
            </svg>
            <div className={styles.handsContainer}>
              <svg viewBox="0 0 120 80" className={styles.handsSvg}>
                <defs>
                  <linearGradient id="handGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f5cba7" />
                    <stop offset="100%" stopColor="#e0ac69" />
                  </linearGradient>
                </defs>
                {/* Mano izquierda */}
                <path d="M10 70 Q20 50, 35 45 Q45 42, 50 50 L48 65 Q45 75, 30 78 Z" fill="url(#handGradient)"/>
                {/* Mano derecha */}
                <path d="M110 70 Q100 50, 85 45 Q75 42, 70 50 L72 65 Q75 75, 90 78 Z" fill="url(#handGradient)"/>
              </svg>
            </div>
          </div>

          {/* Bloques de datos */}
          <div className={styles.dataBlocks}>
            {dataBlocks.map((block, index) => {
              const Icon = block.icon
              return (
                <div 
                  key={block.id} 
                  className={`${styles.dataBlock} ${styles[block.position]} infografia-block`}
                >
                  <div className={styles.blockIcon}>
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <div className={styles.blockContent}>
                    <span className={styles.blockValue}>{block.value}</span>
                    {block.label && <span className={styles.blockLabel}>{block.label}</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className={`${styles.ctaContainer} infografia-cta`}>
          <button className={styles.ctaButton}>
            <Heart size={20} />
            Conozca nuestro impacto
          </button>
        </div>
      </div>
    </section>
  )
}
