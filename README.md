# 🚀 Vynk – Enterprise E-Commerce Platform

> Enterprise-grade e-commerce platform built with Java 17, Spring Boot, React, TypeScript, PostgreSQL, and Docker.

![Java](https://img.shields.io/badge/Java-17_LTS-red?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.2-6DB33F?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)

---

## ⚠️ Project Status

**Actively Under Development**

Vynk is my personal enterprise-scale e-commerce platform created to demonstrate modern backend engineering, scalable architecture, and full-stack application development using the Spring ecosystem.

Although the repository is named **CommerceHub**, the platform is branded as **Vynk**. The repository name has been retained for version history and continuity.

---

# 📖 Overview

Vynk is designed following enterprise software engineering principles with a modular architecture that emphasizes:

- Clean Architecture
- Layered Design
- RESTful APIs
- Secure Authentication
- Modular Components
- Scalability
- Maintainability

The project demonstrates practical implementation of backend engineering concepts including authentication, authorization, database design, API development, Docker containerization, CI/CD automation, localization, and responsive frontend development.

---

# ✨ Current Features

## Authentication & Security

- JWT Authentication
- Spring Security
- BCrypt Password Encryption
- Email Verification
- Password Reset
- Change Password
- Role-Based Access Control (RBAC)

---

## User Management

- User Registration
- User Login
- Profile Management
- Admin User Management
- Role Management

---

## Product Management

- Product CRUD
- Category Management
- Product Search
- Product Filtering
- Inventory Management

---

## Shopping Experience

- Shopping Cart
- Wishlist
- Order Management
- Shipping Module
- Coupon Management
- Reviews & Ratings

---

## Enterprise Features

- Swagger/OpenAPI Documentation
- Flyway Database Migration
- Global Exception Handling
- DTO Mapping (MapStruct)
- Validation
- Pagination
- Internationalization (i18n)
- Dark / Light Theme
- Responsive UI

---

# 🌍 Localization

Currently supports:

- English
- Hindi
- Arabic (RTL)
- French
- German
- Spanish
- Russian

---

# 🛠 Technology Stack

## Backend

- Java 17
- Spring Boot 3.3.2
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- MapStruct
- Flyway
- Maven

---

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios

---

## Database

- PostgreSQL

---

## DevOps & Tools

- Docker
- GitHub Actions
- Git
- GitHub
- Postman
- Swagger/OpenAPI

Cloud deployment and Kubernetes support are planned as the project continues to evolve.

---

# 🏗 Architecture

```
React + TypeScript

↓

REST APIs

↓

Spring Boot

↓

Controller Layer

↓

Service Layer

↓

Repository Layer

↓

PostgreSQL
```

---

# 🔒 Security

- JWT Authentication
- Spring Security
- BCrypt Password Encryption
- Role-Based Authorization
- Protected REST APIs
- Secure Password Reset
- Email Verification

---

# 📦 Modules

Implemented modules include:

- Authentication
- Users
- Roles
- Products
- Categories
- Shopping Cart
- Wishlist
- Orders
- Reviews
- Coupons
- Shipping
- Translation
- Admin Dashboard

Additional modules are being developed as part of the project's ongoing evolution.

---

# 📂 Project Structure

```
backend/
├── config/
├── security/
├── controllers/
├── services/
├── repositories/
├── entities/
├── dto/
├── exception/

frontend/
├── components/
├── pages/
├── context/
├── hooks/
├── services/
├── routes/
├── styles/
├── i18n/
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Sandeepkumar1703/commercehub-enterprise-platform.git
```

---

## Backend

```bash
cd backend
mvn spring-boot:run
```

Runs on:

```
http://localhost:8080
```

Swagger:

```
http://localhost:8080/swagger-ui/index.html
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:3000
```

---

# 🚧 Roadmap

Planned enhancements include:

- Payment Gateway Integration
- Product Recommendations
- Notification Service
- Redis Caching
- Elasticsearch
- Kubernetes Deployment
- AWS Cloud Deployment
- Monitoring & Logging
- Performance Optimization

---

# 📈 Learning Objectives

This project demonstrates hands-on experience with:

- Java Backend Development
- Spring Boot
- REST API Design
- Spring Security
- Hibernate ORM
- PostgreSQL
- React
- TypeScript
- Docker
- GitHub Actions
- Enterprise Software Architecture
- Authentication & Authorization
- Database Design
- Clean Code Principles

---

# 👨‍💻 Author

**Sandeep Kumar Prasad**

Java Backend Developer

- GitHub: https://github.com/Sandeepkumar1703
- LinkedIn: https://www.linkedin.com/in/sandeep-kumar-prasad-1703
- Email: sandeepkumarprasad01@gmail.com

---

# ⭐ Project Status

This project is actively maintained and continuously enhanced to explore enterprise application development, backend engineering, and modern software architecture.

Feedback, suggestions, and contributions are always welcome.