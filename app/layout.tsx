import type { Metadata, Viewport } from 'next'
import { Poppins, Inter } from 'next/font/google'
import DonationModal from './components/DonationModal/DonationModal'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import './globals.css'

const poppins = Poppins({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://fundacioncuidamosconamor.org'),
  title: {
    default: 'Fundación Cuidamos con Amor | Apoyo a niños y niñas con cáncer',
    template: '%s | Fundación Cuidamos con Amor',
  },
  description: 'Fundación Cuidamos con Amor: apoyo integral a niños y niñas con cáncer en Colombia. Transformamos vidas con atención en salud, orientación familiar y esperanza.',
  keywords: ['fundación', 'cáncer infantil', 'niños con cáncer', 'donaciones Colombia', 'apoyo a familias', 'oncología pediátrica', 'Bogotá'],
  authors: [{ name: 'Fundación Cuidamos con Amor' }],
  category: 'ONG / Fundación sin ánimo de lucro',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/logo.webp',
    shortcut: '/images/logo.webp',
    apple: '/images/logo.webp',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Fundación Cuidamos con Amor',
    description: 'Cuidamos con amor y alimentamos la esperanza. Apoyamos a niños y niñas con cáncer en Colombia.',
    url: '/',
    siteName: 'Fundación Cuidamos con Amor',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/images/logo.webp',
        width: 1200,
        height: 630,
        alt: 'Fundación Cuidamos con Amor',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-sans">
        <a href="#main-content" className="skipToContent">Saltar al contenido principal</a>
        <main id="main-content">{children}</main>
        <WhatsAppButton />
        <DonationModal />
      </body>
    </html>
  )
}