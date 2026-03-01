# Supabase & Resend Setup Guide

## 1. Supabase Setup

### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project URL and anon key from Settings > API

### Deploy Database Schema
```bash
# Link to your Supabase project
supabase link --project-ref your-project-ref

# Push the database migration
supabase db push
```

### Deploy Edge Functions
```bash
# Deploy the email function
supabase functions deploy send-booking-email --no-verify-jwt
```

## 2. Resend Setup

### Create Resend Account
1. Go to [resend.com](https://resend.com) and create an account
2. Create an API key from the dashboard
3. Add your domain for sending emails (optional for testing)

## 3. Environment Variables

Create `.env.local` file with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Resend Configuration (for edge function)
RESEND_API_KEY=your_resend_api_key

# Supabase Service Role (for edge functions)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## 4. Vercel Deployment

Add environment variables to Vercel:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add RESEND_API_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

## 5. Test the Integration

The booking system will:
- Store bookings in Supabase database
- Send confirmation emails via Resend
- Send notifications to salon admin
