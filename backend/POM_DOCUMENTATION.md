# POM.xml - Maven Build Configuration

## Overview
This document explains every dependency and plugin in the `pom.xml` file for the CommerceHub Backend application.

---

## 📋 Project Metadata

```xml
<groupId>com.commercehub</groupId>
<artifactId>commercehub-backend</artifactId>
<version>1.0.0-SNAPSHOT</version>
<packaging>jar</packaging>
```

- **GroupId**: `com.commercehub` - Organization/company identifier
- **ArtifactId**: `commercehub-backend` - Project name
- **Version**: `1.0.0-SNAPSHOT` - Version with `-SNAPSHOT` suffix (development version)
- **Packaging**: `jar` - Executable JAR (embeds Tomcat server)

---

## 🔗 Parent POM

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.3.2</version>
</parent>
```

**Purpose**: Manages dependencies and plugins for Spring Boot projects.

**What it provides**:
- Default dependency versions for all Spring Boot starters
- Pre-configured Maven plugins (compiler, surefire, shade, etc.)
- Default build configuration

**Why**: Reduces boilerplate—we don't need to specify versions for most Spring dependencies.

---

## Properties

```xml
<properties>
    <java.version>21</java.version>
    <mapstruct.version>1.5.5.Final</mapstruct.version>
    <springdoc-openapi.version>2.3.0</springdoc-openapi.version>
    <jjwt.version>0.12.3</jjwt.version>
</properties>
```

**Purpose**: Define reusable variables for versions and configuration.

**Benefits**:
- Single source of truth for versions
- Easy to update versions globally
- Reduces duplicate XML

---

---

## 📦 Dependencies

### **Category 1: Spring Boot Starters** (Core Framework)

#### 1. **spring-boot-starter-web**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

**Purpose**: REST API development, embedded Tomcat server.

**Includes**:
- Spring MVC (Model-View-Controller)
- Embedded Apache Tomcat (no separate deployment needed)
- Jackson (JSON processing)
- Validation

**Why**: Required for building REST endpoints. The embedded Tomcat means we can run the app as a standalone JAR.

---

#### 2. **spring-boot-starter-data-jpa**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

**Purpose**: Object-Relational Mapping (ORM) with Hibernate.

**Includes**:
- Spring Data JPA (data access abstraction)
- Hibernate (JPA implementation)
- JDBC

**Why**: 
- Eliminates boilerplate SQL
- Provides repository pattern implementation
- Automatic CRUD operations
- HQL/JPQL query language

**How it simplifies code**:
```java
// With Spring Data JPA
List<User> users = userRepository.findByEmail(email);

// Without it, you'd write raw JDBC code
```

---

#### 3. **spring-boot-starter-security**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

**Purpose**: Authentication & Authorization framework.

**Provides**:
- User authentication (login)
- Role-based access control (RBAC)
- CSRF protection
- SQL injection prevention
- Secure password handling

**Why**: Essential for securing REST endpoints and protecting sensitive operations.

**Example**:
```java
@PreAuthorize("hasRole('ADMIN')")
@DeleteMapping("/{id}")
public void deleteUser(@PathVariable Long id) { }
```

---

#### 4. **spring-boot-starter-validation**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

**Purpose**: Input validation using Bean Validation (JSR-380) with Hibernate Validator.

**Provides**:
- Annotations like `@NotNull`, `@Email`, `@Min`, `@Max`, etc.
- Automatic validation of request/response objects
- Custom validators

**Why**:
- Prevents invalid data from entering the system
- Declarative validation (annotations)
- Automatic error messages

**Example**:
```java
@PostMapping
public UserResponse createUser(
    @Valid @RequestBody CreateUserRequest request) { }

// If request is invalid, Spring automatically returns 400 Bad Request
```

---

#### 5. **spring-boot-starter-data-redis**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

**Purpose**: Caching & session management with Redis.

**Includes**:
- Lettuce (Redis client)
- Spring Data Redis (abstraction)

**Why**:
- In-memory caching for performance
- Session persistence (for distributed systems)
- Cache invalidation support
- Reduces database load

**Example**:
```java
@Cacheable(value = "users", key = "#id")
public UserResponse getUserById(Long id) { }  // Cached after first call
```

---

#### 6. **spring-kafka**
```xml
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>
```

**Purpose**: Event streaming & asynchronous messaging.

**Provides**:
- Kafka producer (send events)
- Kafka consumer (receive events)
- Error handling
- Batch processing

**Why**:
- Decouples services (order service → payment service)
- Guarantees message delivery
- Enables event-driven architecture
- Scales to microservices

**Example**:
```java
// Producer (send event)
@Autowired private KafkaTemplate<String, OrderEvent> kafkaTemplate;
kafkaTemplate.send("order-events", orderEvent);

