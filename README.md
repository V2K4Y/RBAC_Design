# Role-Based Access Control (RBAC) Management System

This is a **Role-Based Access Control (RBAC) Management System** built using **React**, **Node.js**, **TypeScript**, and **Prisma ORM**. The system allows administrators to manage users, roles, modules, and actions, with fine-grained access control to secure resources and actions within the application.

## Overview

The RBAC Management System enables administrators to:
- **Create and manage users.**
- **Create roles** (e.g., Admin, Editor, Viewer) and assign permissions based on modules and actions.
- **Define modules** (e.g., User Management, Reports) and **actions** (e.g., create, view, update, delete) that can be assigned to roles.
- **Assign roles to users** to enforce access control.
- **Protect API routes** and **frontend pages** based on user roles and permissions.

## Features
- **Role-Based Access**: Assign specific actions to modules and then map those combinations to roles.
- **User Management**: Manage users and assign roles to them.
- **Module and Action Management**: Define and associate actions to specific modules.
- **JWT Authentication**: Secure routes and APIs using JSON Web Tokens (JWT).
- **Protected Routes**: Control access to frontend pages based on the user's role.
- **Clean UI**: Built with React and Tailwind CSS for responsive design and modern UI.

## Technology Stack

- **Frontend**:
  - **React** with **TypeScript** for component-based architecture and type safety.
  - **Tailwind CSS** for styling.
  - **React Router DOM** for routing and handling protected routes based on roles.
  - **Axios** for making API requests and handling JWT tokens in headers.

- **Backend**:
  - **Node.js** with **Express.js** for routing and middleware.
  - **TypeScript** for type safety and maintainability.
  - **Prisma ORM** to interact with a PostgreSQL database.
  - **PostgreSQL** as the relational database for storing users, roles, modules, actions, and permissions.
  - **JWT (JSON Web Tokens)** for authentication and securing APIs.

## Features in Detail

### **Backend**
- **User Management**: Create, update, and delete users. Assign roles to users.
- **Role Management**: Create and define roles (e.g., Admin, Editor). Map roles to specific actions and modules.
- **Module and Action Management**: Define and create modules and actions, then assign them to roles.
- **Protected Routes**: Routes are protected based on the user’s role using **middleware** for role validation.

### **Frontend**
- **Dashboard**: A home page to navigate to other sections of the app.
- **Modules Management**: Interface to create and manage modules and assign actions to them.
- **Roles Management**: Manage roles and assign permissions based on modules and actions.
- **Users Management**: Assign roles to users and view roles assigned to users.
- **Role-based Access**: Control visibility of pages based on user roles using **React Router** and **protected routes**.
- **Responsive Design**: Tailwind CSS ensures a responsive design that works on all devices.

## Project Setup

### **Clone the Repository**

```bash
git clone https://github.com/V2K4Y/RBAC_Design
```
---
### **Install Backend Dependencies**
Navigate to the `backend` folder:
```bash
cd backend
```
Install dependencies:
```bash
npm install
```
Set up your .env file with the necessary environment variables (e.g., DATABASE_URL for Prisma, JWT_SECRET).
Run the database migrations:
```bash
npx prisma migrate dev --name init
```

Start the backend server:
```bash
tsc -b
node dist/server.js
```
### **Install Frontend Dependencies**

Navigate to the `frontend` folder:
```bash
cd frontend
```
Install dependencies:
```bash
Install dependencies:
```
Start the frontend development server:
```bash
npm run dev
```