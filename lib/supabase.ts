
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (supabaseUrl === null || supabaseKey === null) {
    throw new Error('Supabase URL or Key cannot be null');
  }

export const supabase = createClient(supabaseUrl!, supabaseKey!)