// Consumer (listen to events)
@KafkaListener(topics = "order-events")
public void handleOrderEvent(OrderEvent event) { }
```

---

#### 7. **spring-boot-starter-aop**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

**Purpose**: Aspect-Oriented Programming for cross-cutting concerns.

**Provides**:
- Logging aspects
- Performance monitoring
- Transaction management
- Security checks

**Why**:
- Separates cross-cutting concerns from business logic
- Reduces code duplication
- Easier to maintain

**Example**:
```java
@Aspect
@Component
public class LoggingAspect {
    @Before("execution(* com.commercehub.backend.service.*.*(..))")
    public void logMethodCall(JoinPoint joinPoint) {
        logger.info("Called: " + joinPoint.getSignature());
    }
}
```

---

#### 8. **spring-boot-starter-actuator**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

**Purpose**: Production-ready monitoring endpoints.

**Provides**:
- `/actuator/health` - Application health status
- `/actuator/metrics` - Application metrics
- `/actuator/prometheus` - Prometheus metrics export
- `/actuator/info` - Application info

**Why**:
- Essential for DevOps & monitoring
- Health checks for load balancers
- Performance metrics
- Enables operational awareness

**Example**:
```
GET http://localhost:8080/api/actuator/health
Response: { "status": "UP", ... }
```

---

#### 9. **spring-retry**
```xml
<dependency>
    <groupId>org.springframework.retry</groupId>
    <artifactId>spring-retry</artifactId>
</dependency>
```

**Purpose**: Automatic retry logic for failed operations.

**Provides**:
- Declarative retry with annotations
- Exponential backoff
- Error handling

**Why**:
- Handles transient failures (network glitches)
- Reduces manual retry code
- Improves resilience

**Example**:
```java
@Retryable(maxAttempts = 3, backoff = @Backoff(delay = 2000))
public void callExternalApi() { }
```

---

### **Category 2: Database & ORM**

#### 10. **PostgreSQL JDBC Driver**
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

**Purpose**: Java Database Connectivity (JDBC) for PostgreSQL.

**Why**:
- Required to connect to PostgreSQL database
- Runtime scope: only needed when running, not at compile time

---

#### 11. **Flyway**
```xml
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
</dependency>
```

**Purpose**: Database schema version control and migrations.

**Provides**:
- Automated database migrations (SQL scripts)
- Version tracking
- Rollback support

**Why**:
- Ensures database schema consistency
- Enables CI/CD automation
- Tracks schema evolution
- Prevents manual SQL execution errors

**Migration files**: `src/main/resources/db/migration/V1__create_users_table.sql`

**Alternative**: Liquibase (more powerful but more complex)

---

### **Category 3: Authentication & Security**

#### 12. **JJWT (JSON Web Token Library)**
```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
```

**Purpose**: JWT token generation and validation.

**Why**:
- Stateless authentication (no session storage needed)
- Perfect for REST APIs & microservices
- Secure token signing with secrets
- Embedded user claims

**How it works**:
1. User logs in → Server generates JWT
2. Client sends JWT in `Authorization` header
3. Server validates JWT signature
4. No database lookup needed each time

**Example JWT structure**:
```
Header: {"alg": "HS256", "typ": "JWT"}
Payload: {"userId": 123, "email": "user@example.com", "exp": 1234567890}
Signature: HMACSHA256(header.payload, secret)
```

---

#### 13. **Jasypt** (Java Simplified Encryption)
```xml
<dependency>
    <groupId>com.github.ulisesbocchio</groupId>
    <artifactId>jasypt-spring-boot-starter</artifactId>
    <version>3.0.5</version>
</dependency>
```

**Purpose**: Encrypt sensitive properties (passwords, API keys).

**Why**:
- Protects sensitive data in `application.yml`
- Passwords never stored in plain text
- Easy to decrypt at runtime

**Example**:
```yaml
database:
  password: ENC(aBcDeFgHiJ)  # Encrypted password
```

---

### **Category 4: DTO Mapping & Data Validation**

#### 14. **MapStruct**
```xml
<dependency>
    <groupId>org.mapstruct</groupId>
    <artifactId>mapstruct</artifactId>
    <version>1.5.5.Final</version>
