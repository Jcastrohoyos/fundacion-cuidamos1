import DOMPurify from 'isomorphic-dompurify'
import { siteConfig } from './siteConfig'

// Validation functions
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-]{10,}$/
  return phoneRegex.test(phone)
}

function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(String(input), {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  }).trim()
}

export async function sendToWeb3Forms(data: Record<string, unknown>): Promise<boolean> {
  const payload: Record<string, string> = {}
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      // Sanitize all inputs
      payload[key] = sanitizeInput(String(value))
    }
  })

  // Validate email if present
  if (payload.email && !validateEmail(payload.email)) {
    console.error('Invalid email format')
    return false
  }

  // Validate phone if present
  if (payload.phone && !validatePhone(payload.phone)) {
    console.error('Invalid phone format')
    return false
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${siteConfig.email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: new URLSearchParams(payload).toString(),
      signal: controller.signal,
    })

    const json = await res.json()
    return res.status === 200 && json.success
  } catch {
    return false
  } finally {
    clearTimeout(timeout)
  }
}
