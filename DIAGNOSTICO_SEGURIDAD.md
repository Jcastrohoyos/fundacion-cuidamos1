# Diagnóstico de Seguridad - Fundación Cuidamos con Amor

**Fecha:** 25 de agosto de 2026  
**Sitio:** https://www.cuidamosconamor.org  
**Framework:** Next.js 16.0.0 (Static Export)

---

## Resumen Ejecutivo

| Categoría | Estado | Riesgo |
|-----------|--------|--------|
| Headers de Seguridad | ❌ No configurados | **Alto** |
| Content Security Policy | ❌ No configurado | **Alto** |
| Validación de Formularios | ⚠️ Parcial | **Medio** |
| Sanitización de Datos | ⚠️ Limitada | **Medio** |
| Dependencias | ✅ Actualizadas | **Bajo** |
| Variables de Entorno | ✅ Correctas | **Bajo** |
| HTTPS | ✅ Configurado | **Bajo** |

**Riesgo General:** **MEDIO-ALTO**

---

## 1. Headers de Seguridad

### Estado Actual
❌ **No configurados** en `next.config.js`

### Headers Faltantes

| Header | Propósito | Riesgo |
|--------|-----------|--------|
| `X-Frame-Options: DENY` | Previene clickjacking | Medio |
| `X-Content-Type-Options: nosniff` | Previene MIME sniffing | Medio |
| `X-XSS-Protection: 1; mode=block` | Protección XSS | Medio |
| `Referrer-Policy: strict-origin-when-cross-origin` | Control de información de referencia | Bajo |
| `Permissions-Policy` | Control de APIs del navegador | Bajo |

### Recomendación
Agregar headers en `next.config.js`:

```javascript
const nextConfig = {
  output: 'export',
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/colombia',
        destination: '/',
        permanent: true,
      },
    ]
  },
}
```

**Prioridad:** **ALTA**

---

## 2. Content Security Policy (CSP)

### Estado Actual
❌ **No configurado**

### Riesgos
- Sin CSP, el sitio es vulnerable a ataques XSS
- Scripts externos pueden ejecutarse sin restricciones
- Google Analytics se carga sin restricciones

### Recomendación
Implementar CSP en `next.config.js`:

```javascript
headers: [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://formsubmit.co",
      "frame-src 'self'",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://formsubmit.co",
      "frame-ancestors 'none'",
      "block-all-mixed-content",
      "upgrade-insecure-requests",
    ].join('; '),
  },
]
```

**Prioridad:** **ALTA**

---

## 3. Validación de Formularios

### Estado Actual
⚠️ **Validación parcial**

### Análisis

**Formulario de Contacto (`Contacto.tsx`):**
- ✅ Usa `required` en campos obligatorios
- ✅ Usa `type="email"` para validación de correo
- ❌ Usa `noValidate` (desactiva validación nativa del navegador)
- ❌ No hay validación personalizada en JavaScript
- ❌ No hay validación del lado del servidor

**Formulario PQRS (`PqrsModal.tsx`):**
- ✅ Usa `required` en campos obligatorios
- ✅ Usa `type="email"` para validación de correo
- ❌ Usa `noValidate` (desactiva validación nativa)
- ❌ No hay validación de longitud de campos
- ❌ No hay validación de formato de teléfono

### Riesgos
- Datos malformados pueden enviarse al servidor
- Posible inyección de contenido malicioso
- Experiencia de usuario deficiente si hay errores

### Recomendación
Agregar validación personalizada:

```typescript
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-]{10,}$/
  return phoneRegex.test(phone)
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/<[^>]*>/g, '')
}
```

**Prioridad:** **MEDIA**

---

## 4. Sanitización de Datos

### Estado Actual
⚠️ **Sanitización limitada**

### Análisis
- Los datos de los formularios se envían directamente a FormSubmit.co
- No hay sanitización antes del envío
- `dangerouslySetInnerHTML` se usa en `layout.tsx` para JSON-LD (aceptable)

### Riesgos
- Posible inyección de scripts maliciosos
- Datos no sanitizados en correos electrónicos
- Vulnerabilidad a XSS si los datos se muestran sin sanitización

### Recomendación
Agregar sanitización en `web3forms.ts`:

```typescript
import DOMPurify from 'isomorphic-dompurify'

export async function sendToWeb3Forms(data: Record<string, unknown>): Promise<boolean> {
  try {
    const payload: Record<string, string> = {}
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        const sanitized = DOMPurify.sanitize(String(value), { 
          ALLOWED_TAGS: [],
          ALLOWED_ATTR: [] 
        })
        payload[key] = sanitized
      }
    })
    // ... resto del código
  }
}
```

Instalar dependencia:
```bash
npm install isomorphic-dompurify
```

**Prioridad:** **MEDIA**

---

## 5. Dependencias

### Estado Actual
✅ **Dependencias actualizadas**

### Análisis de package.json

