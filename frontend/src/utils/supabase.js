import { createClient } from '@supabase/supabase-js';

let supabaseInstance = null;
let initializationFailed = false;

const getMockClient = () => ({
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured') }),
    signOut: async () => ({ error: null }),
  },
  storage: {
    from: () => ({
      upload: async () => ({ data: null, error: new Error('Supabase not configured') }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
  // Enforce the "No Supabase CRUD" architecture rule
  from: () => {
    throw new Error('Supabase direct database queries are disabled. Please use the Express API backend.');
  }
});

const getSupabaseClient = () => {
  if (supabaseInstance) return supabaseInstance;
  if (initializationFailed) return getMockClient();

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Missing Supabase environment variables. Auth and Storage features will be disabled to prevent crashes.');
    initializationFailed = true;
    return getMockClient();
  }

  try {
    supabaseInstance = createClient(supabaseUrl, supabaseKey);
    return supabaseInstance;
  } catch (error) {
    console.error('⚠️ Failed to initialize Supabase client:', error);
    initializationFailed = true;
    return getMockClient();
  }
};

export const supabase = new Proxy({}, {
  get: (target, prop) => {
    const client = getSupabaseClient();
    return client[prop];
  }
});
