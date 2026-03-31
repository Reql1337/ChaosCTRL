import { createClient } from '@supabase/supabase-js';

// These should be set in your .env.local file or GitHub Secrets.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Prevent crashes if variables are missing
const isConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'undefined' && supabaseAnonKey !== 'undefined';

if (!isConfigured) {
    console.warn('Supabase credentials missing. App may fail to mount correctly.');
}

// Export a getter or the client itself, but ensure it doesn't crash initialization
export const supabase = isConfigured 
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const checkSupabaseConfig = () => isConfigured;
