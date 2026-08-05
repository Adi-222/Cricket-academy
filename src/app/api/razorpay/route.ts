import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'INR', receiptId } = await req.json()

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 })
    }

    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency,
      receipt: receiptId,
    }

    const order = await razorpay.orders.create(options)
    
    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency })
  } catch (error: any) {
    console.error('Error creating Razorpay order', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
