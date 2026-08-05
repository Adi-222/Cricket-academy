import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const textBody = await req.text()
  const signature = req.headers.get('x-razorpay-signature')
  
  if (!signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET || '')
    .update(textBody)
    .digest('hex')

  if (expectedSignature !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Signature is valid, parse the body
  const event = JSON.parse(textBody)

  // Handle the event
  if (event.event === 'payment.captured') {
    const payment = event.payload.payment.entity
    const orderId = payment.order_id
    const paymentId = payment.id

    // Update our database
    const supabase = await createClient()
    
    // In a real app, find the fee associated with this orderId
    const { error: paymentError } = await supabase
      .from('payments')
      .update({ status: 'completed', razorpay_payment_id: paymentId })
      .eq('razorpay_order_id', orderId)
      
    if (paymentError) console.error("Error updating payment status", paymentError)
  }

  return NextResponse.json({ received: true })
}