</dependency>
```

**Purpose**: Compile-time bean mapping (DTO ↔ Entity conversion).

**Why**:
- Type-safe mapping
- Compile-time code generation (no reflection)
- Better performance than manual mapping
- Easy to maintain

**How it works**:
1. You define a mapper interface with `@Mapper`
2. MapStruct generates implementation at compile time
3. Spring wires it as a bean

**Example**:
```java
@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toResponse(User user);
    User toEntity(CreateUserRequest request);
}

// Generated code (by MapStruct):
// user.setId(request.getId());
// user.setEmail(request.getEmail());
// ...
```

**Alternative**: ModelMapper (reflection-based, slower)

---

### **Category 5: Lombok (Boilerplate Reduction)**

#### 15. **Lombok**
```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```

**Purpose**: Generates boilerplate code (getters, setters, constructors, etc.).

**Provides**:
- `@Getter` / `@Setter` - Auto-generate getters/setters
- `@AllArgsConstructor` - Constructor with all fields
- `@NoArgsConstructor` - No-arg constructor
- `@Data` - Combines @Getter, @Setter, @ToString, @EqualsAndHashCode, @RequiredArgsConstructor
- `@Slf4j` - Logger instance
- `@Builder` - Builder pattern

**Why**:
- Reduces code verbosity
- Focus on business logic, not boilerplate
- Less error-prone (IDEs often make mistakes with manual getters/setters)

**Example**:
```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Long id;
    private String email;
    private String password;
    // Lombok generates: getters, setters, toString(), equals(), hashCode()
}
```

**Without Lombok**, you'd write 50+ lines of boilerplate code.

---

### **Category 6: API Documentation & Swagger**

#### 16. **SpringDoc OpenAPI**
```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.3.0</version>
</dependency>
```

**Purpose**: Auto-generate OpenAPI 3.0 documentation and Swagger UI.

**Provides**:
- `/v3/api-docs` - OpenAPI spec in JSON
- `/swagger-ui.html` - Interactive API documentation
- Auto-discovery of endpoints, parameters, response types

**Why**:
- No manual documentation needed
- Updates automatically with code changes
- Great for frontend developers
- Essential for API contracts

**Access at**: `http://localhost:8080/api/swagger-ui.html`

**Alternative**: Springfox (older, less maintained)

---

### **Category 7: Utility Libraries**

#### 17. **Apache Commons Lang**
```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
    <version>3.14.0</version>
</dependency>
```

**Purpose**: Utility methods for String, Arrays, Reflection, etc.

**Provides**:
- `StringUtils.isEmpty()`, `StringUtils.isBlank()`
- `ArrayUtils.contains()`
- `NumberUtils.isParsable()`
- Better string manipulation

**Why**:
- Eliminates common utility code
- Handles null safely
- Battle-tested by thousands of projects

---

#### 18. **Apache Commons Collections**
```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-collections4</artifactId>
    <version>4.4</version>
</dependency>
```

**Purpose**: Enhanced Collection utilities beyond Java Collections Framework.

**Provides**:
- `CollectionUtils.isEmpty()`, `CollectionUtils.isNotEmpty()`
- Transformers, filters, predicates
- Bag, BidiMap, MultiMap

---

### **Category 8: Logging** (Included Automatically)

Spring Boot automatically includes:
- **SLF4J** (logging facade)
- **Logback** (SLF4J implementation)

**Why**:
- Unified logging interface
- Supports different backends (Logback, Log4j2, etc.)
- Structured logging

---

### **Category 9: JSON Processing** (Included Automatically)

- **Jackson**: JSON serialization/deserialization
- Included with `spring-boot-starter-web`
- Used by Spring MVC for request/response handling

---

### **Category 10: Development Tools**

#### 19. **Spring Boot DevTools**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>
```

**Purpose**: Hot reload during development.

**Features**:
- Auto-restarts app when files change
- Smart reload (preserves state when possible)
- Live reload for static resources

**Why**:
- Speeds up development
- No manual restart needed
- Improves developer productivity

---

### **Category 11: Testing**

#### 20. **Spring Boot Test Starter**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

**Includes**:
- **JUnit 5** - Testing framework
- **Mockito** - Mocking library
- **AssertJ** - Assertion library
- **RestAssured** - HTTP assertions
- **Spring Test** - Spring-specific test utilities

---

#### 21. **Spring Security Test**
```xml
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-test</artifactId>
    <scope>test</scope>
</dependency>
```

**Purpose**: Security testing utilities.

**Provides**:
- `@WithMockUser` - Mock authenticated users
- `@WithAnonymousUser` - Test anonymous access
- Security context setup

**Example**:
```java
@Test
@WithMockUser(roles = "ADMIN")
public void testAdminEndpoint() { }
```

---

#### 22. **Testcontainers**
```xml
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>testcontainers</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>postgresql</artifactId>
    <scope>test</scope>
