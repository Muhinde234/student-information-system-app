require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // Add this import
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const specs = require('./config/swagger');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Import routes after DB connection is established
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { protect } = require('./middleware/auth');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Seed data function
const seedData = async () => {
  try {
    const User = require('./models/User');
    
    // Check if users already exist
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
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
        phone: '123-456-7890'
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('student123', 10),
        role: 'student',
        phone: '111-222-3333',
        course: 'Computer Science',
        enrollmentYear: 2022,
        status: 'Active'
      },
      {
        name: 'dosta ',
        email: 'igirimpuhwedosta@gmail.com',
        password: await bcrypt.hash('student123', 10),
        role: 'student',
        phone: '444-555-6666',
        course: 'Engineering',
        enrollmentYear: 2021,
        status: 'Active'
      }
    ];

    await User.insertMany(users);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Start server after seeding
const startServer = async () => {
  try {
    // Only seed data in development
    if (process.env.NODE_ENV !== 'production') {
      await seedData();
    }
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the application
startServer();