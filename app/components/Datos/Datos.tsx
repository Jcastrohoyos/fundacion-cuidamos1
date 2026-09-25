'use client'

import Image from 'next/image'
import styles from './Datos.module.css'

export default function Datos() {
  return (
    <section className={styles.datos} id="datos">
      <div className={styles.container}>
        <div className={styles.datosWrapper}>
          <Image
            src="/images/datos.jpeg"
            alt="Infografía de indicadores de impacto de la Fundación Cuidamos con Amor, enero a agosto de 2026: 6.714 bonos entregados, 1.676 beneficiarios registrados, 905 familias beneficiadas, 3.620 beneficiarios indirectos, 146 kits de aseo y 223 gorros tejidos"
            width={1366}
            height={768}
            className={styles.datosImage}
          />
        </div>
      </div>
    </section>
  )
}
