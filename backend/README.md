# CommerceHub Backend - Spring Boot Application

Enterprise-grade REST API for the CommerceHub E-Commerce Platform built with Spring Boot 3.3.2, Java 21, and PostgreSQL.

---

## 📋 Quick Start

### Prerequisites
- Java 21 JDK
- Maven 3.8.1+
- PostgreSQL 16+

### Run Application

```bash
# Install dependencies
mvn clean install

# Run with development profile
mvn spring-boot:run -Dspring.profiles.active=dev

# Build executable JAR
mvn clean package

# Run JAR
java -jar target/commercehub-backend-1.0.0-SNAPSHOT.jar --spring.profiles.active=dev
```

### Access Points
- **API Base URL**: `http://localhost:8080/api`
- **Swagger UI**: `http://localhost:8080/api/swagger-ui.html`
- **Health Check**: `http://localhost:8080/api/actuator/health`
- **Metrics**: `http://localhost:8080/api/actuator/metrics`

---

## 🏗️ Architecture Overview

### Layered Architecture

```
┌─────────────────────────────────────┐
│   REST Controller Layer             │ ← HTTP Requests
├─────────────────────────────────────┤
│   DTO / Mapper Layer                │ ← Data Transformation
├─────────────────────────────────────┤
│   Service Layer (Business Logic)    │ ← Core Business Rules
├─────────────────────────────────────┤
│   Repository Layer (Data Access)    │ ← JPA/Hibernate
├─────────────────────────────────────┤
│   Entity Layer (Persistence)        │ ← JPA Entities
├─────────────────────────────────────┤
│   Database Layer                    │ ← PostgreSQL
└─────────────────────────────────────┘
```

### Cross-Cutting Concerns

```
Security Layer
  ├── JWT Authentication
  ├── Role-Based Authorization
  └── Spring Security Filters

Exception Handling Layer
  ├── Global Exception Handler
  └── Custom Exceptions

Logging & Monitoring
  ├── SLF4J Logging
  ├── AOP Aspects
  └── Actuator Metrics
```

---

## 📂 Project Structure

