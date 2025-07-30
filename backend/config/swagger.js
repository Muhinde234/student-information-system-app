const swaggerDocument = {
  "swagger": "2.0",
  "info": {
    "title": "Student Management System",
    "description": "API for managing students and user profiles with role-based access",
    "version": "1.0.0"
  },
  "host": "localhost:5000",
  "basePath": "/api",
  "schemes": ["http"],
  "paths": {
    "/auth/register": {
      "post": {
        "summary": "Register a new user",
        "description": "Create a new student or admin account",
        "tags": ["Authentication"],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "required": true,
            "description": "User registration details",
            "schema": {
              "$ref": "#/definitions/UserRegister"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "User registered successfully",
            "schema": {
              "$ref": "#/definitions/AuthResponse"
            }
          },
          "400": {
            "description": "Invalid input"
          },
          "409": {
            "description": "Email already in use"
          }
        }
      }
    },
    "/auth/login": {
      "post": {
        "summary": "User login",
        "description": "Authenticate user and provide JWT token",
        "tags": ["Authentication"],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "required": true,
            "description": "User credentials",
            "schema": {
              "$ref": "#/definitions/Login"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Login successful",
            "schema": {
              "$ref": "#/definitions/AuthResponse"
            }
          },
          "400": {
            "description": "Invalid input"
          },
          "401": {
            "description": "Invalid credentials"
          }
        }
      }
    },
    "/profile/me": {
      "get": {
        "summary": "Get current user profile",
        "description": "Retrieve profile of the logged-in user",
        "tags": ["Profile"],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Profile retrieved successfully",
            "schema": {
              "$ref": "#/definitions/User"
            }
          },
          "401": {
            "description": "Unauthorized"
          }
        }
      },
      "put": {
        "summary": "Update current user profile",
        "description": "Update profile of the logged-in user",
        "tags": ["Profile"],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "required": true,
            "description": "Updated profile data",
            "schema": {
              "$ref": "#/definitions/UserUpdate"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Profile updated successfully",
            "schema": {
              "$ref": "#/definitions/User"
            }
          },
          "400": {
            "description": "Invalid input"
          },
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/students": {
      "get": {
        "summary": "Get all students",
        "description": "Retrieve list of all students with optional filters",
        "tags": ["Students"],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "parameters": [
          {
            "in": "query",
            "name": "status",
            "type": "string",
            "enum": ["Active", "Graduated", "Dropped"],
            "description": "Filter by status"
          },
          {
            "in": "query",
            "name": "course",
            "type": "string",
            "description": "Filter by course"
          }
        ],
        "responses": {
          "200": {
            "description": "Students retrieved successfully",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Student"
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden (admin only)"
          }
        }
      },
      "post": {
        "summary": "Create a new student",
        "description": "Add a new student record (admin only)",
        "tags": ["Students"],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "required": true,
            "description": "Student data",
            "schema": {
              "$ref": "#/definitions/StudentCreate"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Student created successfully",
            "schema": {
              "$ref": "#/definitions/Student"
            }
          },
          "400": {
            "description": "Invalid input"
          },
          "403": {
            "description": "Forbidden (admin only)"
          }
        }
      }
    },
    "/students/{id}": {
      "get": {
        "summary": "Get student by ID",
        "description": "Retrieve student details by ID",
        "tags": ["Students"],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "type": "string",
            "required": true,
            "description": "Student ID"
          }
        ],
        "responses": {
          "200": {
            "description": "Student retrieved successfully",
            "schema": {
              "$ref": "#/definitions/Student"
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Student not found"
          }
        }
      },
      "put": {
        "summary": "Update student",
        "description": "Update student record (admin only)",
        "tags": ["Students"],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "type": "string",
            "required": true,
            "description": "Student ID"
          },
          {
            "in": "body",
            "name": "body",
            "required": true,
            "description": "Updated student data",
            "schema": {
              "$ref": "#/definitions/StudentUpdate"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Student updated successfully",
            "schema": {
              "$ref": "#/definitions/Student"
            }
          },
          "400": {
            "description": "Invalid input"
          },
          "403": {
            "description": "Forbidden (admin only)"
          },
          "404": {
            "description": "Student not found"
          }
        }
      },
      "delete": {
        "summary": "Delete student",
        "description": "Delete student record (admin only)",
        "tags": ["Students"],
        "security": [
          {
            "BearerAuth": []
          }
        ],
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "type": "string",
            "required": true,
            "description": "Student ID"
          }
        ],
        "responses": {
          "204": {
            "description": "Student deleted successfully"
          },
          "403": {
            "description": "Forbidden (admin only)"
          },
          "404": {
            "description": "Student not found"
          }
        }
      }
    }
  },
  "tags": [
    {
      "name": "Authentication",
      "description": "User authentication and registration"
    },
    {
      "name": "Profile",
      "description": "User profile management"
    },
    {
      "name": "Students",
      "description": "Student management operations (admin only)"
    }
  ],
  "definitions": {
    "UserRegister": {
      "type": "object",
      "required": ["name", "email", "password", "role"],
      "properties": {
        "name": {
          "type": "string",
          "example": "John Doe"
        },
        "email": {
          "type": "string",
          "format": "email",
          "example": "john@example.com"
        },
        "password": {
          "type": "string",
          "example": "securePassword123!"
        },
        "phone": {
          "type": "string",
          "example": "123-456-7890"
        },
        "role": {
          "type": "string",
          "enum": ["admin", "student"],
          "example": "student"
        },
        "course": {
          "type": "string",
          "example": "Computer Science"
        },
        "enrollmentYear": {
          "type": "integer",
          "example": 2023
        },
        "status": {
          "type": "string",
          "enum": ["Active", "Graduated", "Dropped"],
          "example": "Active"
        }
      }
    },
    "Login": {
      "type": "object",
      "required": ["email", "password"],
      "properties": {
        "email": {
          "type": "string",
          "format": "email",
          "example": "john@example.com"
        },
        "password": {
          "type": "string",
          "example": "securePassword123!"
        }
      }
    },
    "AuthResponse": {
      "type": "object",
      "properties": {
        "token": {
          "type": "string",
          "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        },
        "user": {
          "$ref": "#/definitions/User"
        }
      }
    },
    "User": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "example": "507f1f77bcf86cd799439011"
        },
        "name": {
          "type": "string",
          "example": "John Doe"
        },
        "email": {
          "type": "string",
          "format": "email",
          "example": "john@example.com"
        },
        "phone": {
          "type": "string",
          "example": "123-456-7890"
        },
        "role": {
          "type": "string",
          "enum": ["admin", "student"],
          "example": "student"
        },
        "profilePicture": {
          "type": "string",
          "example": "https://example.com/profile.jpg"
        }
      }
    },
    "UserUpdate": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "example": "John Doe"
        },
        "phone": {
          "type": "string",
          "example": "123-456-7890"
        },
        "profilePicture": {
          "type": "string",
          "example": "https://example.com/new-profile.jpg"
        }
      }
    },
    "Student": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "example": "507f1f77bcf86cd799439011"
        },
        "name": {
          "type": "string",
          "example": "John Doe"
        },
        "email": {
          "type": "string",
          "format": "email",
          "example": "john@example.com"
        },
        "phone": {
          "type": "string",
          "example": "123-456-7890"
        },
        "course": {
          "type": "string",
          "example": "Computer Science"
        },
        "enrollmentYear": {
          "type": "integer",
          "example": 2023
        },
        "status": {
          "type": "string",
          "enum": ["Active", "Graduated", "Dropped"],
          "example": "Active"
        }
      }
    },
    "StudentCreate": {
      "type": "object",
      "required": ["name", "email", "course", "enrollmentYear"],
      "properties": {
        "name": {
          "type": "string",
          "example": "Jane Smith"
        },
        "email": {
          "type": "string",
          "format": "email",
          "example": "jane@example.com"
        },
        "phone": {
          "type": "string",
          "example": "987-654-3210"
        },
        "course": {
          "type": "string",
          "example": "Engineering"
        },
        "enrollmentYear": {
          "type": "integer",
          "example": 2024
        },
        "status": {
          "type": "string",
          "enum": ["Active", "Graduated", "Dropped"],
          "example": "Active"
        }
      }
    },
    "StudentUpdate": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "example": "Jane Smith"
        },
        "email": {
          "type": "string",
          "format": "email",
          "example": "jane@example.com"
        },
        "phone": {
          "type": "string",
          "example": "987-654-3210"
        },
        "course": {
          "type": "string",
          "example": "Engineering"
        },
        "enrollmentYear": {
          "type": "integer",
          "example": 2024
        },
        "status": {
          "type": "string",
          "enum": ["Active", "Graduated", "Dropped"],
          "example": "Active"
        },
        "role": {
          "type": "string",
          "enum": ["admin", "student"],
          "example": "student"
        }
      }
    }
  },
  "securityDefinitions": {
    "BearerAuth": {
      "type": "apiKey",
      "name": "Authorization",
      "in": "header",
      "description": "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\""
    }
  }
};

module.exports = swaggerDocument;