# Configuración Completa de Wompi para Pagos

Esta guía te ayudará a configurar Wompi como pasarela de pagos para la Fundación Cuidamos con Amor.

## Índice

1. [Requisitos Previos](#requisitos-previos)
2. [Registro en Wompi](#registro-en-wompi)
3. [Configuración de la Aplicación](#configuración-de-la-aplicación)
4. [Variables de Entorno](#variables-de-entorno)
5. [Webhooks](#webhooks)
6. [Pruebas](#pruebas)
7. [Producción](#producción)
8. [Solución de Problemas](#solución-de-problemas)

## Requisitos Previos

- Cuenta en Wompi (https://dashboard.wompi.co/)
- NIT de la fundación
- Información bancaria para recibir pagos
- Proyecto Next.js configurado

## Registro en Wompi

### 1. Crear Cuenta

1. Ve a https://dashboard.wompi.co/
2. Haz clic en "Registrarse"
3. Completa el formulario con:
   - Nombre de la organización
   - NIT
   - Correo electrónico
   - Teléfono
   - Dirección

### 2. Verificar Cuenta

1. Wompi enviará un correo de verificación
2. Haz clic en el enlace de verificación
3. Sube los documentos requeridos:
   - Cámara de comercio
   - RUT
   - Certificado bancario

### 3. Configurar Información Bancaria

1. En el dashboard, ve a "Configuración" > "Cuentas bancarias"
2. Agrega tu cuenta bancaria:
   - Banco
   - Tipo de cuenta (ahorros/corriente)
   - Número de cuenta
   - Tipo de persona (natural/jurídica)

## Configuración de la Aplicación

### 1. Crear Nueva Aplicación

1. En el dashboard, ve a "Desarrolladores" > "Aplicaciones"
2. Haz clic en "Crear nueva aplicación"
3. Completa la información:
   - **Nombre**: Fundación Cuidamos con Amor
   - **Descripción**: Plataforma de donaciones para la fundación
   - **URL de redirección**: `https://tu-dominio.com/confirmacion`
   - **URL de webhook**: `https://tu-dominio.com/api/webhooks/wompi`

### 2. Obtener Claves API

1. Una vez creada la aplicación, verás tus claves:
   - **Public Key**: `pub_prod_xxxxxxxxxxxxxxxxxxxxxxxx`
   - **Private Key**: `prv_prod_xxxxxxxxxxxxxxxxxxxxxxxx`

2. Para pruebas, usa las claves de sandbox:
   - **Public Key**: `pub_test_xxxxxxxxxxxxxxxxxxxxxxxx`
   - **Private Key**: `prv_test_xxxxxxxxxxxxxxxxxxxxxxxx`

## Variables de Entorno

### Archivo `.env.local`

```env
# Pasarela de pagos - Wompi
# Claves de prueba (sandbox)
NEXT_PUBLIC_WOMPI_PUBLIC_KEY=pub_test_xxxxxxxxxxxxxxxxxxxxxxxx
WOMPI_PRIVATE_KEY=prv_test_xxxxxxxxxxxxxxxxxxxxxxxx

# Para producción, cambia a las claves de producción:
# NEXT_PUBLIC_WOMPI_PUBLIC_KEY=pub_prod_xxxxxxxxxxxxxxxxxxxxxxxx
# WOMPI_PRIVATE_KEY=prv_prod_xxxxxxxxxxxxxxxxxxxxxxxx

# Configuración de la aplicación
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Para producción:
# NEXT_PUBLIC_APP_URL=https://tu-dominio.com
```

### Archivo `.env.example`

```env
# Pasarela de pagos - Wompi
NEXT_PUBLIC_WOMPI_PUBLIC_KEY=tu_clave_publica
WOMPI_PRIVATE_KEY=tu_clave_privada

# Configuración de la aplicación
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Webhooks

Los webhooks son esenciales para recibir notificaciones de pagos.

### 1. Configurar Webhook en Wompi

1. Ve a "Desarrolladores" > "Webhooks"
2. Agrega un nuevo webhook:
   - **URL**: `https://tu-dominio.com/api/webhooks/wompi`
   - **Eventos**: Selecciona todos los eventos de transacción
   - **Firma**: Habilita la firma de seguridad

### 2. Crear Endpoint de Webhook

Crea el archivo `app/api/webhooks/wompi/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const signature = request.headers.get('x-signature')
    
    // Verificar firma del webhook
    const wompiPrivateKey = process.env.WOMPI_PRIVATE_KEY
    const computedSignature = crypto
      .createHmac('sha256', wompiPrivateKey!)
      .update(JSON.stringify(body))
      .digest('hex')
    
    if (signature !== computedSignature) {
      return NextResponse.json(
        { error: 'Firma inválida' },
        { status: 401 }
      )
    }
    
    // Procesar el evento
    const { event, data } = body
    
    if (event === 'transaction.updated') {
      const transaction = data.transaction
      
      // Aquí puedes:
      // 1. Actualizar el estado en tu base de datos
      // 2. Enviar correo de confirmación
      // 3. Registrar la donación
      
      console.log('Transacción actualizada:', {
        id: transaction.id,
        status: transaction.status,
        amount: transaction.amount_in_cents / 100,
        reference: transaction.reference
      })
      
      if (transaction.status === 'APPROVED') {
        // Pago aprobado - procesar donación
        console.log('✅ Pago aprobado')
      } else if (transaction.status === 'DECLINED') {
        // Pago rechazado
        console.log('❌ Pago rechazado')
      }
    }
    
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error en webhook:', error)
    return NextResponse.json(
      { error: 'Error al procesar webhook' },
      { status: 500 }
    )
  }
}
```

## Pruebas

### 1. Modo Sandbox

Wompi proporciona un modo sandbox para pruebas sin cobros reales.

**Tarjetas de prueba:**

| Tipo | Número | CVV | Expiración |
|------|--------|-----|------------|
| Aprobada | 4242424242424242 | 123 | Cualquier fecha futura |
| Rechazada | 4000000000000002 | 123 | Cualquier fecha futura |
| Error | 4000000000009995 | 123 | Cualquier fecha futura |

### 2. Probar el Flujo Completo

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Navega al formulario de donaciones
3. Completa el formulario con datos de prueba
4. Usa una tarjeta de prueba
5. Verifica que el webhook reciba la notificación

### 3. Verificar en Dashboard

1. Ve al dashboard de Wompi
2. Revisa "Transacciones"
3. Verifica que la transacción aparezca con el estado correcto

## Producción

### 1. Cambiar a Claves de Producción

Actualiza `.env.local`:

```env
NEXT_PUBLIC_WOMPI_PUBLIC_KEY=pub_prod_xxxxxxxxxxxxxxxxxxxxxxxx
WOMPI_PRIVATE_KEY=prv_prod_xxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_APP_URL=https://tu-dominio.com
```

### 2. Configurar Dominio

1. En Wompi, actualiza las URLs de redirección y webhook
2. Asegúrate de usar HTTPS (requerido por Wompi)

### 3. Verificar Webhooks en Producción

1. Usa herramientas como ngrok para probar webhooks localmente
2. Verifica que las firmas funcionen correctamente
3. Monitorea los logs de errores

### 4. Monitoreo

Configura alertas para:
- Transacciones fallidas
- Webhooks no entregados
- Errores en el servidor

## Solución de Problemas

### Error: "Configuración de pasarela de pagos no encontrada"

**Causa**: Las variables de entorno no están configuradas.

**Solución**:
1. Verifica que `.env.local` exista
2. Reinicia el servidor de desarrollo
3. Verifica que las variables estén cargadas correctamente

### Error: "Firma inválida" en Webhook

**Causa**: La firma del webhook no coincide.

**Solución**:
1. Verifica que la private key sea correcta
2. Asegúrate de que el cuerpo del webhook se procese como JSON
3. Verifica que no haya espacios adicionales en la firma

### Error: "URL de redirección no válida"

**Causa**: La URL de redirección no está configurada en Wompi.

**Solución**:
1. Ve a la configuración de la aplicación en Wompi
2. Agrega tu URL de redirección
3. Asegúrate de usar HTTPS

### Transacción en estado "PENDING" por mucho tiempo

**Causa**: El usuario no completó el pago o hubo un error.

**Solución**:
1. Configura un sistema de recordatorios
2. Monitorea las transacciones pendientes
3. Implementa un sistema de reintentos

## Recursos Adicionales

- [Documentación oficial de Wompi](https://docs.wompi.co/)
- [API Reference](https://docs.wompi.co/v1.0/reference)
- [Webhooks Guide](https://docs.wompi.co/v1.0/webhooks)
- [Sandbox Testing](https://docs.wompi.co/v1.0/sandbox)

## Soporte

Si tienes problemas:
1. Revisa los logs del servidor
2. Verifica la configuración en el dashboard de Wompi
3. Consulta la documentación oficial
4. Contacta al soporte de Wompi

---

**Nota**: Esta guía está basada en la documentación de Wompi al momento de su creación. Verifica siempre la documentación oficial para actualizaciones.
