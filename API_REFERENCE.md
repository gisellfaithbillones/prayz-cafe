# API Reference for PayMongo Integration

This document describes the API endpoints that your separate API server needs to implement for PayMongo payment integration.

## Base URL
Set `VITE_API_URL` in your `.env` file to point to your API server.
Example: `VITE_API_URL=https://api.yourdomain.com`

## Endpoints

### 1. Create Payment Intent

**Endpoint:** `POST /api/create-payment`

**Request Body:**
```json
{
  "amount": 250.00,
  "orderId": "ORD-1234567890",
  "customerInfo": {
    "name": "John Doe",
    "phone": "+639123456789",
    "email": "john@example.com",
    "address": "123 Main St",
    "notes": "Special instructions"
  },
  "items": [
    {
      "name": "Cafe Latte",
      "size": "M",
      "price": 130,
      "quantity": 2
    }
  ]
}
```

**Response (Success):**
```json
{
  "clientKey": "client_xxxxx",
  "paymentIntentId": "pi_xxxxx",
  "checkoutUrl": "https://pay.paymongo.com/client_xxxxx"
}
```

**Response (Error):**
```json
{
  "error": "Error message here"
}
```

### 2. Webhook Endpoint

**Endpoint:** `POST /api/webhook/paymongo`

**Headers:**
- `paymongo-signature`: Webhook signature for verification

**Request Body:**
PayMongo webhook payload (raw JSON)

**Response:**
```json
{
  "received": true
}
```

## PayMongo Setup

1. Get your PayMongo API keys from https://dashboard.paymongo.com
2. Set environment variables:
   - `PAYMONGO_SECRET_KEY`: Your secret key (starts with `sk_`)
   - `PAYMONGO_PUBLIC_KEY`: Your public key (starts with `pk_`)
   - `PAYMONGO_WEBHOOK_SECRET`: Webhook secret for signature verification

3. Configure webhook in PayMongo dashboard:
   - URL: `https://your-api-domain.com/api/webhook/paymongo`
   - Events: `payment.paid`, `payment.failed`

## Example Implementation (Node.js/Express)

```javascript
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY

// Create Payment Intent
app.post('/api/create-payment', async (req, res) => {
  const { amount, orderId, customerInfo, items } = req.body
  
  const amountInCents = Math.round(amount * 100)
  
  const response = await fetch('https://api.paymongo.com/v1/payment_intents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(PAYMONGO_SECRET_KEY + ':').toString('base64')}`
    },
    body: JSON.stringify({
      data: {
        attributes: {
          amount: amountInCents,
          payment_method_allowed: ['card', 'paymaya', 'gcash'], // Cards allowed but not activated yet
          currency: 'PHP',
          description: `Order ${orderId} - Prayz Cafe`,
          metadata: {
            orderId: orderId,
            customerName: customerInfo?.name || '',
            customerPhone: customerInfo?.phone || ''
          }
        }
      }
    })
  })
  
  const data = await response.json()
  const clientKey = data.data.attributes.client_key
  
  res.json({
    clientKey: clientKey,
    paymentIntentId: data.data.id,
    checkoutUrl: `https://pay.paymongo.com/${clientKey}`
  })
})

// Webhook Handler
app.post('/api/webhook/paymongo', express.raw({ type: 'application/json' }), async (req, res) => {
  const webhookData = JSON.parse(req.body.toString())
  
  // Verify webhook signature here
  // Handle payment events
  
  if (webhookData.data?.attributes?.type === 'payment.paid') {
    // Payment successful - update order status, send email, etc.
    const orderId = webhookData.data.attributes.data.attributes.metadata?.orderId
    console.log('Payment successful for order:', orderId)
  }
  
  res.status(200).json({ received: true })
})

app.listen(3001, () => {
  console.log('API server running on port 3001')
})
```

