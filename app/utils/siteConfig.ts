export const siteConfig = {
  name: 'Fundación Cuidamos con Amor',
  url: 'https://www.cuidamosconamor.org',
  nit: '901868580-4',
  email: 'contacto@cuidamosconamor.org',
  phone: {
    e164: '+573135183817',
    display: '313 518 3817',
    whatsapp: '573135183817',
  },
  location: {
    city: 'Bogotá',
    country: 'Colombia',
    countryCode: 'CO',
    display: 'Bogotá, Colombia',
  },
  social: {
    instagram: 'https://www.instagram.com/cuidamosconamor_fundacion/',
    instagramHandle: '@cuidamosconamor_fundacion',
    facebook: 'https://www.facebook.com/profile.php?id=61590375045310',
  },
} as const

export const mailtoHref = `mailto:${siteConfig.email}`

export const telHref = `tel:${siteConfig.phone.e164}`

export const whatsappHref = `https://wa.me/${siteConfig.phone.whatsapp}`
