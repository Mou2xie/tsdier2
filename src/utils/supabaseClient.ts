import { createClient } from '@supabase/supabase-js';
import { SupaKey } from '@/models/SupaKey';


// Create a single supabase client for interacting with your database
const supabaseClient = createClient(SupaKey.SUPABASE_URL, SupaKey.SUPABASE_KEY);

export { supabaseClient }
