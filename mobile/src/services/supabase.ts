import 'react-native-url-polyfill/auto';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return client;
}

export type UserProfile = {
  id: string;
  display_name: string | null;
  country_code: string | null;
  created_at: string;
};

export async function upsertAnonymousProfile(input: {
  id: string;
  displayName?: string;
  countryCode?: string;
}): Promise<UserProfile | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('profiles')
    .upsert(
      {
        id: input.id,
        display_name: input.displayName ?? null,
        country_code: input.countryCode ?? 'ZA',
      },
      { onConflict: 'id' },
    )
    .select()
    .single();

  if (error) {
    console.warn('Supabase profile upsert failed', error.message);
    return null;
  }

  return data as UserProfile;
}
