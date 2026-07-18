const supabase = require('../config/supabase');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ message: error.message });
    }

    res.status(200).json({
      message: 'Login successful',
      token: data.session.access_token,
      user: data.user,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      await supabase.auth.admin.signOut(token);
    }
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, logout };