</dependency>
```

**Purpose**: Docker containers for integration tests.

**Why**:
- Test with real PostgreSQL (not mocked)
- Isolated test environment
- Clean state for each test

**Example**:
```java
@Container
static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16")
    .withDatabaseName("test_commercehub");
```

---

#### 23. **H2 Database**
```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>test</scope>
</dependency>
```

**Purpose**: In-memory database for fast unit tests.

**Why**:
- Lightweight (no external process needed)
- Fast (in-memory)
- Compatible SQL syntax with PostgreSQL

**Use case**: Unit tests that don't need a real database.

---

#### 24. **REST Assured**
```xml
<dependency>
    <groupId>io.rest-assured</groupId>
    <artifactId>rest-assured</artifactId>
    <scope>test</scope>
</dependency>
```

**Purpose**: REST API testing library.

**Example**:
```java
RestAssured.given()
    .when()
    .get("/api/users/1")
    .then()
    .statusCode(200)
    .body("id", equalTo(1));
```

---

---

## 🔧 Build Plugins

### **1. spring-boot-maven-plugin**
```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
</plugin>
```

**Purpose**: Builds executable JAR with embedded Tomcat.

**Command**: `mvn package`

**Result**: `target/commercehub-backend-1.0.0-SNAPSHOT.jar` (runnable with `java -jar`)

---

### **2. maven-compiler-plugin**
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <configuration>
        <source>21</source>
        <target>21</target>
        <annotationProcessorPaths>
            <path>org.projectlombok:lombok</path>
            <path>org.mapstruct:mapstruct-processor</path>
        </annotationProcessorPaths>
    </configuration>
</plugin>
```

**Purpose**: Compiles Java code with annotation processors.

**Key configs**:
- `source: 21` / `target: 21` - Java 21 compilation
- `annotationProcessorPaths`: Lombok and MapStruct generate code during compilation

---

### **3. maven-surefire-plugin**
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
</plugin>
```

**Purpose**: Runs unit tests during build.

**Command**: `mvn test`

**Includes**:
- `*Test.java` - Unit tests
- `*Tests.java` - Test classes

---

### **4. jacoco-maven-plugin**
```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
</plugin>
```

**Purpose**: Code coverage analysis.

**Output**: `target/site/jacoco/index.html`

**Shows**: What percentage of code is covered by tests.

---

---

## 📊 Dependency Graph

```
spring-boot-starter-web
  ├── spring-webmvc
  ├── spring-boot-starter-tomcat
  ├── jackson-databind
  └── spring-boot-starter-logging

spring-boot-starter-data-jpa
  ├── spring-data-jpa
  ├── hibernate-core
  └── jdbc

spring-boot-starter-security
  ├── spring-security-core
  ├── spring-security-web
  └── spring-security-config

jjwt (JWT)
  ├── jjwt-api
  ├── jjwt-impl
  └── jjwt-jackson
```

---

## Maven Commands

```bash
# Install dependencies
mvn clean install

# Run tests
mvn test

# Build executable JAR
mvn clean package

# Run application
mvn spring-boot:run

# View dependency tree
mvn dependency:tree

# Build with specific profile
mvn clean package -P prod
```

---

## ✅ Summary

| Dependency | Purpose | Scope |
|------------|---------|-------|
| spring-boot-starter-web | REST APIs | compile |
| spring-boot-starter-data-jpa | Database ORM | compile |
| spring-boot-starter-security | Authentication | compile |
| spring-boot-starter-validation | Input validation | compile |
| spring-boot-starter-data-redis | Caching | compile |
| spring-kafka | Event streaming | compile |
| spring-boot-starter-aop | Cross-cutting concerns | compile |
| jjwt | JWT tokens | compile |
| jasypt | Encryption | compile |
| mapstruct | DTO mapping | compile |
| lombok | Boilerplate reduction | compile |
| springdoc-openapi | API docs | compile |
| postgresql | Database driver | runtime |
| flyway | Migrations | compile |
| spring-boot-devtools | Hot reload | runtime |
| spring-boot-starter-test | Unit testing | test |
| testcontainers | Integration testing | test |
| h2 | In-memory DB | test |
| rest-assured | API testing | test |

---

## 🚀 Next Steps

1. Clone/setup the project
2. Install dependencies: `mvn clean install`
3. Configure application-dev.yml with your local PostgreSQL
4. Run: `mvn spring-boot:run`
5. Access Swagger UI: `http://localhost:8080/api/swagger-ui.html`

