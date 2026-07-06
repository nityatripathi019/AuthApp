# 🔐 What is JWT Authentication?

JWT (JSON Web Token) Authentication is a secure, token-based authentication mechanism used to verify the identity of users in web applications and REST APIs. Instead of storing user sessions on the server, a signed token is generated after a successful login and returned to the client. The client stores this token and includes it in every protected request, allowing the server to verify the user's identity.

JWT authentication is **stateless**, meaning the server does not maintain session data. This makes applications more scalable and efficient.

---

# ⚙️ How JWT Authentication Works

### 1. User Registration
- The user creates an account by providing details such as a username, email, and password.
- The password is securely hashed using **bcrypt** before being stored in the database.

### 2. User Login
- The user logs in using their email and password.
- The server validates the credentials.
- If authentication is successful, the server generates a **JSON Web Token (JWT)** signed with a secret key.

### 3. Token Storage
The client stores the generated JWT in one of the following:
- Local Storage
- Session Storage
- HTTP-only Cookies (recommended)

### 4. Accessing Protected Routes
Whenever the client sends a request to a protected route, it includes the JWT in the request header.

```http
Authorization: Bearer <your_jwt_token>
```

The server verifies the token:
- ✅ If the token is valid, access is granted.
- ❌ If the token is invalid or expired, access is denied.

---

# 🧩 JWT Structure

A JWT consists of three parts separated by dots:

```text
Header.Payload.Signature
```

### Header
Contains the token type and signing algorithm.

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### Payload
Contains user information (claims).

```json
{
  "id": "12345",
  "email": "user@example.com",
  "role": "user"
}
```

> **Note:** The payload is Base64 encoded, **not encrypted**, so sensitive information such as passwords should never be stored inside it.

### Signature
The signature is generated using the encoded header, payload, and a secret key. It ensures that the token has not been modified.

---

# 🔄 Authentication Flow

```text
User Login
     │
     ▼
Server verifies credentials
     │
     ▼
Generate JWT Token
     │
     ▼
Client stores token
     │
     ▼
Client sends token with every protected request
     │
     ▼
Server verifies JWT
     │
 ┌───┴──────────┐
 │              │
 ▼              ▼
Valid        Invalid
 │              │
 ▼              ▼
Access      Access Denied
Granted
```

---

# ✅ Why JWT Authentication?

- Stateless authentication (no server-side sessions)
- Secure token-based authentication
- Faster request processing
- Ideal for RESTful APIs
- Easily scalable for modern applications
- Supports token expiration for enhanced security

---

# 🔒 Security Best Practices

- Store passwords using **bcrypt** hashing.
- Keep the JWT secret in environment variables.
- Never include sensitive information in the JWT payload.
- Use **HTTPS** in production.
- Set an expiration time for tokens.
- Prefer **HTTP-only cookies** for storing JWTs in browser-based applications.
