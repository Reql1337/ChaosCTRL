import { createClient } from '@supabase/supabase-js';

// These should be set in your .env.local file.
// For now, I'm using placeholder names that Vite expects.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Persistence will be disabled.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
