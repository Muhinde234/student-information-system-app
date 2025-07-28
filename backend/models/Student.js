const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: String,
    unique: true,
    required: true
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true
  },
  enrollmentYear: {
    type: Number,
    required: [true, 'Enrollment year is required'],
    min: [1950, 'Invalid enrollment year'],
    max: [new Date().getFullYear() + 1, 'Invalid enrollment year']
  },
  status: {
    type: String,
    enum: ['Active', 'Graduated', 'Dropped'],
    default: 'Active'
  },
  gpa: {
    type: Number,
    min: 0,
    max: 4,
    default: null
  }
}, {
  timestamps: true
});

// Generate student ID before saving
studentSchema.pre('save', async function(next) {
  if (!this.studentId) {
    const year = this.enrollmentYear.toString();
    const count = await this.constructor.countDocuments({ enrollmentYear: this.enrollmentYear });
    this.studentId = `STU${year}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Student', studentSchema);