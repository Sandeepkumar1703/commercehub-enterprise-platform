# CommerceHub Platform - Architecture & Project Structure

## 🏗️ Project Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                                   │
│                   Angular 20 + Material Design                          │
└──────────────────────────────────────┬──────────────────────────────────┘
                                       │ HTTP/REST
                                       ↓
┌──────────────────────────────────────────────────────────────────────────┐
│                     API GATEWAY / LOAD BALANCER                          │
│                  (Later: Spring Cloud Gateway)                           │
└──────────────────────────────────────┬──────────────────────────────────┘
                                       │
                                       ↓
┌──────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                               │
│        @RestController - REST Endpoints, Request Validation             │
│  /api/users  /api/products  /api/orders  /api/payments                  │
└──────────────────────────────────────┬──────────────────────────────────┘
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        │                              │                              │
        ↓                              ↓                              ↓
┌─────────────────┐       ┌──────────────────────┐       ┌─────────────────┐
│  SECURITY LAYER │       │   EXCEPTION HANDLER  │       │    LOGGING      │
│                 │       │  @RestControllerAdv  │       │     AOP         │
│ • JWT Filter    │       │  Global Error Handle │       │   Interceptor   │
│ • Auth Manager  │       │  Custom Exceptions   │       │   Metrics       │
│ • Spring Sec.   │       │  ApiResponse Wrapper │       │   Tracing       │
└─────────────────┘       └──────────────────────┘       └─────────────────┘
        │
        ↓
┌──────────────────────────────────────────────────────────────────────────┐
│                       DTO / MAPPER LAYER                                 │
│    MapStruct - Type-safe Entity ↔ DTO Conversion (Compile-time)         │
│                                                                           │
│  CreateUserRequest → [UserMapper] → User Entity                         │
│  User Entity → [UserMapper] → UserResponse                              │
└──────────────────────────────────────┬──────────────────────────────────┘
                                       │
                                       ↓
┌──────────────────────────────────────────────────────────────────────────┐
│                      SERVICE LAYER (Business Logic)                      │
│        @Service - Transaction Management, Business Rules                │
│                                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │
│  │   UserServ.  │  │ ProductServ. │  │  OrderServ.  │  ...            │
│  └──────────────┘  └──────────────┘  └──────────────┘                  │
│                                                                           │
│  • Data Validation        • Transactions        • Caching               │
│  • Authorization Checks   • Event Publishing    • Retry Logic           │
│  • Email Notifications    • Integration Calls   • Error Handling        │
└──────────────────────────────────────┬──────────────────────────────────┘
                                       │
                                       ↓
┌──────────────────────────────────────────────────────────────────────────┐
│                     REPOSITORY LAYER (Data Access)                       │
│  Spring Data JPA - CRUD Operations, Custom Queries                      │
│                                                                           │
│  UserRepository extends JpaRepository<User, Long>                       │
│  • findByEmail(String email)                                            │
│  • findByRoleId(Long roleId)                                            │
│  • Custom @Query methods                                                │
└──────────────────────────────────────┬──────────────────────────────────┘
                                       │
                                       ↓
┌──────────────────────────────────────────────────────────────────────────┐
│                    PERSISTENCE LAYER (ORM - Hibernate)                   │
│         JPA Entities - Database Model Objects Mapping                   │
│                                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │     User     │  │    Product   │  │     Order    │  │  Payment   │  │
│  │  @Entity     │  │   @Entity    │  │   @Entity    │  │  @Entity   │  │
│  │              │  │              │  │              │  │            │  │
│  │ • id         │  │ • id         │  │ • id         │  │ • id       │  │
│  │ • email      │  │ • name       │  │ • userId     │  │ • orderId  │  │
│  │ • password   │  │ • price      │  │ • totalAmount│  │ • amount   │  │
│  │ • roles      │  │ • inventory  │  │ • items      │  │ • status   │  │
│  │ • address    │  │ • category   │  │ • status     │  │ • txnId    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  └────────────┘  │
└──────────────────────────────────────┬──────────────────────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         │                             │                             │
         ↓                             ↓                             ↓
    ┌─────────┐                  ┌──────────┐                  ┌─────────┐
    │ Database│                  │  Cache   │                  │ Message │
    │PostgreSQL               │   Redis   │                  │  Kafka  │
    ├─────────┤                  ├──────────┤                  ├─────────┤
    │ • Users │                  │ Sessions │                  │ Events  │
    │ • Roles │                  │ User Data│                  │ Topics  │
    │ • Prods │                  │ Queries  │                  │ Publishers
    │ • Order │                  │ Settings │                  │ Consumers
    │ • Inv.  │                  │ Rankings │                  │ Streams │
    └─────────┘                  └──────────┘                  └─────────┘
     Persistent                  In-Memory              Asynchronous Events
     Storage                      Cache Layer           Message Broker
