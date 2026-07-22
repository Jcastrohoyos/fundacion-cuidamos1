'use client'

import Image from 'next/image'
import styles from './Datos.module.css'

export default function Datos() {
  return (
    <section className={styles.datos} id="datos">
      <div className={styles.container}>
        <div className={styles.datosWrapper}>
          <Image
            src="/images/datos.png"
            alt="Datos Fundación Cuidamos con Amor"
            width={1200}
            height={800}
            className={styles.datosImage}
            priority
          />
        </div>
      </div>
    </section>
  )
}