Detailed structure and explanation in [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

```
backend/
├── src/main/java/com/commercehub/backend/
│   ├── config/              # Spring configuration beans
│   ├── controller/          # REST endpoints
│   ├── service/             # Business logic
│   ├── repository/          # Data access objects
│   ├── entity/              # JPA entities
│   ├── dto/                 # Data transfer objects
│   ├── mapper/              # MapStruct mappers
│   ├── security/            # JWT & authentication
│   ├── exception/           # Error handling
│   ├── validation/          # Custom validators
│   ├── filter/              # HTTP filters
│   ├── util/                # Utility classes
│   ├── constant/            # Constants
│   └── CommerceHubApplication.java
│
├── src/main/resources/
│   ├── application.yml      # Base configuration
│   ├── application-dev.yml  # Development profile
│   ├── application-prod.yml # Production profile
│   └── db/migration/        # Flyway database migrations
│
├── src/test/
│   ├── java/                # Unit & integration tests
│   └── resources/           # Test configuration
│
├── pom.xml                  # Maven configuration
├── PROJECT_STRUCTURE.md     # Detailed structure explanation
├── POM_DOCUMENTATION.md     # Dependencies explanation
└── README.md                # This file
```

---

## 🔧 Configuration Management

### Application Profiles

#### Development (`application-dev.yml`)
```yml
- Local PostgreSQL on localhost:5432
- Debug logging enabled
- Hot reload enabled
- CORS allows localhost:3000, localhost:4200
```

**Run**: `mvn spring-boot:run -Dspring.profiles.active=dev`

#### Production (`application-prod.yml`)
```yml
- Database via environment variables
- Minimal logging (WARN level)
- Performance optimizations enabled
- Specific CORS origins
```

**Run**: `java -jar app.jar --spring.profiles.active=prod`

### Key Configuration Properties

```yaml
spring:
  jpa.hibernate.ddl-auto: validate  # validate, update, create, create-drop
  datasource:
    url: jdbc:postgresql://localhost:5432/commercehub
    username: postgres
    password: postgres
  redis:
    host: localhost
    port: 6379
  kafka:
    bootstrap-servers: localhost:9092

jwt:
  secret: ${JWT_SECRET:dev-secret-key}
  expiration: 86400000  # 24 hours

server:
  port: 8080
  servlet.context-path: /api

logging:
  level:
    root: INFO
    com.commercehub: DEBUG
```

See `application.yml` for complete configuration.

---

## 📚 Key Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| Java | 21 | Programming language |
| Spring Boot | 3.3.2 | Application framework |
| Spring Security | 6.2.2 | Authentication & authorization |
| Spring Data JPA | 3.3.2 | Data access abstraction |
| Hibernate | 6.4.4 | ORM framework |
| PostgreSQL | 16+ | Relational database |
| Redis | 7+ | Caching & sessions |
| Kafka | 3.8+ | Event streaming |
| JWT (JJWT) | 0.12.3 | Token-based authentication |
| MapStruct | 1.5.5 | DTO mapping |
| Lombok | 1.18.30 | Boilerplate reduction |
| SpringDoc OpenAPI | 2.3.0 | API documentation |
| Flyway | 9.22.3 | Database migrations |
| JUnit 5 | 5.9.2 | Unit testing |
| Mockito | 5.3.1 | Mocking framework |
| TestContainers | 1.19.8 | Integration testing |

See [POM_DOCUMENTATION.md](POM_DOCUMENTATION.md) for detailed explanation of each dependency.

---

## 🚀 Running the Application

### Option 1: Maven Spring Boot Plugin (Development)

```bash
cd backend
mvn clean spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

**Advantages**:
- Hot reload enabled
- Instant startup
- Perfect for development

### Option 2: Executable JAR (Any Environment)

```bash
# Build
mvn clean package

# Run
java -jar target/commercehub-backend-1.0.0-SNAPSHOT.jar

# With specific profile
java -jar target/commercehub-backend-1.0.0-SNAPSHOT.jar --spring.profiles.active=prod
```

### Option 3: Docker Container

```bash
# Build image
docker build -t commercehub-backend:latest -f infrastructure/docker/Dockerfile .

# Run container
docker run -p 8080:8080 \
  -e DATABASE_URL=jdbc:postgresql://postgres:5432/commercehub \
  -e DATABASE_USERNAME=postgres \
  -e DATABASE_PASSWORD=postgres \
  commercehub-backend:latest
```

### Option 4: Docker Compose (Full Stack)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

---

## 🧪 Testing

### Run All Tests

```bash
mvn test
```

### Run Integration Tests

```bash
mvn verify
```

### Generate Code Coverage Report

```bash
mvn jacoco:report
open target/site/jacoco/index.html
```

### Run Specific Test

```bash
mvn test -Dtest=UserServiceImplTest
```

### Enable Debug Mode

```bash
mvn test -X
```

---

## 🛢️ Database Management

### Database Setup

```bash
# Create database
createdb -U postgres commercehub

# Or using psql
psql -U postgres -c "CREATE DATABASE commercehub;"
```

### Run Migrations

Migrations run automatically on application startup (Flyway).

Migration files location: `src/main/resources/db/migration/`

```bash
# Manual migration
mvn flyway:migrate -Dflyway.url=jdbc:postgresql://localhost:5432/commercehub
```

### Database Tools

- **pgAdmin**: Web-based PostgreSQL management
- **DBeaver**: Universal database tool
- **DataGrip**: IntelliJ JDBC tool
- **psql**: Command-line client

---

## 📊 Monitoring & Health

### Health Check

```bash
curl http://localhost:8080/api/actuator/health
```

Response:
```json
{
  "status": "UP",
  "components": {
    "db": { "status": "UP" },
    "redis": { "status": "UP" },
    "diskSpace": { "status": "UP" }
  }
}
```

### Application Metrics

```bash
curl http://localhost:8080/api/actuator/metrics
```

### Prometheus Metrics

```bash
curl http://localhost:8080/api/actuator/prometheus
```

---

## 🔐 Security Features

### JWT Authentication

1. **User Login** → Token Generated
2. **Token Sent** in `Authorization: Bearer <token>` header
3. **Token Validated** on each request
4. **Access Granted/Denied** based on roles

### Security Chain

```
HTTP Request
    ↓
CORS Filter
    ↓
JWT Authentication Filter
    ↓
Spring Security Filter Chain
    ↓
@PreAuthorize checks
    ↓
Controller
```

### Test Authenticated Endpoint

```bash
# 1. Login and get token
TOKEN=$(curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}' \
  | jq -r '.data.token')

# 2. Use token
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/users
```

---

## 🛠️ Development Tips

### Hot Reload

Spring Boot DevTools automatically restarts the application when:
- Java source files change
- Resource files change
- Templates change

No manual restart needed!

### Enable Debug Logging

In `application-dev.yml`:
```yaml
logging:
  level:
    org.hibernate.SQL: DEBUG
    org.hibernate.type.descriptor.sql.BasicBinder: TRACE
    org.springframework.security: DEBUG
```

### Query Performance

Enable Hibernate statistics:
```yaml
spring:
  jpa:
    properties:
      hibernate:
        generate_statistics: true
        use_sql_comments: true
```

View statistics in logs.

### REST Client

Use the `rest-client` or REST extensions in VS Code:

```rest
### Get all users
GET http://localhost:8080/api/users
Authorization: Bearer YOUR_TOKEN_HERE

### Create user
POST http://localhost:8080/api/users
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe"
}
```

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 8080 (Linux/Mac)
lsof -ti:8080 | xargs kill -9

# (Windows)
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Database Connection Error

```
ERROR: org.postgresql.util.PSQLException: Connection to localhost:5432 refused
```

**Solutions**:
1. Ensure PostgreSQL is running
2. Check connection string in `application-dev.yml`
3. Verify credentials

```bash
# Test connection
psql -U postgres -d commercehub -c "SELECT 1"
```

### Out of Memory

```bash
# Increase heap size
java -Xmx1024m -Xms512m -jar app.jar
```

### Tests Failing

```bash
# Clean and rebuild
mvn clean test

