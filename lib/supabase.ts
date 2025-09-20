import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xgjmwdnxwdyduyciarxr.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhnam13ZG54d2R5ZHV5Y2lhcnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NTczNjEsImV4cCI6MjA3MDAzMzM2MX0.QsEy81Sc550MaaZ1Kj66GETZziWLCBdSoLovGcJxdtY"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})
