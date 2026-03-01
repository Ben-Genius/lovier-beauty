import { supabase } from './supabase'

export interface BookingData {
  customerName: string
  customerEmail: string
  customerPhone: string
  service: string
  date: string
  time: string
  price: string
  duration: string
}

export async function createBooking(bookingData: BookingData) {
  try {
    // Store booking in Supabase
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          customer_name: bookingData.customerName,
          customer_email: bookingData.customerEmail,
          customer_phone: bookingData.customerPhone,
          service: bookingData.service,
          booking_date: bookingData.date,
          booking_time: bookingData.time,
          price: bookingData.price,
          duration: bookingData.duration,
          status: 'confirmed',
          created_at: new Date().toISOString(),
        }
      ])
      .select()

    if (error) throw error

    // Send email notifications via edge function
    const { data: emailData, error: emailError } = await supabase.functions
      .invoke('send-booking-email', {
        body: bookingData
      })

    if (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't throw error here - booking is still created
    }

    return { success: true, data, emailSent: !emailError }
  } catch (error) {
    console.error('Booking creation failed:', error)
    return { success: false, error: error.message }
  }
}
