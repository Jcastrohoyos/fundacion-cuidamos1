'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { X } from 'lucide-react'
import styles from './TopBanner.module.css'

const STORAGE_KEY = 'topBannerDismissed'

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      setIsVisible(true)
    }
  }, [])

  useEffect(() => {
    if (isVisible && bannerRef.current) {
      gsap.fromTo(bannerRef.current, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
    }
  }, [isVisible])

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    if (bannerRef.current) {
      gsap.to(bannerRef.current, {
        y: -40,
        opacity: 0,
        duration: 0.35,
        ease: 'power3.in',
        onComplete: () => setIsVisible(false),
      })
    }
  }

  if (!isVisible) return null

  return (
    <div ref={bannerRef} className={styles.banner} role="banner">
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Cerrar banner"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
