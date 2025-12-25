# Student-Management-System
A RESTful school management backend built with Node.js, Express, MongoDB, and JWT, featuring secure authentication and role-based access control for admins and mentors.

@@@@@ **Overview** @@@@@@
This project is a role-based School Management System backend developed using Node.js, Express, MongoDB, and JWT authentication.
The application focuses on secure authentication, authorization, and clean API design for managing admins, mentors, and academic data.
The system follows real-world backend practices such as middleware-based authorization, password hashing, and modular project structure.


@@@@@@ **Features** @@@@@@@@

  1. JWT-based Authentication

  2. Role-Based Access Control (RBAC)

  3. Admin-only protected routes

  4. Mentor access control
  
  5. Secure Password Hashing using bcrypt

  6. Middleware-driven architecture

  7. MongoDB schema modeling with Mongoose

  8. RESTful API design

  9. Protected routes using JWT verification

 
@@@@@ **Tech Stack** @@@@@

  Backend: Node.js, Express.js

  Database: MongoDB, Mongoose

  Authentication: JSON Web Tokens (JWT)

  Security: bcrypt

  Environment Management: dotenv

  API Testing: Postman



@@@@@ **👥 Roles in the System** @@@@@

  🔹 _Admin_
   -Login using email and password
   -Create mentor accounts
   -Access protected administrative routes

  🔹_ Mentor_
   -Securely stored credentials
   -Access controlled by role-based middleware

  🔹_ Student_
    - Signup
    - Login using email and password
    - Access protected administrative routes



@@@@@ 🧠 **Core Concepts Implemented** @@@@@

   1. JWT Authentication Flow

   2. Password hashing before database storage

   3. Custom middleware (jwtAuthMiddleware, roleMiddleware)

   4. Separation of concerns (routes, models, middleware)

   5. Error handling using try-catch blocks

   6. Secure API design principles




@@@@@ 🔐 **Authentication Flow** @@@@@

   Admin logs in using email and password

   Password is verified using bcrypt

   JWT token is generated and returned

   Token is sent in Authorization header for protected routes

   Middleware verifies token and role before allowing access
