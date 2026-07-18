const { createClient } = require('@supabase/supabase-js');

let supabaseInstance = null;

const getSupabaseClient = () => {
  if (supabaseInstance) return supabaseInstance;

  // Attempt to load from standard Vite/Next variables used in this project if standard ones are missing
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and Key must be provided in environment variables');
  }

  supabaseInstance = createClient(supabaseUrl, supabaseKey);
  return supabaseInstance;
};

const login = async (email, password) => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const err = new Error(error.message);
    err.status = 401;
    throw err;
  }

  return data;
};

const logout = async () => {
  // In a stateless JWT architecture, the server doesn't hold the session.
  // The client must discard the token. We provide this endpoint to support
  // future SSR HTTP-only cookie clearing if the architecture evolves.
  return { message: 'Logged out successfully. Client must discard JWT.' };
};

module.exports = {
  login,
  logout
};
