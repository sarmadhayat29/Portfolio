const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    // Supabase JWT stores email in req.user.email
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
