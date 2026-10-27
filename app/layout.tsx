import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import DonationModal from './components/DonationModal/DonationModal'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import CookieBanner from './components/CookieBanner/CookieBanner'
import Script from 'next/script'
import { siteConfig } from './utils/siteConfig'
import './globals.css'

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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Apoyo a niños y niñas con cáncer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: 'Fundación Cuidamos con Amor: apoyo integral a niños y niñas con cáncer en Colombia. Transformamos vidas con atención en salud, orientación familiar y esperanza.',
  keywords: ['fundación', 'cáncer infantil', 'niños con cáncer', 'donaciones Colombia', 'apoyo a familias', 'oncología pediátrica', 'Bogotá'],
  authors: [{ name: siteConfig.name }],
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
    title: siteConfig.name,
    description: 'Cuidamos con amor y alimentamos la esperanza. Apoyamos a niños y niñas con cáncer en Colombia.',
    url: '/',
    siteName: siteConfig.name,
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/images/logo.webp',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.webp`,
    email: siteConfig.email,
    telephone: siteConfig.phone.e164,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.city,
      addressCountry: siteConfig.location.countryCode,
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
    description: 'Apoyo integral a niños y niñas con cáncer en Colombia. Entregamos bonos de alimentación, kits de aseo y apoyo psicosocial a familias.',
  }

  return (
    <html lang="es" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="font-sans">
        <a href="#main-content" className="skipToContent">Saltar al contenido principal</a>
        <main id="main-content">{children}</main>
        <WhatsAppButton />
        <DonationModal />
        <CookieBanner />
      </body>
    </html>
  )
}