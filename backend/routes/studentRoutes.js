const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.use(protect);


router.get('/:id', async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select('-password');
    
    if (!student || student.role !== 'student') {
      return res.status(404).json({ 
        success: false,
        message: 'Student not found' 
      });
    }

  
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied' 
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, course, enrollmentYear, status } = req.body;
    
    const student = await User.findById(req.params.id);
    
    if (!student || student.role !== 'student') {
      return res.status(404).json({ 
        success: false,
        message: 'Student not found' 
      });
    }

    
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied' 
      });
    }

    // Update fields
    if (name) student.name = name;
    if (email) student.email = email;
    if (phone) student.phone = phone;
    if (course) student.course = course;
    if (enrollmentYear) student.enrollmentYear = enrollmentYear;
    
    // Only admin can change status
    if (status && req.user.role === 'admin') {
      student.status = status;
    }

    await student.save();
    
    const studentResponse = await User.findById(student._id).select('-password');
    
    res.json({
      success: true,
      message: 'Student updated successfully',
      data: studentResponse
    });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
});

module.exports = router;