```

---

## 📦 Detailed Layered Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    HTTP REQUEST LAYER                           │
│                                                                  │
│  POST /api/users                                               │
│  Content-Type: application/json                                │
│  Authorization: Bearer <JWT_TOKEN>                             │
│                                                                  │
│  {                                                              │
│    "email": "user@example.com",                                │
│    "password": "securepassword"                                │
│  }                                                              │
└───────────────────────────┬─────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│              FILTER LAYER - JWT Authentication                  │
│                                                                  │
│  JwtAuthenticationFilter                                        │
│  ├─ Extract JWT from Authorization header                      │
│  ├─ Validate JWT signature & expiration                        │
│  ├─ Load user from token                                       │
│  └─ Set Security Context                                       │
└───────────────────────────┬─────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│           CONTROLLER LAYER - Request Handling                   │
│                                                                  │
│  @RestController                                               │
│  @RequestMapping("/api/users")                                 │
│  public class UserController {                                 │
│                                                                  │
│    @PostMapping                                                │
│    public ApiResponse<UserResponse> createUser(                │
│        @Valid @RequestBody CreateUserRequest request) {        │
│      return ApiResponse.success(userService.createUser(req));  │
│    }                                                            │
│  }                                                              │
│                                                                  │
│  ✓ @Valid - Triggers validation                               │
│  ✓ Returns standardized ApiResponse                            │
└───────────────────────────┬─────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│        VALIDATION LAYER - Input Validation                      │
│                                                                  │
│  @NotNull email                                                │
│  @ValidEmail email                                             │
│  @Email email                                                  │
│  @Length(min=3, max=50) email                                  │
│  @NotBlank password                                            │
│  @Length(min=8) password                                       │
│                                                                  │
│  If validation fails:                                          │
│  HTTP 400 Bad Request with error details                       │
└───────────────────────────┬─────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│        DTO MAPPING LAYER - Request Object Conversion            │
│                                                                  │
│  CreateUserRequest (from JSON)                                 │
│         ↓                                                        │
│  UserMapper.toEntity(request)  (MapStruct)                     │
│         ↓                                                        │
│  User entity (ready for persistence)                           │
│                                                                  │
│  MapStruct generates this code at COMPILE TIME!                │
└───────────────────────────┬─────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│      SERVICE LAYER - Business Logic & Transactions              │
│                                                                  │
│  @Service                                                       │
│  @Transactional  // All operations atomic                      │
│  public class UserServiceImpl implements UserService {          │
│                                                                  │
│    public UserResponse createUser(CreateUserRequest req) {    │
│      // 1. Check if user exists                               │
│      if(userRepository.findByEmail(req.getEmail()).isPresent())│
│        throw new UserAlreadyExistsException();                │
│                                                                  │
│      // 2. Encrypt password                                   │
│      String encPassword = passwordEncoder.encode(req.Pass());│
│                                                                  │
│      // 3. Create entity                                      │
│      User user = User.builder()                               │
│        .email(req.getEmail())                                 │
│        .password(encPassword)                                 │
│        .build();                                              │
│                                                                  │
│      // 4. Save to database                                  │
│      User saved = userRepository.save(user);                 │
│                                                                  │
│      // 5. Return response                                   │
│      return userMapper.toResponse(saved);                    │
│    }                                                            │
│  }                                                              │
│                                                                  │
│  ✓ All business rules validated                               │
│  ✓ Transactional - atomic operations                          │
│  ✓ Logging & monitoring enabled                               │
│  ✓ Can use caching, async calls, etc.                         │
└───────────────────────────┬─────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│   REPOSITORY LAYER - Data Access Abstraction (JPA)              │
│                                                                  │
│  public interface UserRepository                               │
│    extends JpaRepository<User, Long> {                          │
│    Optional<User> findByEmail(String email);                   │
│    List<User> findByRoleId(Long roleId);                       │
│  }                                                              │
│                                                                  │
│  Spring Data JPA:                                              │
│  ✓ Generates SQL automatically                                │
│  ✓ Provides CRUD: save, findById, update, delete              │
│  ✓ Pagination & sorting                                       │
│  ✓ Custom queries via method names                            │
│                                                                  │
│  userRepository.save(user) generates:                          │
│  INSERT INTO users (email, password) VALUES (?, ?)            │
└───────────────────────────┬─────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│   PERSISTENCE LAYER - Hibernate ORM (Entity Manager)            │
│                                                                  │
│  @Entity                                                        │
│  @Table(name = "users")                                        │
│  public class User {                                           │
│    @Id                                                          │
│    @GeneratedValue(strategy = GenerationType.IDENTITY)         │
│    private Long id;                                            │
│                                                                  │
│    @Column(unique = true, nullable = false)                    │
│    private String email;                                       │
│                                                                  │
│    @ManyToMany                                                 │
│    @JoinTable(...)                                             │
│    private Set<Role> roles;                                    │
│  }                                                              │
│                                                                  │
│  Hibernate:                                                     │
│  ✓ Maps Java objects to database tables                       │
│  ✓ Lazy/eager loading                                         │
│  ✓ Relationship management                                    │
│  ✓ Lifecycle hooks                                            │
└───────────────────────────┬─────────────────────────────────────┘
                            ↓
              ┌─────────────────────────────┐
              ↓                             ↓
         ┌──────────────┐           ┌──────────────┐
         │  PostgreSQL  │           │ Transaction  │
         │  Database    │           │  Manager     │
         ├──────────────┤           ├──────────────┤
         │ INSERT user  │           │ COMMIT/      │
         │ record into  │           │ ROLLBACK     │
         │ users table  │           │              │
         └──────────────┘           └──────────────┘
                            
              RESPONSE FLOW (Bottom-Up)
                            ↑
┌─────────────────────────────────────────────────────────────────┐
│        RESPONSE DTO MAPPING - Convert Entity to DTO             │
│                                                                  │
│  User entity (from database)                                   │
│         ↓                                                        │
│  UserMapper.toResponse(user)  (MapStruct)                      │
│         ↓                                                        │
│  UserResponse (safe for API response)                          │
│  ├─ id                                                          │
│  ├─ email                                                       │
│  ├─ roles                                                       │
│  └─ createdAt                                                   │
│  (password NOT included - security!)                           │
└───────────────────────────┬─────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│      RESPONSE WRAPPER - Standard API Response Format            │
│                                                                  │
│  {                                                              │
│    "success": true,                                            │
│    "statusCode": 201,                                          │
│    "message": "User created successfully",                     │
│    "data": {                                                    │
│      "id": 1,                                                   │
│      "email": "user@example.com",                              │
│      "roles": ["USER"],                                        │
│      "createdAt": "2024-01-15T10:30:00Z"                       │
│    }                                                            │
│  }                                                              │
└───────────────────────────┬─────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                   HTTP RESPONSE LAYER                           │
│                                                                  │
│  HTTP 201 Created                                              │
│  Content-Type: application/json                                │
│  Location: /api/users/1                                        │
│                                                                  │
│  Body: { ... JSON response ... }                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request/Response Flow Summary

```
CLIENT REQUEST
    ↓
