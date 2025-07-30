const User = require('../models/User');


const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


const updateProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'phone', 'course', 'enrollmentYear'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) return res.status(400).json({ message: 'Invalid updates' });

  try {
    updates.forEach(update => req.user[update] = req.body[update]);
    await req.user.save();
    
    // Return user without password
    const userResponse = await User.findById(req.user._id).select('-password');
    res.json(userResponse);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(400).json({ message: 'Update failed', error: error.message });
  }
};

module.exports = { getProfile, updateProfile };