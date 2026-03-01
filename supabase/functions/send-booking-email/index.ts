import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

interface BookingData {
  customerName: string
  customerEmail: string
  customerPhone: string
  service: string
  date: string
  time: string
  price: string
  duration: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const bookingData: BookingData = await req.json()

    // Send email to customer
    const customerEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Lovier Beauty <bookings@lovier-beauty.com>',
        to: [bookingData.customerEmail],
        subject: 'Booking Confirmation - Lovier Beauty',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Booking Confirmation</h2>
            <p>Dear ${bookingData.customerName},</p>
            <p>Thank you for booking with Lovier Beauty! Your appointment has been confirmed.</p>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Appointment Details</h3>
              <p><strong>Service:</strong> ${bookingData.service}</p>
              <p><strong>Date:</strong> ${bookingData.date}</p>
              <p><strong>Time:</strong> ${bookingData.time}</p>
              <p><strong>Duration:</strong> ${bookingData.duration}</p>
              <p><strong>Price:</strong> ${bookingData.price}</p>
            </div>
            
            <p>We look forward to seeing you!</p>
            <p>Best regards,<br>Lovier Beauty Team</p>
          </div>
        `,
      }),
    })

    // Send notification to salon
    const salonEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Lovier Beauty <bookings@lovier-beauty.com>',
        to: ['admin@lovier-beauty.com'],
        subject: 'New Booking Received',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Booking Received</h2>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Customer Details</h3>
              <p><strong>Name:</strong> ${bookingData.customerName}</p>
              <p><strong>Email:</strong> ${bookingData.customerEmail}</p>
              <p><strong>Phone:</strong> ${bookingData.customerPhone}</p>
            </div>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Appointment Details</h3>
              <p><strong>Service:</strong> ${bookingData.service}</p>
              <p><strong>Date:</strong> ${bookingData.date}</p>
              <p><strong>Time:</strong> ${bookingData.time}</p>
              <p><strong>Duration:</strong> ${bookingData.duration}</p>
              <p><strong>Price:</strong> ${bookingData.price}</p>
            </div>
          </div>
        `,
      }),
    })

    if (!customerEmailResponse.ok || !salonEmailResponse.ok) {
      throw new Error('Failed to send emails')
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Emails sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
