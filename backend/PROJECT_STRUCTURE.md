# CommerceHub Backend - Project Structure

## Overview
This document explains the complete project structure and the purpose of each folder/file.

---

## 📁 Root Directory: `/backend`

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/commercehub/backend/
│   │   └── resources/
│   └── test/
│       ├── java/com/commercehub/backend/
│       └── resources/
├── pom.xml
├── .gitignore
└── PROJECT_STRUCTURE.md
```

---

## 📂 Source Code Structure: `src/main/java/com/commercehub/backend`

### 1. **`config/`** - Configuration Classes
**Purpose**: Spring Boot configuration beans and application-wide settings.

**Contains**:
- `AppConfig.java` - Bean definitions, global configurations
- `SecurityConfig.java` - Spring Security configuration
- `JpaConfig.java` - JPA/Hibernate settings
- `CacheConfig.java` - Redis cache configuration
- `KafkaConfig.java` - Kafka producer/consumer configuration
- `CorsConfig.java` - CORS policy configuration

**Why**: Centralizes all Spring configuration in one place, following the Single Responsibility Principle.

---

### 2. **`entity/`** - JPA Entities
**Purpose**: Database entity classes representing domain objects mapped to tables.

**Contains**:
- `User.java` - User entity
- `Product.java` - Product entity
- `Order.java` - Order entity
- `OrderItem.java` - Order line items
- `Category.java` - Product categories
- `Inventory.java` - Stock management
- `Payment.java` - Payment records
- `Role.java` - User roles
- `BaseEntity.java` - Abstract base class with common fields

**Why**: Separates persistence layer from business logic. All entities inherit from `BaseEntity` to reduce code duplication.

---

### 3. **`dto/`** - Data Transfer Objects
**Purpose**: Houses all DTOs used for API requests/responses.

**Contains**:
- `*Request.java` - API request DTOs (e.g., `CreateUserRequest.java`)
- `*Response.java` - API response DTOs (e.g., `UserResponse.java`)
- `ApiResponse.java` - Standardized API response wrapper
- `PageResponse.java` - Pagination response wrapper

**Why**:
- Never expose entities directly to clients
- Provides a contract for API consumers
- Easy to add/remove fields without affecting database schema
- Enables DTO validation at the boundary

---

### 4. **`mapper/`** - MapStruct Mappers
**Purpose**: Compile-time safe DTO ↔ Entity mapping.

**Contains**:
- `*Mapper@Mapper` interfaces (e.g., `UserMapper.java`)

**Why**:
- MapStruct generates boilerplate mapping code at compile time
- Type-safe, no reflection overhead
- Easy to maintain and test
- Better performance than manual mapping

**Example**:
```java
@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toResponse(User user);
    User toEntity(CreateUserRequest request);
}
```

---

### 5. **`repository/`** - Data Access Layer
**Purpose**: Spring Data JPA repositories for database operations.

**Contains**:
- `*Repository extends JpaRepository<Entity, ID>` interfaces (e.g., `UserRepository.java`)

**Why**:
- Abstracts database operations
- Provides CRUD operations out of the box
- Enables custom query methods with method naming conventions
- Follows Repository Pattern

**Example**:
```java
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRoleId(Long roleId);
}
```

---

### 6. **`service/`** - Business Logic Layer
**Purpose**: Contains the application's business logic.

**Contains**:
- `*Service.java` interfaces (e.g., `UserService.java`)
- `*ServiceImpl.java` implementations (e.g., `UserServiceImpl.java`)

**Why**:
- Encapsulates business rules
- Promotes testability (can mock dependencies)
- Enables code reuse across controllers
- Follows Single Responsibility Principle

**Pattern**:
```java
@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public UserResponse createUser(CreateUserRequest request) {
        // Business logic here
    }
}
```

---

### 7. **`controller/`** - REST API Endpoints
**Purpose**: Handles HTTP requests and delegates to services.

**Contains**:
- `*Controller.java` (e.g., `UserController.java`)

**Why**:
- Thin layer that receives HTTP requests
- Delegates to service layer
- Returns standardized responses
- Handles request/response mapping

**Pattern**:
```java
@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    
    @PostMapping
    public ApiResponse<UserResponse> createUser(@Valid @RequestBody CreateUserRequest request) {
        return ApiResponse.success(userService.createUser(request));
    }
}
```

---

### 8. **`exception/`** - Exception Handling
**Purpose**: Custom exceptions and global exception handler.

**Contains**:
- `*Exception.java` custom exceptions (e.g., `ResourceNotFoundException.java`)
- `GlobalExceptionHandler.java` - `@RestControllerAdvice` for centralized error handling

**Why**:
- Consistent error responses across the application
- Meaningful error messages for clients
- Reduces duplicate try-catch blocks
- Follows Open/Closed Principle

**Example**:
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(new ApiError("NOT_FOUND", ex.getMessage()));
    }
}
```

---

### 9. **`security/`** - JWT & Authentication
**Purpose**: JWT token management, authentication filters, and security utilities.

**Contains**:
- `JwtTokenProvider.java` - Token generation and validation
- `JwtAuthenticationFilter.java` - JWT extraction and validation filter
- `JwtAuthenticationEntryPoint.java` - Handles auth failures
- `CustomUserDetailsService.java` - Loads user details from database

