import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing from .env.local")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log(`🔌 Testing connection to: ${supabaseUrl}`)
  
  // Try to fetch something generic, like profiles count, which confirms the DB is alive
  // and the trigger schema exists.
  const { data, error, count } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
  
  if (error) {
    console.error("❌ Connection failed with error:")
    console.error(error)
    process.exit(1)
  }
  
  console.log("✅ Connection successful!")
  console.log(`📊 Found ${count} profiles.`)
  
  // Test if trigger exists by checking the schema via RPC or just relying on the fact that if we can query profiles, the DB is reachable.
  process.exit(0)
}

testConnection()