[JWT Authentication Filter]
    ↓
[Route to Controller]
    ↓
[Request Validation]
    ↓
[DTO → Entity Mapping]
    ↓
[Service Business Logic]
    ↓
[Repository Database Query]
    ↓
[Hibernate SQL Execution]
    ↓
[PostgreSQL Database]
    ↓ (Response Back)
[Entity → DTO Mapping]
    ↓
[Wrap in ApiResponse]
    ↓
[HTTP Response (JSON)]
    ↓
CLIENT RESPONSE
```

---

## 📁 Project Structure Tree

```
commercehub-enterprise-platform/
│
├── 📂 backend/
│   ├── 📂 src/main/java/com/commercehub/backend/
│   │   ├── 📂 config/                    # Spring Configuration
│   │   │   ├── AppConfig.java
│   │   │   ├── SecurityConfig.java
│   │   │   ├── JpaConfig.java
│   │   │   ├── CacheConfig.java
│   │   │   └── KafkaConfig.java
│   │   │
│   │   ├── 📂 controller/                # REST Controllers
│   │   │   ├── UserController.java
│   │   │   ├── ProductController.java
│   │   │   ├── OrderController.java
│   │   │   └── PaymentController.java
│   │   │
│   │   ├── 📂 service/                   # Business Logic
│   │   │   ├── UserService.java (interface)
│   │   │   ├── UserServiceImpl.java
│   │   │   ├── ProductService.java
│   │   │   ├── ProductServiceImpl.java
│   │   │   ├── OrderService.java
│   │   │   └── OrderServiceImpl.java
│   │   │
│   │   ├── 📂 repository/                # Data Access
│   │   │   ├── UserRepository.java
│   │   │   ├── ProductRepository.java
│   │   │   ├── OrderRepository.java
│   │   │   └── OrderItemRepository.java
│   │   │
│   │   ├── 📂 entity/                    # JPA Entities
│   │   │   ├── BaseEntity.java           # Abstract base
│   │   │   ├── User.java
│   │   │   ├── Product.java
│   │   │   ├── Category.java
│   │   │   ├── Order.java
│   │   │   ├── OrderItem.java
│   │   │   ├── Payment.java
│   │   │   ├── Role.java
│   │   │   └── Inventory.java
│   │   │
│   │   ├── 📂 dto/                       # Data Transfer Objects
│   │   │   ├── ApiResponse.java          # Standard response wrapper
│   │   │   ├── PageResponse.java         # Pagination wrapper
│   │   │   ├── UserResponse.java
│   │   │   ├── CreateUserRequest.java
│   │   │   ├── UpdateUserRequest.java
│   │   │   ├── ProductResponse.java
│   │   │   ├── CreateProductRequest.java
│   │   │   ├── OrderResponse.java
│   │   │   └── CreateOrderRequest.java
│   │   │
│   │   ├── 📂 mapper/                    # MapStruct Mappers
│   │   │   ├── UserMapper.java
│   │   │   ├── ProductMapper.java
│   │   │   └── OrderMapper.java
│   │   │
│   │   ├── 📂 security/                  # JWT & Security
│   │   │   ├── JwtTokenProvider.java
│   │   │   ├── JwtAuthenticationFilter.java
│   │   │   ├── JwtAuthenticationEntryPoint.java
│   │   │   └── CustomUserDetailsService.java
│   │   │
│   │   ├── 📂 exception/                 # Exception Handling
│   │   │   ├── GlobalExceptionHandler.java
│   │   │   ├── ResourceNotFoundException.java
│   │   │   ├── UnauthorizedException.java
│   │   │   ├── ValidationException.java
│   │   │   └── ApiError.java
│   │   │
│   │   ├── 📂 validation/                # Custom Validators
│   │   │   ├── EmailValidator.java
│   │   │   ├── PhoneValidator.java
│   │   │   ├── ValidEmail.java (annotation)
│   │   │   └── ValidPhone.java (annotation)
│   │   │
│   │   ├── 📂 filter/                    # HTTP Filters
│   │   │   ├── JwtAuthenticationFilter.java
│   │   │   ├── LoggingFilter.java
│   │   │   └── RequestIdFilter.java
│   │   │
│   │   ├── 📂 util/                      # Utility Classes
│   │   │   ├── DateTimeUtils.java
│   │   │   ├── PaginationUtils.java
│   │   │   ├── CacheKeyUtil.java
│   │   │   └── StringUtils.java
│   │   │
│   │   ├── 📂 constant/                  # Constants
│   │   │   ├── AppConstants.java
│   │   │   ├── ErrorConstants.java
│   │   │   ├── CacheConstants.java
│   │   │   └── SecurityConstants.java
│   │   │
│   │   └── CommerceHubApplication.java # Entry Point
│   │
│   ├── 📂 src/main/resources/
│   │   ├── application.yml              # Base config
│   │   ├── application-dev.yml          # Dev profile
│   │   ├── application-prod.yml         # Prod profile
│   │   └── 📂 db/migration/
│   │       ├── V1__create_users_table.sql
│   │       ├── V2__create_products_table.sql
│   │       ├── V3__create_orders_table.sql
│   │       └── V4__create_relationships.sql
│   │
│   ├── 📂 src/test/
│   │   ├── 📂 java/com/commercehub/backend/
│   │   │   ├── service/UserServiceImplTest.java
│   │   │   ├── controller/UserControllerTest.java
│   │   │   ├── repository/UserRepositoryTest.java
│   │   │   └── security/JwtTokenProviderTest.java
│   │   └── 📂 resources/
│   │       └── application-test.yml
│   │
│   ├── pom.xml                          # Maven Configuration
│   ├── PROJECT_STRUCTURE.md             # Structure Documentation
│   ├── POM_DOCUMENTATION.md             # Dependencies Explained
│   ├── README.md                        # Backend Guide
│   └── .gitignore
│
├── 📂 frontend/                         # Angular Application (Placeholder)
│   └── 📂 commercehub-ui/
│
├── 📂 infrastructure/
│   ├── 📂 docker/
│   │   ├── Dockerfile                   # Spring Boot image
│   │   └── Dockerfile.frontend          # Angular image
│   ├── 📂 kubernetes/
│   │   ├── namespace.yaml
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── ingress.yaml
│   │   └── configmap.yaml
│   └── 📂 terraform/
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
│
├── 📂 docs/
│   ├── Architecture.md
│   ├── ER-Diagram.md
│   ├── API.md
│   └── Deployment.md
│
├── 📂 scripts/
│   ├── start.sh
│   ├── stop.sh
│   └── deploy.sh
│
├── 📂 .github/workflows/
│   ├── build.yml
│   ├── test.yml
│   └── deploy.yml
│
├── docker-compose.yml                  # Local Development Stack
├── README.md                           # Root Documentation
├── SETUP_SUMMARY.md                    # This Setup Summary
├── .gitignore                          # Git Ignore Rules
└── LICENSE                             # Apache 2.0
```

---

## 🔐 Security Architecture

```
┌────────────────────────────────────────────────┐
│            CLIENT REQUEST                      │
│  Authorization: Bearer eyJhbGciOiJIUzI1...    │
└────────────────┬─────────────────────────────┘
                 │
                 ↓
