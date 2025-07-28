const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { getStudents, updateUser, deleteUser } = require('../controllers/adminController');

const router = express.Router();

router.use(protect, authorize('admin'));
router.get('/students', getStudents);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;