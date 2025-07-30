const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
  const { name, email, password, phone, role, course, enrollmentYear } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      phone,
      role: role || 'student',
      ...(role === 'student' && { course, enrollmentYear })
    });

    await user.save();
    
    const token = generateToken(user._id);
    const userResponse = await User.findById(user._id).select('-password');
    res.status(201).json({ token, user: userResponse });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);
    const userResponse = await User.findById(user._id).select('-password');
    res.json({ token, user: userResponse });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

module.exports = { register, login };