┌────────────────────────────────────────────────┐
│     JWT Authentication Filter                  │
│                                                 │
│ 1. Extract JWT from Authorization header      │
│ 2. Validate JWT signature with SECRET         │
│ 3. Check token expiration                     │
│ 4. Load user claims from token                │
│ 5. Set SecurityContext                        │
└────────────────┬─────────────────────────────┘
                 │
                 ↓
       ┌─────────────────────┐
       │ Token Valid?        │
       └────┬────────────┬───┘
            │           │
           YES          NO
            │           │
            ↓           ↓
       ┌───────┐   ┌──────────────────┐
       │Allowed│   │ Unauthorized 401 │
       │       │   │ (Exception)       │
       └───┬───┘   └───────┬──────────┘
           │               │
           ↓               ↓
    [Continue to      [GlobalExceptionHandler]
     Spring Sec.]         │
           │               ↓
           ↓          ┌──────────────┐
    @PreAuthorize     │Return Error  │
    Check Roles       │Response JSON │
           │          └──────────────┘
           ↓
    ┌───────────────┐
    │  Has Role?    │
    └────┬──────┬──┘
         │      │
        YES    NO
         │      │
         ↓      ↓
       ┌──┐  ┌──────────────────────┐
       │OK│  │ Forbidden 403        │
       │  │  │ (GlobalExceptionHandle)
       └┬─┘  └──────────────────────┘
        │
        ↓
    [Execute Controller Method]
        │
        ↓ (Success or Exception)
    [Return Response or Error]
