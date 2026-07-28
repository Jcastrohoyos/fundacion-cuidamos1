# Opciones para recibir datos de formularios en el correo corporativo

## Hallazgo actual

Los formularios del sitio son **100% frontend** y **no envían datos a ningún correo**:

- `DonationForm.tsx`: captura datos pero solo abre Wompi en nueva pestaña.
- `DonationModal.tsx`: captura datos pero solo abre PayPal o Google Form.
- `Contacto.tsx`: simula el envío con `setTimeout` y nunca transmite nada.

No existe API routes, ni SMTP, ni SendGrid, ni Nodemailer, ni Resend, ni ninguna integración de correo.

---

## Opción A — Form backend service sin servidor propio

### Herramientas compatibles
- **Formspree**: https://formspree.io
- **Netlify Forms**: si se despliega en Netlify.
- **Web3Forms**: https://web3forms.com
- **FormSubmit**: https://formsubmit.co

### Cambios necesarios
1. Crear una cuenta en el servicio elegido y obtener la URL de endpoint.
2. Cambiar el formulario a envío real por POST:
   - Agregar `action="https://formspree.io/f/TU_FORM_ID"` y `method="POST"`.
   - Mover los campos a `name="..."` compatibles.
3. Configurar el correo destino en el panel del servicio.

### Ventajas
- No requiere servidor ni despliegue de código backend.
- Muy rápido de implementar.

### Desventajas
- Dependes de un tercero.
- Algunos servicios gratuitos tienen límites o incluyen branding.
- El reenvío a correo corporativo depende de la configuración del servicio.

---

## Opción B — API route propia con Resend o Nodemailer

### Resumen
1. Instalar una librería de correo, por ejemplo `resend` o `nodemailer`.
2. Crear un API route en `/app/api/contact/route.ts` que reciba POST con los datos.
3. Enviar el correo desde el servidor a `contacto@cuidamosconamor.org`.
4. Cambiar el `handleSubmit` de cada formulario para llamar a `/api/contact` con `fetch`.
5. Configurar la API key en `.env.local`.

### Ventajas
- Control total sobre el envío, plantillas y destinatarios.
- Sin branding externo.
- Escalable.

### Desventajas
- Requiere código backend.
- Necesita gestionar secretos y despliegue.

---

## Opción C — EmailJS (frontend sin backend)

### Resumen
1. Usar `@emailjs/browser`.
2. Configurar un template en el panel de EmailJS.
3. Llamar a `emailjs.send(...)` desde el `handleSubmit` del formulario.
4. El correo se envía directamente desde el navegador.

### Ventajas
- No requiere servidor propio ni API routes.
- Implementación rápida.

### Desventajas
- Las credenciales quedan expuestas en el cliente.
- Menor seguridad y control.
- Puede requerir ajuste de CSP o configuraciones del navegador.

---

## Opción D — Webhook del procesador de pagos

### Resumen
- Configurar un webhook en Wompi o PayPal para eventos de pago exitoso.
- El webhook puede disparar un correo automático al completarse la transacción.

### Ventajas
- No requiere cambios en el código del formulario.
- Notificación automática al confirmar el pago.

### Desventajas
- Solo notifica cuando el pago se completa, no cuando el usuario solo diligencia el formulario.
- Depende de la configuración del procesador.

---

## Recomendación

- Si necesitas algo rápido y sin backend: **Opción A** con Formspree o Web3Forms.
- Si quieres control total y ya tienes despliegue configurado: **Opción B** con Resend.
- Si solo necesitas confirmación de pago, no de formulario: **Opción D** con webhook de Wompi/PayPal.
