# CommerceHub - Enterprise Grade E-Commerce Platform

A production-ready, modular monolith e-commerce platform built with enterprise technologies. Designed to be refactored into microservices when necessary.

**Status**: Work in Progress - Stage 1: Backend Setup ✅

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Tech Stack](#-tech-stack)
3. [Architecture](#-architecture)
4. [Project Structure](#-project-structure)
5. [Prerequisites](#-prerequisites)
6. [Getting Started](#-getting-started)
7. [Development Workflow](#-development-workflow)
8. [API Documentation](#-api-documentation)
9. [Deployment](#-deployment)
10. [Contributing](#-contributing)

---

## 🎯 Project Overview

CommerceHub is an enterprise-grade e-commerce platform demonstrating:

✅ **Enterprise Architecture** - Layered architecture with SOLID principles  
✅ **Production-Ready Code** - Follows best practices and coding standards  
✅ **Security** - JWT authentication, role-based authorization, encrypted passwords  
✅ **Scalability** - Designed for eventual microservices migration  
✅ **Testability** - Comprehensive unit and integration tests  
✅ **Documentation** - Well-documented code and architecture  
✅ **CI/CD Ready** - GitHub Actions, Docker, Kubernetes  

---

## 🛠️ Tech Stack

### Backend
- **Java 21** - Latest LTS version
- **Spring Boot 3.3.2** - Modern Java framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - ORM with Hibernate
- **PostgreSQL** - Production-grade database
- **Redis** - Caching & session management
- **Kafka** - Event streaming & messaging
- **Maven** - Build tool
- **JWT** - Stateless authentication
- **MapStruct** - DTO mapping
- **Swagger/OpenAPI** - API documentation
- **Docker & Kubernetes** - Containerization & orchestration

### Frontend
- **Angular 20** - Modern web framework
- **Angular Material** - UI component library
- **Signals** - Reactive state management
- **RxJS** - Reactive programming
- **TypeScript** - Type-safe JavaScript
- **Lazy Loading** - Performance optimization
- **Route Guards** - Security

### DevOps & Cloud
- **Docker & Docker Compose** - Containerization
- **Kubernetes** - Orchestration
- **GitHub Actions** - CI/CD
- **AWS** - Cloud infrastructure
- **Terraform** - Infrastructure as Code

---

## 🏗️ Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                      │
│                    (Angular 20, REST APIs)                     │
└───────────────────────────────────────────────────────────────┘
                                ↕
┌───────────────────────────────────────────────────────────────┐
│                    SECURITY & FILTERS                          │
│              (JWT, Authentication, Authorization)              │
└───────────────────────────────────────────────────────────────┘
                                ↕
┌───────────────────────────────────────────────────────────────┐
│                          CONTROLLER LAYER                      │
│                    (REST Endpoints, Validation)                │
└───────────────────────────────────────────────────────────────┘
                                ↕
┌───────────────────────────────────────────────────────────────┐
│                             DTO LAYER                          │
│                  (Data Transfer Objects, Mapper)               │
└───────────────────────────────────────────────────────────────┘
                                ↕
┌───────────────────────────────────────────────────────────────┐
│                         SERVICE LAYER                          │
│                     (Business Logic, Rules)                    │
└───────────────────────────────────────────────────────────────┘
                                ↕
┌───────────────────────────────────────────────────────────────┐
│                       REPOSITORY LAYER                         │
│                  (Data Access, JPA Queries)                    │
└───────────────────────────────────────────────────────────────┘
                                ↕
┌───────────────────────────────────────────────────────────────┐
│                    PERSISTENCE LAYER                           │
│         (JPA Entities, Hibernate, PostgreSQL)                  │
└───────────────────────────────────────────────────────────────┘
                                ↕
┌───────────────────────────────────────────────────────────────┐
│                   DATABASE & CACHE LAYER                       │
│            (PostgreSQL, Redis, Kafka)                          │
└───────────────────────────────────────────────────────────────┘
```

### Design Principles

- **Layered Architecture** - Clean separation of concerns
- **SOLID Principles** - Maintainable and extensible code
- **Clean Architecture** - Business logic independent of frameworks
- **Repository Pattern** - Abstract data access
- **DTO Pattern** - API contracts separate from entities
- **Dependency Injection** - Constructor injection only
- **Global Exception Handling** - Centralized error management

---

## 📂 Project Structure

```
commercehub-enterprise-platform/
│
├── backend/                          # Spring Boot application
│   ├── src/main/java/com/commercehub/backend/
│   │   ├── config/                  # Spring configuration
│   │   ├── controller/              # REST endpoints
│   │   ├── service/                 # Business logic
│   │   ├── repository/              # Data access
│   │   ├── entity/                  # JPA entities
│   │   ├── dto/                     # Data transfer objects
│   │   ├── mapper/                  # DTO mappers
│   │   ├── security/                # JWT & authentication
│   │   ├── exception/               # Error handling
│   │   ├── validation/              # Custom validators
│   │   ├── filter/                  # HTTP filters
│   │   ├── util/                    # Utility classes
│   │   ├── constant/                # Application constants
│   │   └── CommerceHubApplication.java
│   ├── src/main/resources/
│   │   ├── application.yml          # Main config
│   │   ├── application-dev.yml      # Dev profile
│   │   ├── application-prod.yml     # Prod profile
│   │   └── db/migration/            # Flyway scripts
│   ├── src/test/                    # Unit & integration tests
│   ├── pom.xml                      # Maven configuration
│   └── README.md                    # Backend documentation
│
├── frontend/                         # Angular application (upcoming)
│   └── commercehub-ui/
│
├── infrastructure/                   # DevOps configurations
│   ├── docker/                      # Dockerfiles
│   ├── kubernetes/                  # K8s manifests
│   └── terraform/                   # IaC scripts
│
├── docs/                            # Documentation
│   ├── Architecture.md
│   ├── ER-Diagram.md
│   ├── API.md
│   └── Deployment.md
│
├── scripts/                         # Utility scripts
│   ├── start.sh
│   ├── stop.sh
│   └── deploy.sh
│
├── .github/
│   └── workflows/                   # GitHub Actions CI/CD
│
├── docker-compose.yml               # Local development stack
├── README.md                        # This file
├── LICENSE                          # Apache 2.0
└── .gitignore
```

---

## ✅ Prerequisites

### Required
- **Java 21 LTS** - [Download](https://www.oracle.com/java/technologies/downloads/#java21)
- **Maven 3.8.1+** - [Download](https://maven.apache.org/)
- **Git** - [Download](https://git-scm.com/)
- **PostgreSQL 16+** - [Download](https://www.postgresql.org/)
- **Node.js 20 LTS** - [Download](https://nodejs.org/) (for frontend)

### Optional
- **Docker Desktop** - [Download](https://www.docker.com/)
- **IntelliJ IDEA** or **VS Code** - IDEs
- **Postman** - API testing
- **pgAdmin** or **DBeaver** - Database GUI

### Verify Installation

```bash
# Java
java -version
# Expected: openjdk 21.0.x

# Maven
mvn -version
# Expected: Apache Maven 3.8.1+

# Git
git --version

# Node.js (for frontend)
node -v
npm -v
```

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone <repository-url>
cd commercehub-enterprise-platform
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
mvn clean install

# Build the project
mvn clean package

# Run application
mvn spring-boot:run

# Or run the JAR
java -jar target/commercehub-backend-1.0.0-SNAPSHOT.jar
```

**Access points**:
- API: `http://localhost:8080/api`
- Swagger UI: `http://localhost:8080/api/swagger-ui.html`
- Health Check: `http://localhost:8080/api/actuator/health`

### 3. Database Setup

```bash
# Create database
createdb -U postgres commercehub

# Load initial schema
psql -U postgres -d commercehub < backend/src/main/resources/db/schema.sql
```

### 4. Environment Variables

Create `.env` file in project root:

```env
DATABASE_URL=jdbc:postgresql://localhost:5432/commercehub
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
JWT_SECRET=your-super-secret-jwt-key-change-in-production
REDIS_HOST=localhost
REDIS_PORT=6379
KAFKA_BROKER=localhost:9092
```

### 5. Docker Compose (Optional)

Run all services using Docker Compose:

```bash
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

---

## 💻 Development Workflow

### Running Application

**Option 1: Spring Boot Maven Plugin**
```bash
cd backend
mvn spring-boot:run
```

**Option 2: Compiled JAR**
```bash
cd backend
mvn clean package
java -jar target/commercehub-backend-1.0.0-SNAPSHOT.jar
```

**Option 3: Docker**
```bash
docker-compose up backend
```

### Hot Reload During Development

Spring Boot DevTools automatically restarts the application when files change. No manual restart needed!

### Running Tests

```bash
# Unit tests
mvn test

# Integration tests
mvn verify

# With coverage report
mvn jacoco:report

# View coverage
open target/site/jacoco/index.html
```

### Code Quality

```bash
# Build and run all tests
mvn clean verify

# Generate code coverage
mvn jacoco:report

# View SonarQube analysis (when integrated)
```

---

## 📚 API Documentation

### Swagger UI
Access interactive API documentation at:
```
http://localhost:8080/api/swagger-ui.html
```

### OpenAPI JSON
```
http://localhost:8080/api/v3/api-docs
```

### Sample API Call

```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "secure-password",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

---

## 📦 Deployment

### Local Development
```bash
mvn spring-boot:run
```

### Production Build
```bash
mvn clean package -P prod
java -jar target/commercehub-backend-1.0.0-SNAPSHOT.jar
```

### Docker
```bash
docker build -f infrastructure/docker/Dockerfile -t commercehub-backend:latest .
docker run -p 8080:8080 commercehub-backend:latest
```

### Kubernetes
```bash
kubectl apply -f infrastructure/kubernetes/
kubectl port-forward svc/backend-service 8080:8080
```

### AWS
See [infrastructure/terraform/](infrastructure/terraform/) for Terraform scripts.

---

## 📝 Development Standards

### Code Style
- ✅ Follow [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
- ✅ Use Java 21 features (records, sealed classes, etc.)
- ✅ Constructor injection only (no field injection)
- ✅ Use Lombok for boilerplate reduction
- ✅ Comprehensive logging with SLF4J

### Package Structure
```
com.commercehub.backend
  ├── config/          # Spring configuration
  ├── controller/      # REST endpoints
  ├── service/         # Business logic
  ├── repository/      # Data access
  ├── entity/          # Database entities
  ├── dto/             # DTOs
  ├── mapper/          # DTO mappers
  ├── security/        # Security components
  ├── exception/       # Exception handling
  ├── validation/      # Custom validators
  ├── filter/          # HTTP filters
  ├── util/            # Utilities
  └── constant/        # Constants
```

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Class | PascalCase | `UserService`, `UserController` |
| Interface | PascalCase | `UserService`, `UserMapper` |
| Method | camelCase | `getUserById()`, `createUser()` |
| Variable | camelCase | `userId`, `userName` |
| Constant | UPPER_SNAKE_CASE | `MAX_PAGE_SIZE`, `JWT_EXPIRATION` |
| Package | lowercase | `com.commercehub.backend.service` |

### Dependency Injection

```java
// ✅ CORRECT: Constructor injection
@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
}

// ❌ WRONG: Field injection
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
}
```

---

## 🧪 Testing Strategy

- **Unit Tests**: Test business logic in isolation (70% coverage target)
- **Integration Tests**: Test components working together
- **E2E Tests**: Test complete workflows
- **Security Tests**: Test authorization and authentication

### Example Unit Test

```java
@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserServiceImpl userService;
    
    @Test
    void shouldCreateUserSuccessfully() {
        // Arrange
        CreateUserRequest request = new CreateUserRequest("user@example.com", "password");
        User user = new User();
        when(userRepository.save(any())).thenReturn(user);
        
        // Act
        UserResponse response = userService.createUser(request);
        
        // Assert
        assertThat(response).isNotNull();
        verify(userRepository, times(1)).save(any());
    }
}
```

---

## 🔐 Security

- ✅ JWT token-based authentication
- ✅ Role-based authorization (RBAC)
- ✅ Password encryption with bcrypt
- ✅ CORS configuration
- ✅ SQL injection prevention (JPA)
- ✅ CSRF protection
- ✅ Sensitive data encryption with Jasypt

---

## 📊 Monitoring

- **Health Check**: `http://localhost:8080/api/actuator/health`
- **Metrics**: `http://localhost:8080/api/actuator/metrics`
- **Prometheus**: `http://localhost:8080/api/actuator/prometheus`

---

## 🤝 Contributing

Please read [Contributing Guidelines](CONTRIBUTING.md) before starting work.

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

Example:
```
feat(user): add JWT authentication

Implement JWT token generation and validation
Closes #123
```

---

## 📄 License

This project is licensed under the Apache License 2.0 - see [LICENSE](LICENSE) file.

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-org/commercehub-enterprise-platform/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/commercehub-enterprise-platform/discussions)
- **Documentation**: See [docs/](docs/) folder

---

## 🎓 Learning Path

1. ✅ Project Setup (Stage 1)
2. ⬜ Database Design & Schema
3. ⬜ JWT Authentication
4. ⬜ Product Module
5. ⬜ Order Module
6. ⬜ Payment Integration
7. ⬜ Admin Dashboard
8. ⬜ Angular Frontend
9. ⬜ Docker & Kubernetes
10. ⬜ AWS Deployment
11. ⬜ Microservices Refactoring
12. ⬜ CI/CD Pipeline

---

## 🚀 Next Steps

1. Review the [Backend README](backend/README.md)
2. Review the [Project Structure](backend/PROJECT_STRUCTURE.md)
3. Review the [POM Documentation](backend/POM_DOCUMENTATION.md)
4. Set up PostgreSQL database
5. Get approval on **Project Setup**
6. Move to **Database Design** phase

**Ready? Request approval to proceed to the next phase!**
