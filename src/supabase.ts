import { createClient } from '@supabase/supabase-js'
import { type Database } from '@/types/database.types'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SECRET_KEY ?? ''
)

export default supabase
