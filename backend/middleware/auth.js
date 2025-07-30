const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  
  console.log('=== PROTECT MIDDLEWARE DEBUG ===');
  console.log('Headers:', req.headers.authorization);
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token extracted:', token ? 'Token exists' : 'No token');
      
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded:', decoded);
     
      const user = await User.findById(decoded.id).select('-password');
      console.log('User found:', user ? `${user.name} (${user.role})` : 'No user found');
      
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
      
      req.user = user;
      console.log('User attached to request:', req.user.name, req.user.role);
      next();
    } catch (error) {
      console.error('JWT Error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed', error: error.message });
    }
  } else {
    console.log('No authorization header or invalid format');
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    console.log('=== AUTHORIZE MIDDLEWARE DEBUG ===');
    console.log('User from request:', req.user ? `${req.user.name} (${req.user.role})` : 'No user');
    console.log('Required roles:', roles);
    console.log('User role matches?', req.user && roles.includes(req.user.role));
    
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Forbidden: insufficient permissions',
        userRole: req.user.role,
        requiredRoles: roles
      });
    }
    
    console.log('Authorization successful, proceeding...');
    next();
  };
};

module.exports = { protect, authorize };