```

---

## 💾 Data Flow - Create User Example

```
1. CLIENT SENDS REQUEST
   ─────────────────────────────
   POST /api/users
   Content-Type: application/json
   Authorization: Bearer <JWT>
   
   {
     "email": "john@example.com",
     "password": "SecurePass123!",
     "firstName": "John",
     "lastName": "Doe"
   }

2. JWT FILTER VALIDATES TOKEN
   ─────────────────────────────
   ✓ Extract JWT
   ✓ Verify signature
   ✓ Check expiration
   ✓ Load user ID from token

3. REQUEST ROUTE & VALIDATION
   ─────────────────────────────
   ✓ Spring Dispatcher Servlet routes to UserController
   ✓ @Valid annotation triggers validation
   ✓ @Email on email field - validate format
   ✓ @NotBlank on password - ensure not empty
   ✓ @Length(min=8) on password - check length

4. DTO → ENTITY MAPPING
   ─────────────────────────────
   CreateUserRequest (DTO)
   {
     email: "john@example.com",
     password: "SecurePass123!",
     firstName: "John",
     lastName: "Doe"
   }
   
   ↓ UserMapper.toEntity(request)
   
   User (Entity) - ready for database

5. SERVICE BUSINESS LOGIC
   ─────────────────────────────
   UserServiceImpl.createUser(request):
   
   a) Check if email exists:
      userRepository.findByEmail("john@example.com")
      if exists → throw UserAlreadyExistsException
   
   b) Encrypt password:
      encryptedPassword = passwordEncoder.encode("SecurePass123!")
      → bcrypt hash: $2a$10$abcd1234...
   
   c) Assign default role:
      Set role = ROLE_USER
   
   d) Create entity:
      user = User.builder()
        .email("john@example.com")
        .password("$2a$10$abcd1234...")
        .firstName("John")
        .lastName("Doe")
        .roles(Set.of(roleRepository.findByName("ROLE_USER")))
        .createdAt(LocalDateTime.now())
        .build()
   
   e) Log activity:
      logger.info("Creating user with email: {}", "john@example.com")

