# Abhay Technicals — Backend REST API Engine

Production REST API engine for the Abhay Technicals mobile spare parts and accessories platform.

## Architecture
- **Runtime:** Node.js 20 LTS + TypeScript
- **Framework:** Express.js 4.x
- **Data Access:** Prisma ORM
- **Database:** MySQL 8.0 (Isolated database on Hostinger)
- **Security:** Helmet, CORS, express-rate-limit, Zod input validation, Bcrypt password hashing
- **Logging:** Structured logging via Pino

## Directory Organization
- `src/config/`: Validated environment variables and constants.
- `src/controllers/`: Express request handlers, status codes, and JSON envelopes.
- `src/services/`: Core domain business logic (Wholesale tiers, OTP, Cart recalculation, Checkout validation).
- `src/repositories/`: Data access layer and Prisma queries.
- `src/validators/`: Zod schemas for request validation.
- `src/middleware/`: Authentication, Authorization, Error Handling, Rate Limiting, Correlation ID.
- `src/lib/`: External provider abstractions (Mock WhatsApp, Mock Payments, Mock Delhivery).
- `src/utils/`: Common response formatting, cryptographically secure OTP generation.
- `src/types/`: TypeScript definitions, express request augmentation.

## Security Guarantees
- No plaintext OTPs are ever logged or saved to the database.
- Dynamic wholesale pricing recalculation occurs exclusively in the service layer.
- Zero client-side pricing or discount inputs are trusted.
- Production credentials are never hardcoded.
