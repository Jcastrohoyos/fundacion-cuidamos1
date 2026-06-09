'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import styles from './Datos.module.css'

export default function Datos() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.datos-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
    gsap.from('.datos-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out'
    })
    gsap.from('.datos-stat', {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.4,
      ease: 'back.out(1.7)'
    })

    const percentEls = document.querySelectorAll<HTMLElement>('.dato-percentage')
    percentEls.forEach((el) => {
      const raw = el.dataset.value || '0'
      const value = parseFloat(raw)
      const suffix = el.textContent?.includes('%') ? '%' : ''
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: value,
          duration: 1.6,
          delay: 0.8,
          ease: 'power2.out',
          snap: { innerText: 1 },
          onUpdate() {
            el.textContent = `${Math.trunc((gsap.getProperty(el, 'innerText') as number) || 0)}${suffix}`
          },
        }
      )
    })
  }, { scope: containerRef })

  return (
    <section className={styles.datos} ref={containerRef} id="datos">
      <div className={styles.container}>
        <h2 className={`${styles.title} datos-title`}>Quienes nos inspiran</h2>
        <h3 className={`${styles.subtitle} datos-subtitle`}>Datos</h3>
        
        <div className={styles.grid}>
          <div className={`${styles.stat} datos-stat`}>
            <div className={`${styles.percentage} dato-percentage`} data-value="88">88%</div>
            <div className={styles.label}>Actividades realizadas</div>
          </div>
          
          <div className={`${styles.stat} datos-stat`}>
            <div className={`${styles.percentage} dato-percentage`} data-value="33">33%</div>
            <div className={styles.label}>Actividades realizadas</div>
          </div>
          
          <div className={`${styles.stat} datos-stat`}>
            <div className={`${styles.percentage} dato-percentage`} data-value="56">56%</div>
            <div className={styles.label}>Población más vulnerable Sisben</div>
          </div>
          
          <div className={`${styles.stat} datos-stat`}>
            <div className={`${styles.percentage} dato-percentage`} data-value="36">36%</div>
            <div className={styles.label}>Más de 1 mes hospitalizados</div>
          </div>
          
          <div className={`${styles.stat} datos-stat`}>
            <div className={`${styles.percentage} dato-percentage`} data-value="4">4%</div>
            <div className={styles.label}>Indígenas</div>
          </div>
          
          <div className={`${styles.stat} datos-stat`}>
            <div className={`${styles.percentage} dato-percentage`} data-value="12">12%</div>
            <div className={styles.label}>Venezolanos</div>
          </div>
          
          <div className={`${styles.stat} datos-stat`}>
            <div className={`${styles.percentage} dato-percentage`} data-value="10">10%</div>
            <div className={styles.label}>Afrocolombianos</div>
          </div>
          
          <div className={`${styles.stat} datos-stat`}>
            <div className={`${styles.percentage} dato-percentage`} data-value="11">11%</div>
            <div className={styles.label}>Campesinos</div>
          </div>
        </div>
      </div>
    </section>
  )
}