6. REPOSITORY → DATABASE
   ─────────────────────────────
   userRepository.save(user)
   ↓
   Spring Data JPA generates SQL:
   INSERT INTO users (email, password, first_name, last_name, created_at)
   VALUES ($1, $2, $3, $4, $5)
   
   ↓ Hibernate + PostgreSQL
   
   ✓ User record inserted with ID = 123

7. RESPONSE ENTITY → DTO
   ─────────────────────────────
   User (Entity from DB)
   {
     id: 123,
     email: "john@example.com",
     password: "$2a$10$abcd1234...",
     firstName: "John",
     lastName: "Doe",
     roles: [Role(id: 2, name: "ROLE_USER")],
     createdAt: "2024-01-15T10:30:00"
   }
   
   ↓ userMapper.toResponse(user)
   
   UserResponse (DTO - safe for API)
   {
     id: 123,
     email: "john@example.com",
     firstName: "John",
     lastName: "Doe",
     roles: ["ROLE_USER"],
     createdAt: "2024-01-15T10:30:00"
   }
   ← Note: password is NOT included (security)

8. WRAP IN STANDARD RESPONSE
   ─────────────────────────────
   ApiResponse<UserResponse>
   {
     "success": true,
     "statusCode": 201,
     "message": "User created successfully",
     "data": {
       "id": 123,
       "email": "john@example.com",
       "firstName": "John",
       "lastName": "Doe",
       "roles": ["ROLE_USER"],
       "createdAt": "2024-01-15T10:30:00"
     },
     "errors": null,
     "timestamp": "2024-01-15T10:30:45.123Z"
   }

