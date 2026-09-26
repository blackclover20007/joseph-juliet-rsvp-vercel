import { createClient } from '@supabase/supabase-js';

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function createSupabaseClient(keyName) {
  return createClient(
    requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
    requireEnv(keyName),
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

// Initialize only at request time so production secrets are not required by `next build`.
export function getSupabasePublic() {
  return createSupabaseClient('NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export function getSupabaseAdmin() {
  return createSupabaseClient('SUPABASE_SERVICE_ROLE_KEY');
}
