const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { getStudents, updateUser, deleteUser, createStudent } = require('../controllers/adminController');

const router = express.Router();

// Apply authentication middleware first
router.use(protect);

// Apply admin authorization for all routes
router.use(authorize('admin'));

// Admin routes
router.get('/students', getStudents);
router.post('/students', createStudent);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Additional admin-specific routes
router.get('/dashboard', async (req, res) => {
  try {
    const User = require('../models/User');
    
    const totalStudents = await User.countDocuments({ role: 'student' });
    const activeStudents = await User.countDocuments({ role: 'student', status: 'Active' });
    const graduatedStudents = await User.countDocuments({ role: 'student', status: 'Graduated' });
    const droppedStudents = await User.countDocuments({ role: 'student', status: 'Dropped' });
    
    res.json({
      success: true,
      data: {
        totalStudents,
        activeStudents,
        graduatedStudents,
        droppedStudents
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

module.exports = router;