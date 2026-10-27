'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowLeft, ArrowRight, X, Heart } from 'lucide-react'
import styles from './Galeria.module.css'

interface GalleryItem {
  src: string
  alt: string
  title: string
  category: string
}

const galleryItems: GalleryItem[] = [
  {
    src: '/images/galeria1.webp',
    alt: 'Niño mostrando un dibujo de color naranja en sala de quimioterapia ambulatoria',
    title: 'Expresión en color',
    category: 'Arte y creatividad',
  },
  {
    src: '/images/galeria2.webp',
    alt: 'Mural colectivo realizado por niños y niñas durante taller de arte',
    title: 'Mural colectivo',
    category: 'Talleres',
  },
  {
    src: '/images/galeria3.webp',
    alt: 'Actividad recreativa con pinturas y manualidades en hospital',
    title: 'Taller de manualidades',
    category: 'Recreación',
  },
  {
    src: '/images/galeria4.webp',
    alt: 'Niña sonriente con gorro tejido a mano en sesión de apoyo',
    title: 'Sonrisa con gorro',
    category: 'Apoyo emocional',
  },
  {
    src: '/images/galeria5.webp',
    alt: 'Voluntarias acompañando a familiares en sala de espera',
    title: 'Acompañamiento familiar',
    category: 'Voluntariado',
  },
  {
    src: '/images/galeria6.webp',
    alt: 'Obras de arte elaboradas por niños en tratamiento oncológico',
    title: 'Obras de esperanza',
    category: 'Arte y creatividad',
  },
]

export default function Galeria() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  useGSAP(() => {
    gsap.from('.galeria-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
    gsap.from('.galeria-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out'
    })
    gsap.from('.galeria-description', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.3,
      ease: 'power3.out'
    })
    gsap.from('.gallery-card', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.4,
      ease: 'power2.out'
    })
  }, { scope: containerRef })

  const openLightbox = (index: number) => {
    setCurrentImage(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => setIsLightboxOpen(false)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryItems.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
  }

  return (
    <section className={styles.galeria} ref={containerRef} id="galeria">
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <h2 className={`${styles.title} galeria-title`}>Galería</h2>
          <h3 className={`${styles.subtitle} galeria-subtitle`}>Pequeños artistas</h3>
          <p className={`${styles.description} galeria-description`}>
            Estas son algunas de las expresivas y creativas obras de arte elaboradas por los niños y niñas en la sala de quimioterapia ambulatoria.
          </p>
        </div>

        <div className={styles.grid}>
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={`${styles.imageCard} gallery-card`}
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openLightbox(index)
                }
              }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  className={styles.image}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardCategory}>{item.category}</span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {isLightboxOpen && (
          <div className={styles.lightboxOverlay} onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="Galería de imágenes">
            <button type="button" className={styles.lightboxClose} onClick={closeLightbox} aria-label="Cerrar galería">
              <X size={24} strokeWidth={2} />
            </button>

            <div className={styles.lightboxContent}>
              <button
                type="button"
                className={styles.lightboxNavPrev}
                onClick={(e) => { e.stopPropagation(); prevImage() }}
                aria-label="Imagen anterior"
              >
                <ArrowLeft size={32} strokeWidth={2} />
              </button>

              <div className={styles.lightboxImageWrapper}>
                <Image
                  src={galleryItems[currentImage].src}
                  alt={galleryItems[currentImage].alt}
                  className={styles.lightboxImage}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  loading="lazy"
                />
                <div className={styles.lightboxHeart}>
                  <Heart size={20} strokeWidth={2} />
                </div>
              </div>

              <button
                type="button"
                className={styles.lightboxNavNext}
                onClick={(e) => { e.stopPropagation(); nextImage() }}
                aria-label="Siguiente imagen"
              >
                <ArrowRight size={32} strokeWidth={2} />
              </button>

              <div className={styles.lightboxInfo}>
                <span className={styles.lightboxCategory}>{galleryItems[currentImage].category}</span>
                <h3 className={styles.lightboxTitle}>{galleryItems[currentImage].title}</h3>
                <p className={styles.lightboxAlt}>{galleryItems[currentImage].alt}</p>
                <div className={styles.lightboxCounter}>
                  {currentImage + 1} de {galleryItems.length}
                </div>
              </div>
            </div>

            <div className={styles.lightboxThumbnails}>
              {galleryItems.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.lightboxThumb} ${index === currentImage ? styles.lightboxThumbActive : ''}`}
                  onClick={(e) => { e.stopPropagation(); setCurrentImage(index) }}
                  aria-label={`Imagen ${index + 1}`}
                >
                  <Image
                    src={galleryItems[index].src}
                    alt={`Miniatura ${index + 1}`}
                    className={styles.lightboxThumbImg}
                    fill
                    sizes="64px"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
