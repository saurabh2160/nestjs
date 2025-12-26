# 📝 Task Manager API

- A Task Manager backend application built using NestJS and TypeScript, designed as a learning project to understand scalable backend architecture, secure APIs, and role-based authorization.

    This project focuses on building real-world APIs with proper authentication, authorization, and clean code practices.

# 📝 Task Manager API

- A Task Manager backend application built using NestJS and TypeScript, designed as a learning project to understand scalable backend architecture, secure APIs, and role-based authorization.

- This project focuses on building real-world APIs with proper authentication, authorization, and clean code practices.

# 🎯 Project Goals

- Learn TypeScript in a real backend project

- Understand NestJS modular architecture

- Design clean REST APIs

- Implement JWT-based authentication

- Secure routes using role-based authorization

- Work directly with MongoDB native driver (no ODM)

# 🧱 Application Architecture

- The application is structured using NestJS best practices:
    src/
    ├── auth/                   # Authentication & JWT logic
    ├── user/                  # User CRUD operations
    ├── tasks/                  # Task CRUD operations
    ├── databaseproviders/      # MongoDB connection provider
    ├── app.module.ts
    └── main.ts
# 👤 User APIs (CRUD)

- Implemented complete User lifecycle management:

- Create user (Signup)

- Get user details

- Update user profile

- Secure password storage using bcrypt

- Unique user identification using UUID v7

# Security

- Passwords are hashed before storing

- Email uniqueness enforced

- JWT issued on successful login

# ✅ Task APIs (CRUD)

    Each task is:

    Created by a specific user

    Linked to the creator using MongoDB ObjectId reference

    Supported operations:

    Create task

    Get tasks (user-specific)

    Update task

    Delete task (only creator allowed)

    Authorization rule:

    A task can be deleted or updated only if the task ID and creator ID match