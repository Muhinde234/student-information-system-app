require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs'); 
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const specs = require('./config/swagger');

// Validate required environment variables
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET environment variable is required');
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI environment variable is required');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


connectDB();



const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes'); 


app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/students', studentRoutes); 


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.get('/', (req, res) => {
  res.json({ 
    message: 'Student Management API is running!',
    version: '1.0.0'
  });
});


const seedData = async () => {
  try {
    const User = require('./models/User');
    
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    const johnExists = await User.findOne({ email: 'john@example.com' });
    const dostaExists = await User.findOne({ email: 'igirimpuhwedosta@gmail.com' });
    
    if (adminExists && johnExists && dostaExists) {
      console.log('Seed data already exists');
      return;
    }

    const users = [
      {
        name: 'Sonia',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10),
        role: 'admin',
        phone: '123-456-7890'
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('student123', parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10),
        role: 'student',
        phone: '111-222-3333',
        course: 'Computer Science',
        enrollmentYear: 2022,
        status: 'Active'
      },
      {
        name: 'Dosta',
        email: 'igirimpuhwedosta@gmail.com',
        password: await bcrypt.hash('student123', parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10),
        role: 'student',
        phone: '444-555-6666',
        course: 'Engineering',
        enrollmentYear: 2021,
        status: 'Active'
      }
    ];

    await User.insertMany(users);
    console.log('Database seeded successfully!');
    console.log('Test accounts:');
    console.log('Admin: admin@example.com / admin123');
    console.log('Student: john@example.com / student123');
    console.log('Student: igirimpuhwedosta@gmail.com / student123');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});


app.use('*', (req, res) => {
  res.status(404).json({ 
    message: `Route ${req.originalUrl} not found` 
  });
});


const startServer = async () => {
  try {
   
    if (process.env.NODE_ENV !== 'production') {
      await seedData();
    }
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
      console.log('Available routes:');
      console.log('POST /api/auth/register');
      console.log('POST /api/auth/login');
      console.log('GET  /api/profile/me');
      console.log('PUT  /api/profile/me');
      console.log('GET  /api/admin/students');
      console.log('GET  /api/students');
      console.log('POST /api/students');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();