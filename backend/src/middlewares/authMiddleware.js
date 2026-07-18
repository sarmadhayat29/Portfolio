const { createClient } = require('@supabase/supabase-js');

// Initialize supabase client for token verification
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    // Delegate entirely to Supabase Auth - inherently supports both legacy HS256 and modern JWKS (RS256/ES256)
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token verification failed' });
  }
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    // Supabase auth user object stores email in req.user.email
    if (req.user && req.user.email === process.env.ADMIN_EMAIL) {
      next();
    } else {
      res.status(403).json({ message: 'Requires admin privileges' });
    }
  });
};

module.exports = {
  authMiddleware: verifyToken, // Backwards compatibility for todoRoutes
  verifyToken,
  verifyAdmin
};
