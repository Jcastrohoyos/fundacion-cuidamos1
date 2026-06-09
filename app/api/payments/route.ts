import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, amount, message } = body

    // Validar datos
    if (!name || !email || !amount) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Validar monto
    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json(
        { error: 'Monto inválido' },
        { status: 400 }
      )
    }

    // Crear transacción en Wompi
    const wompiPublicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY
    const wompiPrivateKey = process.env.WOMPI_PRIVATE_KEY

    if (!wompiPublicKey || !wompiPrivateKey) {
      return NextResponse.json(
        { error: 'Configuración de pasarela de pagos no encontrada' },
        { status: 500 }
      )
    }

    // En un entorno real, aquí harías la llamada a la API de Wompi
    // Por ahora, simulamos la respuesta
    const paymentData = {
      amount_in_cents: Math.round(numericAmount * 100),
      currency: 'COP',
      customer_email: email,
      reference: `DON-${Date.now()}`,
      payment_method: {
        installments: 1
      },
      metadata: {
        name,
        phone,
        message
      }
    }

    // Simular respuesta de Wompi
    const response = {
      success: true,
      data: {
        id: `trans_${Date.now()}`,
        amount: numericAmount,
        currency: 'COP',
        reference: paymentData.reference,
        status: 'PENDING',
        checkout_url: `https://checkout.wompi.co/l/${paymentData.reference}`
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error al procesar pago:', error)
    return NextResponse.json(
      { error: 'Error al procesar el pago' },
      { status: 500 }
    )
  }
}
