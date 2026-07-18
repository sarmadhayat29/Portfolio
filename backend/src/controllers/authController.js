const authService = require('../services/authService');
const catchAsync = require('../utils/catchAsync');

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const sessionData = await authService.login(email, password);
  res.status(200).json({ message: 'Login successful', data: sessionData });
});

const logout = catchAsync(async (req, res) => {
  const result = await authService.logout();
  res.status(200).json(result);
});

module.exports = {
  login,
  logout
};
