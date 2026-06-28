# ⚖️ LegalEase - Professional Legal Services Marketplace

LegalEase is a premium, modern, and highly interactive web application designed to connect clients with verified legal professionals. The platform streamlines finding expert legal counsel, managing case contracts, and handling payments securely. With dedicated portals for Clients, Lawyers, and Administrators, LegalEase provides a comprehensive solution for modern legal client intake.

---

## 🌐 Live URL & Local Setup

- **Client Application URL (Live):** [https://leaglease-a10-client.vercel.app/](https://leaglease-a10-client.vercel.app/)
- **Stripe Webhook / Checkout Integration:** Supported via Stripe sandbox environment.

### Getting Started

To run the application locally, follow these steps:

1. **Clone the repository and navigate to the client folder:**
   ```bash
   cd assignment-10-client
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory (based on `.env.example` or variables mentioned below):
   ```env
   BETTER_AUTH_SECRET=your_auth_secret
   BETTER_AUTH_URL=http://localhost:3000
   MONGODB_URI=your_mongodb_connection_string
   DB_NAME=legalEase
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_SERVER_URL=http://localhost:5000
   NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 🎯 Project Purpose

Navigating legal challenges and finding the right attorney can be overwhelming and costly. **LegalEase** simplifies this process by providing:
- A transparent database of verified legal experts categorized by specialization.
- A seamless communication and hiring workflow for clients to initiate legal engagements.
- Secure processing of legal fees and verification subscriptions.
- Advanced administrative dashboards to audit platform activity and manage users.

---

## ✨ Key Features

### 👤 Role-Based Dashboards & Portals
- **Client (User) Dashboard:**
  - **Profile Management:** Update personal information, contact numbers, and profile avatars.
  - **Hiring History:** Send hiring requests to legal experts and track engagement statuses (*Pending*, *Accepted*, *Rejected*, *Completed*).
  - **Safe Payments:** Direct checkout to pay the lawyer's consulting/hiring fee via Stripe.
  - **Feedback System:** Review legal experts and leave comments on their listings.
- **Lawyer Dashboard:**
  - **Professional Profile Customization:** Modify details such as specialization, consultation fees, bio, availability schedules, and showcase image.
  - **Verify Badge Subscription:** Upgrade to *pro/verified* status through a $15 verification subscription processed via Stripe.
  - **Request Review:** View client request files and toggle engagement status (Accept/Reject).
- **Admin Dashboard:**
  - **Platform Insights:** Centralized oversight dashboard.
  - **User & Role Administration:** Manage registered user credentials, view and modify user roles, and activate/deactivate accounts.
  - **Financial Audit Log:** Monitor all subscription payments and lawyer hirings via a transactions panel.

### 🔒 Secure Authentication
- Multi-provider authentication powered by **Better-Auth** supporting custom Credentials (email/password) and **Google OAuth** login flow.
- Complete security enforcement via automated Next.js page-level middleware matching user roles.

### 💳 Stripe Sandbox Payments
- Seamless payment intents and checkouts for both client hire transactions and lawyer verification subscriptions.

### ⚡ Smart Search & Client-Side Filtering
- Browse, search, and dynamically filter lawyers based on legal domain, pricing tier, and review ratings.

---

## 📦 Installed npm Packages

The project uses the following major packages:

### Frontend Core & Navigation
| Package Name | Version | Purpose |
| :--- | :--- | :--- |
| `next` | `16.2.9` | React framework for server-rendered page routing and static build generation. |
| `react` / `react-dom` | `19.2.4` | Core view engine supporting hooks, state, and component rendering. |

### Authentication & Database
| Package Name | Version | Purpose |
| :--- | :--- | :--- |
| `better-auth` | `^1.6.20` | Complete authentication system supplying session handling, client hooks, and helpers. |
| `@better-auth/mongo-adapter` | `^1.6.20` | Official adapter mapping Better-Auth session tokens directly into the MongoDB databases. |
| `mongodb` | `^7.3.0` | Node.js driver to direct CRUD operations and transactions from Next.js APIs. |

### UI Design & Micro-Animations
| Package Name | Version | Purpose |
| :--- | :--- | :--- |
| `@heroui/react` / `@heroui/styles` | `^3.2.1` | Sleek modern Tailwind CSS design components and layouts. |
| `tailwindcss` | `^4` | Core utility-first CSS processor. |
| `framer-motion` | `^12.42.0` | Production-ready motion animation library for interactive state transitions. |
| `lucide-react` | `^1.21.0` | High-quality vector icon package. |
| `react-icons` | `^5.6.0` | Consolidated library of popular icon packages. |
| `@gravity-ui/icons` | `^2.18.0` | Icon set for specialized system navigation controls. |

### State & Payments
| Package Name | Version | Purpose |
| :--- | :--- | :--- |
| `stripe` | `^22.2.3` | Node.js Stripe integration for creating checkout session intents. |
| `axios` | `^1.18.1` | Promise-based HTTP client for API networking. |
| `recharts` | `^3.9.0` | Flexible chart library to render dashboard performance analytics. |
| `react-hot-toast` | `^2.6.0` | Lightweight toaster notifications for client-side event updates. |