# Run specific test with debug
mvn test -Dtest=UserServiceImplTest -X
```

---

## 📝 Code Style & Standards

### Java Coding Standards

- ✅ PascalCase for classes: `UserService`, `UserController`
- ✅ camelCase for methods: `getUserById()`, `createUser()`
- ✅ UPPER_SNAKE_CASE for constants: `MAX_PAGE_SIZE`, `JWT_EXPIRATION`
- ✅ Prefer constructor injection over field injection
- ✅ Use Lombok for boilerplate reduction
- ✅ Comprehensive logging with SLF4J

### Proper Dependency Injection

```java
// ✅ CORRECT
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
}

// ❌ WRONG
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
}
```

### Logging Example

```java
@Slf4j
@Service
public class UserService {
    public UserResponse createUser(CreateUserRequest request) {
        log.info("Creating user with email: {}", request.getEmail());
        try {
            // Business logic
            log.debug("User created successfully with ID: {}", user.getId());
            return response;
        } catch (Exception e) {
            log.error("Error creating user", e);
            throw new UserCreationException(e.getMessage());
        }
    }
}
```

---

## 📦 Maven Commands Reference

```bash
# Install dependencies
mvn clean install

# Compile only
mvn clean compile

# Run tests
mvn test

# Build JAR
mvn clean package

# Skip tests during build
mvn clean package -DskipTests

# Run application
mvn spring-boot:run

# View dependency tree
mvn dependency:tree

# Update dependencies
mvn versions:display-dependency-updates

# Code coverage
mvn jacoco:report

# Format code
mvn spotless:apply
```

---

## 🚀 Performance Optimization

### Database Query Optimization

```java
@Query("SELECT u FROM User u LEFT JOIN FETCH u.roles WHERE u.id = ?1")
Optional<User> findByIdWithRoles(Long id);
```

### Caching Strategy

```java
@Cacheable(value = "users", key = "#id")
public UserResponse getUserById(Long id) { }

@CacheEvict(value = "users", key = "#id")
public void updateUser(Long id, UpdateUserRequest request) { }
```

### Pagination

```java
Page<UserResponse> getUsers(Pageable pageable) {
    return userRepository.findAll(pageable)
        .map(userMapper::toResponse);
}
```

---

## 📚 API Documentation

### Access Swagger UI

```
http://localhost:8080/api/swagger-ui.html
```

### OpenAPI Spec

```
http://localhost:8080/api/v3/api-docs
```

### Endpoint documentation

Add annotations to controllers:

```java
@PostMapping
@Operation(summary = "Create new user", description = "Register a new user account")
@ApiResponse(responseCode = "201", description = "User created successfully")
@ApiResponse(responseCode = "400", description = "Invalid input")
public ApiResponse<UserResponse> createUser(@Valid @RequestBody CreateUserRequest request) { }
```

---

## 🔄 CI/CD Integration

### GitHub Actions

Workflows in `.github/workflows/`:
- Build & Test on every push
- Code coverage reporting
- Docker image build
- Automated deployment

## 📞 Getting Help

- **Documentation**: Check [docs/](../../docs/) folder
- **Code Comments**: Each package has detailed documentation
- **Swagger UI**: Interactive API exploration
- **Logs**: Enable debug logging for troubleshooting

---

## ✅ Checklist for New Developers

- [ ] Java 21 installed and verified
- [ ] Maven 3.8.1+ installed and verified
- [ ] PostgreSQL installed and running
- [ ] Repository cloned
- [ ] Dependencies installed: `mvn clean install`
- [ ] Database created: `createdb commercehub`
- [ ] Application runs: `mvn spring-boot:run`
- [ ] Swagger UI accessible: `http://localhost:8080/api/swagger-ui.html`
- [ ] Tests pass: `mvn test`

---

## 🎯 Next Steps

1. ✅ Backend Setup Complete
2. ⬜ Implement Database Schema & Entities
3. ⬜ Implement JWT Authentication
4. ⬜ Implement Product Module
5. ⬜ Implement Order Module
6. ⬜ Integrate Payment Gateway
7. ⬜ Create Admin Dashboard APIs
8. ⬜ Build Angular Frontend
9. ⬜ Containerize with Docker
10. ⬜ Deploy to Kubernetes

---

## 📄 License

Apache License 2.0 - See [LICENSE](../../LICENSE)

---

**Happy Coding! 🚀**
