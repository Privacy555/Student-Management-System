# 🎓 School Management System – Backend

 ## Overview

This project is a role-based School Management System backend developed using Node.js, Express, MongoDB, and JWT authentication.
The application focuses on secure authentication, authorization, and clean API design for managing admins, mentors, and academic data.

The system follows real-world backend practices such as middleware-based authorization, password hashing, and modular project structure.

## Features

 JWT-based Authentication

 Role-Based Access Control (RBAC)

  Admin-only protected routes

  Mentor access control

  Secure Password Hashing using bcrypt

  Middleware-driven architecture

  MongoDB schema modeling with Mongoose

  RESTful API design

  Protected routes using JWT verification



## Tech Stack

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Authentication: JSON Web Tokens (JWT)

Security: bcrypt

Environment Management: dotenv

API Testing: Postman



##  Roles in the System
  ### 🔹 Admin

  - Login using email and password
  - Create mentor accounts
  - Access protected administrative routes

  ### 🔹 Mentor

  - Securely stored credentials
  - Access controlled by role-based middleware

  ### 🔹Student

  - Signup
  - Login using roll_no and password
  - Access protected administrative routes

    

## Core Concepts Implemented

JWT Authentication Flow

Password hashing before database storage

Custom middleware (jwtAuthMiddleware, roleMiddleware)

Separation of concerns (routes, models, middleware)

Error handling using try-catch blocks

Secure API design principles



##  Authentication Flow

Admin logs in using email and password

Password is verified using bcrypt

JWT token is generated and returned

Token is sent in Authorization header for protected routes

Middleware verifies token and role before allowing access
