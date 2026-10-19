import Image from 'next/image'
import styles from './Datos.module.css'

export default function Datos() {
  return (
    <section className={styles.datos} id="datos">
      <div className={styles.container}>
        <Image
          src="/images/indicadoresdemograficos.jpeg"
          alt="Indicadores demográficos y regionales de beneficiarios y resultados de impacto social, enero a septiembre de 2026"
          width={1366}
          height={768}
          className={styles.datosImage}
        />
      </div>
    </section>
  )
}
