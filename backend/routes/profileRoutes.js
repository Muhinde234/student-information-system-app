/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile management
 */


const express = require('express');
const { protect } = require('../middleware/auth');
const { getProfile, updateProfile } = require('../controllers/profileController');

const router = express.Router();

router.use(protect);
/**
 * @swagger
 * /profile/me:
 *   get:
 *     summary: Get current user's profile
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.route('/me')
  .get(getProfile)
  .put(updateProfile);
  /**
 * @swagger
 * /profile/me:
 *   put:
 *     summary: Update current user's profile
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Name
 *               phone:
 *                 type: string
 *                 example: 987-654-3210
 *               course:
 *                 type: string
 *                 example: Updated Course
 *               enrollmentYear:
 *                 type: integer
 *                 example: 2024
 *               profilePicture:
 *                 type: string
 *                 example: https://example.com/new-profile.jpg
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid updates
 *       401:
 *         description: Unauthorized
 */

module.exports = router;