| Dependencia | Versión | Estado |
|-------------|---------|--------|
| next | 16.0.0 | ✅ Reciente |
| react | 19.0.0 | ✅ Reciente |
| react-dom | 19.0.0 | ✅ Reciente |
| @gsap/react | 2.1.0 | ✅ Reciente |
| gsap | 3.12.0 | ✅ Reciente |
| lucide-react | 1.25.0 | ✅ Reciente |
| recharts | 3.10.1 | ✅ Reciente |

### Recomendación
Ejecutar auditoría de dependencias regularmente:

```bash
npm audit
npm audit fix
```

**Prioridad:** **BAJA**

---

## 6. Variables de Entorno

### Estado Actual
✅ **Correctamente configuradas**

### Análisis
- Se usa `process.env.GA_MEASUREMENT_ID` en `app/layout.tsx` (Server Component, se lee en build; **sin** prefijo `NEXT_PUBLIC_`)
- No hay secretos expuestos en el código

### Recomendación
Documentar en `.env.example`:

```bash
# Google Analytics
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

> **Corrección posterior:** este informe afirmó que no había archivos `.env` en el
> repositorio, pero `.env.local` estaba versionado desde el commit inicial y
> contenía `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. Ya fue removido del índice con
> `git rm --cached .env.local` (la clave debe rotarse: sigue en el historial).

**Prioridad:** **BAJA**

---

## 7. HTTPS y Configuración SSL

### Estado Actual
✅ **HTTPS configurado**

### Análisis
- El sitio usa HTTPS en `metadataBase`
- No hay configuración de HSTS visible

### Recomendación
Agregar HSTS header:

```javascript
{
  key: 'Strict-Transport-Security',
  value: 'max-age=31536000; includeSubDomains',
}
```

**Prioridad:** **MEDIA**

---

## 8. Accesibilidad y Seguridad

### Estado Actual
✅ **Buenas prácticas implementadas**

### Análisis
- ✅ Skip link para accesibilidad
- ✅ ARIA labels en botones y enlaces
- ✅ Focus trapping en modales
- ✅ Manejo de teclado (Escape para cerrar modales)

**Prioridad:** **BAJA** (ya implementado)

---

## 9. Protección contra ataques comunes

### XSS (Cross-Site Scripting)
- **Estado:** ⚠️ Vulnerable sin CSP
- **Recomendación:** Implementar CSP y sanitización

### CSRF (Cross-Site Request Forgery)
- **Estado:** ⚠️ No hay tokens CSRF
- **Recomendación:** Implementar tokens en formularios si se agrega backend

### Clickjacking
- **Estado:** ⚠️ Vulnerable sin X-Frame-Options
- **Recomendación:** Agregar header X-Frame-Options: DENY

### SQL Injection
- **Estado:** ✅ No aplicable (no hay base de datos)

---

## 10. Configuración de Third-Party Scripts

### Google Analytics
- **Estado:** ✅ Cargado condicionalmente
- **Riesgo:** Bajo
- **Recomendación:** Considerar usar consentimiento de cookies

### FormSubmit.co
- **Estado:** ⚠️ Servicio de terceros
- **Riesgo:** Medio (dependencia externa)
- **Recomendación:** Considerar migrar a API propia con Resend

---

## Plan de Acción Priorizado

### Inmediato (Alta Prioridad)
1. ✅ Agregar headers de seguridad en `next.config.js`
2. ✅ Implementar Content Security Policy
3. ✅ Agregar HSTS header

### Corto Plazo (Media Prioridad)
4. ✅ Mejorar validación de formularios
5. ✅ Implementar sanitización de datos
6. ✅ Agregar X-Frame-Options header

### Mediano Plazo (Baja Prioridad)
7. ✅ Ejecutar auditoría de dependencias
8. ✅ Documentar variables de entorno
9. ✅ Considerar migrar de FormSubmit.co a API propia

---

## Herramientas Recomendadas

### Para Monitoreo Continuo
- **Snyk:** Análisis de vulnerabilidades en dependencias
- **Lighthouse:** Auditoría de seguridad y rendimiento
- **OWASP ZAP:** Escaneo de seguridad web
- **Security Headers:** Verificación de headers

### Para Desarrollo
- **ESLint:** Linting de código
- **Prettier:** Formateo de código
- **Husky:** Git hooks para pre-commit

---

## Conclusión

El sitio web de Fundación Cuidamos con Amor tiene una base sólida en términos de seguridad, pero requiere mejoras importantes en:

1. **Headers de seguridad** (prioridad alta)
2. **Content Security Policy** (prioridad alta)
3. **Validación y sanitización de formularios** (prioridad media)

La implementación de estas mejoras reducirá significativamente el riesgo de ataques y mejorará la postura de seguridad general del sitio.

**Riesgo actual:** MEDIO-ALTO  
**Riesgo después de implementar mejoras:** BAJO

---

*Diagnóstico generado automáticamente el 25 de agosto de 2026*
