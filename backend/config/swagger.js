const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Management API',
      version: '1.0.0',
      description: 'API for managing students and user profiles with role-based access control',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com'
            },
            phone: {
              type: 'string',
              example: '123-456-7890'
            },
            role: {
              type: 'string',
              enum: ['admin', 'student'],
              example: 'student'
            },
            profilePicture: {
              type: 'string',
              example: 'https://example.com/profile.jpg'
            },
            course: {
              type: 'string',
              example: 'Computer Science'
            },
            enrollmentYear: {
              type: 'integer',
              example: 2023
            },
            status: {
              type: 'string',
              enum: ['Active', 'Graduated', 'Dropped'],
              example: 'Active'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            },
            user: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Error message'
            }
          }
        }
      }
    },
    security: [{
      BearerAuth: []
    }]
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;