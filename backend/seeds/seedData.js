// backend/seeds/seedData.js
const mongoose = require('mongoose');
const User = require('../models/User');
const Student = require('../models/Student');
require('dotenv').config();

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Student.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = await User.create({
      fullName: 'System Administrator',
      email: 'admin@example.com',
      password: 'admin123',
      phoneNumber: '+1234567890',
      role: 'admin'
    });

    // Create student users
    const student1 = await User.create({
      fullName: 'John Doe',
      email: 'student1@example.com',
      password: 'student123',
      phoneNumber: '+1234567891',
      role: 'student',
      courseOfStudy: 'Computer Science'
    });

    const student2 = await User.create({
      fullName: 'Jane Smith',
      email: 'student2@example.com',
      password: 'student123',
      phoneNumber: '+1234567892',
      role: 'student',
      courseOfStudy: 'Software Engineering'
    });

    const student3 = await User.create({
      fullName: 'Mike Johnson',
      email: 'student3@example.com',
      password: 'student123',
      phoneNumber: '+1234567893',
      role: 'student',
      courseOfStudy: 'Data Science'
    });

    // Create student records
    await Student.create({
      user: student1._id,
      course: 'Computer Science',
      enrollmentYear: 2023,
      status: 'Active',
      gpa: 3.8
    });

    await Student.create({
      user: student2._id,
      course: 'Software Engineering',
      enrollmentYear: 2022,
      status: 'Active',
      gpa: 3.6
    });

    await Student.create({
      user: student3._id,
      course: 'Data Science',
      enrollmentYear: 2024,
      status: 'Active',
      gpa: 3.9
    });

    console.log('Seed data created successfully!');
    console.log('\nDefault Accounts:');
    console.log('Admin: admin@example.com / admin123');
    console.log('Student 1: student1@example.com / student123');
    console.log('Student 2: student2@example.com / student123');
    console.log('Student 3: student3@example.com / student123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();