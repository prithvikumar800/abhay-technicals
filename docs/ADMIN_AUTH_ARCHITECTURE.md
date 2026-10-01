# ABHAY TECHNICALS — Web & Admin Authentication Architecture
**Document Version:** 1.0.0 (Phase 6 Specification)  
**Status:** Approved Architecture Reference  

---

## 1. Web Token Storage Decision

### Core Decision
For all web clients (Customer Next.js Storefront and Staff Next.js Admin Portal), authentication tokens are managed under a **split-token security architecture**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TOKEN STORAGE ARCHITECTURE                      │
├─────────────────┬─────────────────┬───────────────────┬────────────────┤
│ Token Type      │ Lifespan        │ Storage Mechanism │ Security Flags │
├─────────────────┼─────────────────┼───────────────────┼────────────────┤
│ Access Token    │ 15 Minutes      │ Client Memory     │ Short TTL      │
│                 │                 │ (React Context/   │ Authorization  │
│                 │                 │ In-Memory Store)  │ Bearer Header  │
├─────────────────┼─────────────────┼───────────────────┼────────────────┤
│ Refresh Token   │ 30 Days         │ HttpOnly Cookie   │ HttpOnly=true  │
│                 │                 │                   │ Secure=true    │
│                 │                 │                   │ SameSite=Strict│
│                 │                 │                   │ Path=/api/v1/auth│
└─────────────────┴─────────────────┴───────────────────┴────────────────┘
```

### Critical Security Guarantees
1. **Zero LocalStorage for Refresh Tokens:**  
   `localStorage` and `sessionStorage` are completely accessible to any third-party script, injected browser extension, or Cross-Site Scripting (XSS) payload. Storing long-lived refresh tokens in browser storage is strictly prohibited.
2. **HttpOnly Cookie Protection:**  
   The refresh token is delivered to the browser inside a `Set-Cookie` header with the `HttpOnly` flag enabled. Client-side JavaScript cannot read or extract this cookie.
3. **SameSite=Strict & Path Restriction:**  
   The cookie is scoped strictly to `SameSite=Strict` (preventing Cross-Site Request Forgery / CSRF) and path-restricted to `/api/v1/auth` so it is only transmitted during explicit token refresh operations.
4. **Token Rotation & Instant Revocation:**  
   Every call to `/api/v1/auth/refresh` issues a new refresh token and invalidates the previous token hash in the backend MySQL `refresh_tokens` table. If a compromised token is reused, all tokens for that user session are revoked immediately.

---

## 2. Admin Role-Based Access Control (RBAC) Flow

```
[ Admin User ] ──1. Enters Phone (+91XXXXXXXXXX)──► [ Next.js Admin ]
                                                           │
                                                2. Calls /api/v1/auth/request-otp
                                                           │
                                                           ▼
[ Admin WhatsApp ] ◄──3. Receives 6-digit Code─── [ Express API ]
         │
4. Enters OTP
         │
         ▼
[ Next.js Admin ] ──5. Calls /api/v1/auth/verify-otp──► [ Express API ]
                                                              │
                                                     6. Verifies OTP Hash
                                                     7. Checks user.role:
                                                        - ADMIN ──► ALLOW
                                                        - STAFF ──► ALLOW
                                                        - CUSTOMER ─► REJECT (403)
                                                              │
[ Next.js Admin ] ◄──8. Receives Access Token + Sets Cookie───┘
         │
9. AuthContext stores User Profile & Access Token in Memory
10. Redirects to / (Admin Dashboard)
```

### Unauthorized Role Handling
If a valid customer verifies their WhatsApp number on the admin portal login screen, the backend authorization check rejects the login attempt with HTTP status `403 Forbidden` (`FORBIDDEN_ROLE`). The admin application displays:
*"Access Denied: This portal requires Administrative or Staff privileges."*

---

## 3. Session Expiration & Silent Refresh

1. **Active Interceptor:** When an API request returns `401 TOKEN_EXPIRED`, the centralized API client pauses outgoing requests and triggers `POST /api/v1/auth/refresh`.
2. **Transparent Recovery:** The browser automatically attaches the `HttpOnly` refresh cookie. The backend verifies the token hash and issues a fresh 15-minute access token.
3. **Session Termination:** If the refresh token has expired (after 30 days) or been revoked by a Super Admin, the client memory is wiped and the user is redirected to `/login` with an informational toast: *"Session expired. Please log in again via WhatsApp."*
