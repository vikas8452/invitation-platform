# 🎉 InviteFlow - Digital Invitation Platform

A full-stack responsive web application where users can create, customize, purchase, and host digital invitations with a beautiful and elegant UI/UX.

## ✨ Features

### ✅ Implemented

1. **Landing Page**
   - Hero section with Framer Motion animations
   - Showcase sections for different event categories
   - "How it Works" section (3-step process)
   - Testimonials and pricing cards
   - Fully responsive design with Tailwind CSS + Shadcn UI

2. **Template Gallery**
   - 18+ templates across 6 categories
   - Advanced filtering (category, price, search)
   - Template preview with detailed view
   - Add to cart functionality
   - Real-time search

3. **Customization Page**
   - Real-time preview updates
   - Dynamic form fields (name, date, venue, RSVP, etc.)
   - Color picker with presets
   - Font selector
   - Background customization
   - Auto-save to localStorage

4. **Shopping Cart & Checkout**
   - Full cart management (add, remove, update)
   - Order summary
   - Checkout form with validation
   - State management with Zustand
   - Persistent cart storage

5. **Authentication**
   - Clerk authentication integration
   - Sign in/up pages
   - User profile dropdown
   - Protected routes

6. **User Dashboard**
   - Overview with statistics
   - My Invitations management
   - Order history
   - Quick actions

7. **Hosted Invitation Pages**
   - Unique URLs for each invitation (`/invite/[slug]`)
   - Customizable design based on user preferences
   - RSVP form functionality
   - Share and download options
   - View tracking

8. **Database Ready**
   - Prisma ORM setup
   - Complete schema for all features
   - PostgreSQL support

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS** + **Shadcn UI**
- **Framer Motion** (animations)
- **Zustand** (state management)
- **React Hook Form** + **Zod** (validation)

### Backend
- **Next.js API Routes**
- **Prisma ORM**
- **PostgreSQL** (database)
- **Clerk** (authentication)
- **Stripe** (payments - ready)

### Additional
- **Lucide React** (icons)
- **Sonner** (toast notifications)

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd invitation-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/inviteflow?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/templates
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/templates

# Stripe (Optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Set up database**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations (when you have a database)
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📁 Project Structure

```
invitation-platform/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Authentication pages
│   │   ├── cart/            # Shopping cart
│   │   ├── customize/       # Template customization
│   │   ├── dashboard/       # User dashboard
│   │   ├── invite/          # Hosted invitation pages
│   │   ├── templates/       # Template gallery
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Landing page
│   ├── components/
│   │   ├── ui/              # Shadcn UI components
│   │   └── Navigation.tsx   # Shared navigation
│   └── lib/
│       ├── stores/          # Zustand stores
│       ├── mock-data.ts     # Mock template data
│       ├── types.ts         # TypeScript types
│       ├── utils.ts         # Utility functions
│       └── prisma.ts        # Prisma client
├── prisma/
│   └── schema.prisma        # Database schema
└── public/                  # Static assets
```

## 🚀 Features to Add (Phase 2)

1. **Stripe Integration**
   - Complete payment processing
   - Webhooks for order confirmation
   - Invoice generation

2. **Admin Dashboard**
   - Template management (CRUD)
   - User management
   - Order analytics
   - Revenue tracking

3. **Video Templates**
   - Video invitation support
   - FFmpeg integration for rendering
   - Video customization

4. **Enhanced Features**
   - Guest list management
   - RSVP tracking dashboard
   - Email notifications (Nodemailer)
   - WhatsApp integration
   - Custom domain support
   - AI-powered message suggestions
   - Referral program
   - Discount codes

5. **Media Management**
   - AWS S3 / Cloudinary integration
   - Image uploads
   - Background image library

## 🎨 UI/UX Features

- ✅ Soft pastel color palette
- ✅ Elegant typography (Playfair Display + Inter)
- ✅ Framer Motion animations
- ✅ Micro-interactions
- ✅ Responsive design (mobile-first)
- ✅ Accessibility considerations

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linter
npm run lint
```

## 📝 API Routes (To Implement)

- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `POST /api/invitations` - Create hosted invitation
- `GET /api/invitations/:slug` - Get invitation details
- `POST /api/rsvp` - Submit RSVP
- `POST /api/webhooks/stripe` - Handle Stripe webhooks
- `POST /api/webhooks/clerk` - Handle Clerk webhooks

## 🔐 Environment Setup

### Clerk Setup
1. Go to [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your API keys to `.env`

### Database Setup
1. Install PostgreSQL locally or use a cloud provider
2. Update `DATABASE_URL` in `.env`
3. Run `npx prisma db push`

### Stripe Setup (Optional)
1. Go to [stripe.com](https://stripe.com)
2. Get your API keys
3. Add to `.env`

## 📧 Contact & Support

For questions or support, please open an issue in the repository.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Shadcn UI for the beautiful component library
- Clerk for authentication
- Vercel for hosting
- The Next.js team

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
