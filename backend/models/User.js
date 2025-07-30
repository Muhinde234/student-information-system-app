const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['admin', 'student'], default: 'student' },
  course: { type: String, required: function() { return this.role === 'student'; } },
  enrollmentYear: { type: Number, required: function() { return this.role === 'student'; } },
  status: { 
    type: String, 
    enum: ['Active', 'Graduated', 'Dropped'], 
    default: 'Active',
    required: function() { return this.role === 'student'; }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);