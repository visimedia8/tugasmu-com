## Context
**Workspace**: `E:\general workspace\tugasmu.com`  
**Goal**: Implement a proper Email/Password authentication system (removing the temporary dummy login), remove physical address from contact pages, and enforce Sandbox mode for Duitku checkout to pass the Duitku review.
**Relevant Scripts**: `wrangler d1 migrations apply` (for DB).

## Audit Summary
| Component | Expected State | Actual State | Gap? |
|-----------|---------------|--------------|------|
| DB Users Table | Contains `password_hash` column | No `password_hash` column | ❌ YES |
| Backend Auth Routes | Endpoints for `/register` and `/login` | Missing | ❌ YES |
| Frontend `masuk` Page | Real Email/Password login form | Hardcoded Google / Dummy login | ❌ YES |
| Frontend `daftar` Page | Real Email/Password registration form | Missing / Not implemented for Credentials | ❌ YES |
| `authOptions.ts` | Authenticates via Backend API | Hardcoded reviewer check | ❌ YES |
| Contact & Footer | No physical address | Contains dummy physical address | ❌ YES |
| Duitku Sandbox | Forced Sandbox for review | Relies on env var `DUITKU_IS_PRODUCTION` | ❌ YES |

## Ordered Fix Items

### 1. 🔴 BLOCKER: Add `password_hash` column to users table
**File**: `backend/migrations/0012_add_password.sql`
**Component**: Database Migration
**Current state**: Does not exist
**Required state**: `ALTER TABLE users ADD COLUMN password_hash TEXT;`
**Why**: We need to store user passwords securely to enable proper email/password login.
**How**: Create the migration file and execute it using Wrangler.

### 2. 🔴 BLOCKER: Create Backend Auth Routes
**File**: `backend/src/routes/auth.ts` (new file) & `backend/src/index.ts`
**Component**: `auth` router
**Current state**: Does not exist
**Required state**: Export a Hono router with `POST /register` and `POST /login` that securely hashes (using standard Web Crypto API or `bcryptjs` if available, wait, Cloudflare Workers can use WebCrypto) passwords and verifies them, then returns a success response. Note: We will use a simple SHA-256 hash with a salt for simplicity in Workers if standard bcrypt is not available, or just rely on NextAuth to hash on the frontend? Actually, Next.js can hash it before sending, or we can use `bcryptjs` in Next.js backend. Let's use `bcryptjs` in Next.js `authOptions.ts` and `/api/auth/register` so we don't need to bloat the Hono worker!
Wait, if Next.js does the DB queries, it can't, because Next.js has no DB connection. So Hono must do the DB queries. Next.js can send the raw password to Hono, and Hono can hash it using `crypto.subtle` or we can just send it to a new Hono route.

Let's refine:
**File**: `backend/src/routes/auth.ts`
**How**: Add `POST /register` and `POST /login` that handles password hashing and verification. Add to `index.ts`.

### 3. 🔴 BLOCKER: Implement Frontend Registration API
**File**: `frontend/src/app/api/auth/register/route.ts`
**Component**: Next.js API Route
**Current state**: Does not exist
**Required state**: API Route that forwards registration data to Hono backend.
**Why**: Needed for the client-side registration form to communicate securely.
**How**: Create `POST` handler that calls `apiBase/api/auth/register`.

### 4. 🔴 BLOCKER: Update `authOptions.ts`
**File**: `frontend/src/lib/authOptions.ts`
**Component**: `CredentialsProvider`
**Current state**: Hardcoded reviewer check.
**Required state**: Calls `apiBase/api/auth/login` to verify email/password.
**Why**: To properly authenticate users logging in with email/password.
**How**: Modify `authorize` function to fetch from Hono backend.

### 5. 🔴 BLOCKER: Build Login and Register UI
**File**: `frontend/src/app/masuk/page.tsx` & `frontend/src/app/daftar/page.tsx`
**Component**: Login/Register Forms
**Current state**: `masuk` has Google+Dummy, `daftar` might not exist or just redirects to Google.
**Required state**: Full email/password form with validation and error handling, alongside Google login.
**Why**: Users need a UI to register and login.
**How**: Replace dummy login button with a form containing Email and Password inputs. Create `daftar/page.tsx` with Name, Email, Password.

### 6. 🟡 GAP: Remove Physical Address
**File**: `frontend/src/app/kontak/page.tsx` & `frontend/src/components/layout/Footer.tsx`
**Component**: Address Text
**Current state**: Contains dummy address.
**Required state**: Address text completely removed.
**Why**: User explicitly requested to remove the address.
**How**: Delete the DOM elements containing the address.

### 7. 🟡 GAP: Force Duitku Sandbox
**File**: `backend/src/routes/payment.ts`
**Component**: `isProd` boolean
**Current state**: `const isProd = c.env.DUITKU_IS_PRODUCTION === 'true'`
**Required state**: `const isProd = false // Forced for Duitku Review`
**Why**: Ensures Duitku reviewers always hit the Sandbox regardless of Cloudflare Env settings.
**How**: Hardcode `isProd` to `false`.

## Files to Modify Summary
| File | What Changes | Risk |
|------|-------------|------|
| `backend/migrations/0012_add_password.sql` | Add password column | Low |
| `backend/src/routes/auth.ts` | Add register/login endpoints | Medium |
| `backend/src/index.ts` | Mount auth routes | Low |
| `frontend/src/app/api/auth/register/route.ts` | Forward registration to backend | Low |
| `frontend/src/lib/authOptions.ts` | Update CredentialsProvider | Medium |
| `frontend/src/app/masuk/page.tsx` | Add login form | Medium |
| `frontend/src/app/daftar/page.tsx` | Add register form | Medium |
| `frontend/src/app/kontak/page.tsx` | Remove address | Low |
| `frontend/src/components/layout/Footer.tsx`| Remove address | Low |
| `backend/src/routes/payment.ts` | Force `isProd = false` | Low |

## Verification Protocol
**Definition of Done**: The plan is complete ONLY when ALL checks below pass.

### Step 1: Migration Check
Command: `cat backend/migrations/0012_add_password.sql`
Expected output: Contains `ALTER TABLE users ADD COLUMN password_hash TEXT;`

### Step 2: Build Check
Command: `npm run build` in `frontend`
Expected output: Build succeeds with no TS errors.
