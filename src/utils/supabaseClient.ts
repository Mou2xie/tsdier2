import { createClient } from '@supabase/supabase-js';
import { ESupaKey } from '@/models/ESupaKey';


// Create a single supabase client for interacting with your database
const supabaseClient = createClient(ESupaKey.SUPABASE_URL, ESupaKey.SUPABASE_KEY);

export { supabaseClient }