**Why**:
- Centralizes JWT logic
- Follows Single Responsibility
- Easy to test and maintain

---

### 10. **`validation/`** - Custom Validators
**Purpose**: Custom Bean Validation annotations.

**Contains**:
- `*Validator.java` implementations
- Custom annotations (e.g., `@ValidEmail.java`)

**Why**:
- Reusable validation logic
- Declarative validation using annotations
- Reduces validation code in DTOs

**Example**:
```java
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EmailValidator.class)
public @interface ValidEmail {
    String message() default "Invalid email format";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
```

---

### 11. **`util/`** - Utility Classes
**Purpose**: Helper classes with static or general-purpose methods.

**Contains**:
- `DateTimeUtils.java` - Date/time operations
- `StringUtils.java` - String operations (extends Apache Commons)
- `PaginationUtils.java` - Pagination helpers
- `CacheKeyUtil.java` - Cache key generation

**Why**:
- Reduces code duplication
- Centralizes common operations
- Easy to test and reuse

---

### 12. **`constant/`** - Constants
**Purpose**: Application-wide constants.

**Contains**:
- `AppConstants.java` - API paths, pagination defaults, etc.
- `ErrorConstants.java` - Error codes and messages
- `CacheConstants.java` - Cache key prefixes
- `SecurityConstants.java` - JWT secret, expiration times, etc.

**Why**:
- Single source of truth
- Easy to modify app-wide values
- Follows DRY principle

---

### 13. **`filter/`** - Servlet Filters
**Purpose**: HTTP-level filters for cross-cutting concerns.

**Contains**:
- `JwtAuthenticationFilter.java` - JWT token extraction
- `LoggingFilter.java` - Request/response logging
- `RequestIdFilter.java` - Unique request ID for tracing

**Why**:
- Executes before Spring Security filters
- Useful for logging and tracing
- Follows Interceptor Pattern

---

### 14. **`Application.java`** - Main Application Class
**Purpose**: Spring Boot application entry point.

**Contains**: `@SpringBootApplication` annotation and `main()` method.

---

## 📂 Resources: `src/main/resources`

### **`application.yml`**
Main application configuration file (profile-agnostic defaults).

### **`application-dev.yml`**
Development environment configuration (local database, debug logging).

### **`application-prod.yml`**
Production environment configuration (optimized settings, external services).

### **`db/migration/`**
Flyway migration scripts for database schema versioning.

**Example**: `V1__create_users_table.sql`

---

## 📂 Test Structure: `src/test`

### **`java/com/commercehub/backend/`**
Unit and integration tests mirror the main package structure.

**Examples**:
- `service/UserServiceImplTest.java`
- `controller/UserControllerTest.java`
- `repository/UserRepositoryTest.java`
- `security/JwtTokenProviderTest.java`

### **`resources/`**
Test configuration files and test data.

---

## 📋 Summary Table

| Folder | Purpose | Layer |
|--------|---------|-------|
| `config/` | Spring configuration | Framework |
| `entity/` | Database entities | Data |
| `dto/` | Data transfer objects | Boundary |
| `mapper/` | DTO ↔ Entity mapping | Adapter |
| `repository/` | Data access | Data |
| `service/` | Business logic | Business |
| `controller/` | HTTP endpoints | Presentation |
| `exception/` | Error handling | Framework |
| `security/` | JWT & Auth | Security |
| `validation/` | Custom validators | Validation |
| `util/` | Helper methods | Utility |
| `constant/` | App constants | Configuration |
| `filter/` | Servlet filters | Framework |

---

## 🏗️ Architectural Layers

```
┌─────────────────────────────┐
│   HTTP / REST / JSON        │
├─────────────────────────────┤
│   Controller (REST)         │ ← HTTP Requests/Responses
├─────────────────────────────┤
│   DTO / Mapper              │ ← Data transformation
├─────────────────────────────┤
│   Service (Business Logic)  │ ← Core business rules
├─────────────────────────────┤
│   Repository (Data Access)  │ ← Database operations
├─────────────────────────────┤
│   Entity / JPA              │ ← Database objects
├─────────────────────────────┤
│   PostgreSQL Database       │ ← Persistence
└─────────────────────────────┘
═════════════════════════════════════════════
↓
Security Layer (JWT, Authentication, Authorization)
↓
Exception Handler (Global error handling)
↓
Cross-cutting Concerns (Logging, Caching, etc.)
```

---

## 🎯 Design Principles Applied

1. **Layered Architecture**: Each layer has a specific responsibility
2. **Separation of Concerns**: DTOs separate API boundaries from entities
3. **Single Responsibility Principle**: Each class has one reason to change
4. **Dependency Inversion**: High-level modules depend on abstractions (interfaces)
5. **DRY (Don't Repeat Yourself)**: Common code goes to utils/config
6. **SOLID Principles**: Throughout the entire structure

---

## ✅ Next Steps

1. Create MySQL/PostgreSQL schema
2. Create Entity classes
3. Create DTO classes
4. Create Mapper interfaces
5. Create Repository interfaces
6. Create Service interfaces & implementations
7. Create Controller classes
8. Create Exception handlers
9. Implement JWT authentication
10. Write unit tests
