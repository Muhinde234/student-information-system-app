const User = require('../models/User');

// @desc    Get all students
const getStudents = async (req, res) => {
  try {
    const { status, course } = req.query;
    const filter = { role: 'student' };
    
    if (status) filter.status = status;
    if (course) filter.course = course;
    
    const students = await User.find(filter).select('-password');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user (admin only)
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    Object.keys(req.body).forEach(key => {
      if (key !== 'password' && key in user) user[key] = req.body[key];
    });

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Update failed' });
  }
};

// @desc    Delete user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getStudents, updateUser, deleteUser };