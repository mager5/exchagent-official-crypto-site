import { createClient } from '@supabase/supabase-js'

// Get Supabase configuration from Lovable's native integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

if (!supabaseUrl || supabaseUrl === 'https://placeholder-url.supabase.co') {
  console.error('Supabase URL not found. Make sure Supabase integration is properly connected.')
}

if (!supabaseAnonKey || supabaseAnonKey === 'placeholder-key') {
  console.error('Supabase Anon Key not found. Make sure Supabase integration is properly connected.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)