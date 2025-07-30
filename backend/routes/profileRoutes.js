


const express = require('express');
const { protect } = require('../middleware/auth');
const { getProfile, updateProfile } = require('../controllers/profileController');

const router = express.Router();

router.use(protect);

router.route('/me')
  .get(getProfile)
  .put(updateProfile);
 


module.exports = router;