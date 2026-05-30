# Zakaria Mounji Portfolio (Next.js + Spring Boot)

## What’s inside
- **frontend**: Next.js (App Router, TypeScript, Tailwind CSS, Framer Motion)
- **backend**: Spring Boot REST API (PostgreSQL, JPA)

## Quick run (local)

### 1) Backend (port 8080)
Prerequisite: PostgreSQL on `localhost:5432`.
- Database: `portfolio`
- User: `postgres`
- Password: `postgres`

Run:
```bash
cd backend
mvn -q -DskipTests package
mvn -q spring-boot:run
```

Endpoint:
- `GET http://localhost:8080/api/projects`

### 2) Frontend (port 3000)
Run:
```bash
cd frontend
npm install
npm run dev
```

Pages:
- `http://localhost:3000/`
- `http://localhost:3000/devops`

## Notes
- CORS is configured to allow `http://localhost:3000` to call the backend.
- Seed data inserts the flagship project **“Orchestration Kubernetes & Pipeline Jenkins CI/CD”**.

