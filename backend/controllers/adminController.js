const User = require('../models/User');

const getStudents = async (req, res) => {
  try {
    console.log('Admin getting students, user:', req.user?.email, 'role:', req.user?.role);
    
    const { status, course } = req.query;
    const filter = { role: 'student' };
    
    if (status) filter.status = status;
    if (course) filter.course = course;
    
    const students = await User.find(filter).select('-password');
    
    res.json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    
    const allowedUpdates = ['name', 'email', 'phone', 'course', 'enrollmentYear', 'status', 'role'];
    const updates = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(400).json({ 
      success: false,
      message: 'Update failed',
      error: error.message 
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    await User.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

const createStudent = async (req, res) => {
  const { name, email, password, phone, course, enrollmentYear, status } = req.body;
  
  try {
    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User with this email already exists' 
      });
    }

    const bcrypt = require('bcryptjs');
    const student = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      phone,
      role: 'student',
      course,
      enrollmentYear,
      status: status || 'Active'
    });

    await student.save();
    
    const studentResponse = await User.findById(student._id).select('-password');
    
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: studentResponse
    });
  } catch (error) {
    console.error('Create student error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
};

module.exports = { getStudents, updateUser, deleteUser, createStudent };