9. HTTP RESPONSE SENT
   ─────────────────────────────
   HTTP/1.1 201 Created
   Content-Type: application/json
   Location: /api/users/123
   
   {
     "success": true,
     "statusCode": 201,
     ...
   }

10. TRANSACTION COMMITTED
    ─────────────────────────────
    ✓ @Transactional annotation ensures:
      - All or nothing execution
      - If any step fails → ROLLBACK
      - If all succeed → COMMIT to PostgreSQL
```

---

## 🔄 Architecture Principles

### 1. Separation of Concerns
```
Each layer has ONE responsibility:
Controller    → HTTP handling
Service       → Business logic
Repository    → Data access
Entity        → Database mapping
DTO           → API contract
```

### 2. Dependency Inversion
```
Don't depend on concrete classes,
depend on interfaces/abstractions

❌ new UserServiceImpl()
✅ @Autowired UserService userService
```

### 3. Single Responsibility
```
One class = one reason to change

❌ UserController handles auth, validation, business logic
✅ UserController routes, UserService handles logic
```

### 4. Don't Repeat Yourself (DRY)
```
Utilities    → Common methods
Constants    → Fixed values
Config       → Bean definitions
Mappers      → Conversion logic
```

---

## 📊 Technology Stack Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                            │
│                 (Browser / Mobile App)                       │
│                 - Angular 20                                 │
│                 - Material Design                            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTP/REST/JSON
                           ↓
┌──────────────────────────────────────────────────────────────┐
│                  SPRING BOOT APPLICATION                      │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ Spring Framework 6.x                                   │  │
│ │ ├─ Spring Web MVC (REST Controllers)                  │  │
│ │ ├─ Spring Security (JWT, Auth, RBAC)                │  │
│ │ ├─ Spring Data JPA (Repository Pattern)             │  │
│ │ ├─ Spring Cache (Redis Integration)                 │  │
│ │ ├─ Spring Kafka (Event Streaming)                   │  │
│ │ ├─ Spring AOP (Cross-cutting Concerns)              │  │
│ │ └─ Spring Actuator (Monitoring)                     │  │
│ ├─ Apache Tomcat (Embedded Web Server)                │  │
│ ├─ Hibernate/JPA (ORM)                                │  │
│ ├─ Jackson (JSON Processing)                          │  │
│ ├─ SLF4J/Logback (Logging)                            │  │
│ ├─ MapStruct (DTO Mapping)                            │  │
│ ├─ Lombok (Code Generation)                           │  │
│ └─ SpringDoc/OpenAPI (API Documentation)              │  │
│ └─ JJWT (JWT Tokens)                                  │  │
│ └─ Flywayb (Database Migrations)                      │  │
│ └─ Other Dependencies...                               │  │
│ ────────────────────────────────────────────────────── │  │
│                  JAVA 21 JVM                           │  │
│ ────────────────────────────────────────────────────── │  │
│                  MAVEN BUILD TOOL                      │  │
│ ────────────────────────────────────────────────────── │  │
│                  TESTING FRAMEWORKS                    │  │
│ ├─ JUnit 5 (Test Runner)                             │  │
│ ├─ Mockito (Mocking)                                 │  │
│ ├─ TestContainers (Integration Testing)              │  │
│ ├─ REST Assured (API Testing)                        │  │
│ └─ H2 Database (In-Memory DB)                        │  │
│ ────────────────────────────────────────────────────── │  │
└──────────────────────────┬───────────────────────────────┘
                          ├─────┬─────┬──────┐
                          ↓     ↓     ↓      ↓
                       ┌──┐ ┌──┐ ┌──┐ ┌──┐
                       │DB│ │CA│ │MQ│ │NO│
                       ├──┤ ├──┤ ├──┤ ├──┤
                       │PG│ │RD│ │KA│ │OR│
                       │SQ│ │IS│ │FK│ │MA│
                       │  │ │  │ │  │ │LI│
                       └──┘ └──┘ └──┘ └──┘
```

---

This document provides a comprehensive visual understanding of the entire system architecture, project structure, and data flow. It should be reviewed alongside the detailed documentation files.

