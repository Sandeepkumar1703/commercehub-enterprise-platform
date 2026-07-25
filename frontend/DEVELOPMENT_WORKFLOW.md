# 🚀 Recommended Development Workflow — CommerceHub

## 📋 Development Workflow Steps

### 1. Pick the Highest Priority GitHub Issue
- Review the backlog.
- Select the highest-priority pending issue.
- Read the requirements completely.
- Define the acceptance criteria.

### 2. Sync Your Repository
```bash
git checkout main
git pull origin main
```

Verify the project builds before starting:
- **Backend**:
  ```bash
  mvn clean test
  ```
- **Frontend**:
  ```bash
  npm install
  npm run build
  ```
*This ensures you aren't building on a broken main branch.*

---

### 3. Create a Feature Branch
Example:
```bash
git checkout -b feature/cart-api
```
*Other examples:* `feature/forgot-password`, `feature/order-service`, `feature/payment-api`, `feature/email-verification`.  
*Keep one feature per branch.*

---

### 4. Backend Development
Implement:
- Entity changes
- DTOs
- Repository
- Service
- Controller
- Validation
- Exception handling
- Security
- Unit tests (where applicable)

Then test everything:
- Success
- Invalid input
- Unauthorized
- Forbidden
- Not found
- Duplicate data
- Edge cases
- Verify Swagger API docs

---

### 5. Frontend Development
Implement:
- API integration
- Loading state
- Error handling
- Success handling
- Validation
- Responsive UI

Test:
- Empty states
- Loading
- API failures
- Unauthorized user
- Happy path

---

### 6. End-to-End Testing
Test the complete end-to-end flow:
```
Register ──► Login ──► Browse Products ──► Add to Cart ──► Checkout ──► Payment ──► Order Created ──► View Order History
```
*Don't just test APIs individually.*

---

### 7. Code Review (Self Review)
Before committing, verify:
- Is there duplicate code?
- Can this method be simplified?
- Any unused imports?
- Any `console.log` left behind?
- Any `TODO` left unaddressed?
- Proper naming conventions used?
- Any security issues?
- Any performance issues?

---

### 8. Update Documentation
Update:
- `README.md`
- API documentation & Swagger descriptions
- Architecture diagram (if needed)
- Sequence diagrams (if feature changes flow)
- Postman Collection
- Database schema & Flyway migrations (if added)

---

### 9. Commit Properly
Use conventional commits instead of generic messages like `updated api`:
- `feat(cart): implement add to cart API`
- `feat(auth): add forgot password endpoint`
- `fix(order): resolve payment validation bug`
- `docs: update authentication documentation`

---

### 10. Push Branch
```bash
git push origin feature/cart-api
```

---

### 11. Create Pull Request
Even if you are working alone:
- **PR Checklist**:
  - [ ] Builds successfully
  - [ ] Tests passed
  - [ ] Documentation updated
  - [ ] Screenshots attached (UI)
  - [ ] Linked GitHub Issue

---

### 12. Merge to Main
After review:
```bash
git checkout main
git pull origin main
git merge feature/cart-api
git push origin main
```

Then delete the feature branch:
```bash
git branch -d feature/cart-api
git push origin --delete feature/cart-api
```

---

### 13. Verification Checklist Before Merging
After every completed feature, verify all of these before merging:
- ✅ Backend builds successfully
- ✅ Frontend builds successfully
- ✅ No console errors
- ✅ No TypeScript errors
- ✅ No Maven errors
- ✅ API tested in Swagger / Postman
- ✅ UI tested manually
- ✅ Documentation updated
- ✅ README updated if needed
- ✅ GitHub Issue closed

---

## 🔄 Our Workflow Going Forward

For every CommerceHub task, we follow this sequence:

1. **Pick** the highest-priority pending GitHub issue.
2. **Pull** the latest `main`.
3. **Create** a dedicated feature branch.
4. **Implement** the backend completely.
5. **Thoroughly test** the backend.
6. **Implement and integrate** the frontend.
7. **Thoroughly test** the full end-to-end flow.
8. **Clean up and self-review** the code.
9. **Update documentation**, `README.md`, and any related diagrams or API docs.
10. **Commit** with a meaningful message (Conventional Commits).
11. **Push** the feature branch.
12. **Merge** it into `main`.
13. **Delete** the feature branch.
14. **Move on** to the next highest-priority issue.
