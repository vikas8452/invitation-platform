# InviteFlow - Digital Invitation Platform

A modern, full-featured platform for creating, customizing, hosting, and sharing digital invitations.

## 🚀 Features

- **Template Gallery** - 18+ professionally designed templates
- **Real-time Customization** - Live preview with colors, fonts, and images
- **Hosted Invitations** - Unique URLs for each invitation
- **Download Options** - PNG and PDF downloads
- **Countdown Timer** - Real-time event countdown
- **RSVP Functionality** - Guest response tracking
- **Payment Integration** - Stripe checkout (ready for production)
- **Responsive Design** - Works on all devices
- **Beautiful Animations** - Framer Motion powered

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **Payment**: Stripe
- **Export**: html2canvas + jsPDF

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/invitation-platform.git
cd invitation-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Fill in your environment variables:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/invitation_platform"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment to GitHub Pages

1. Push your code to GitHub:
```bash
git push origin main
```

2. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Select "GitHub Actions" as source
   - The workflow will automatically build and deploy

3. Your site will be available at:
   `https://yourusername.github.io/invitation-platform`

## 📱 Usage

### Creating an Invitation

1. Browse templates from the gallery
2. Click "Customize" on any template
3. Fill in event details (name, date, venue, etc.)
4. Customize colors, fonts, and upload background images
5. Preview changes in real-time
6. Download or host your invitation

### Hosting an Invitation

1. Click "Share" → "Host Public Page"
2. Get a unique URL for your invitation
3. Share the link with guests
4. Guests can RSVP directly on the page

### Download Options

1. **Image (PNG)** - High-quality PNG image download
2. **PDF** - Professional PDF document

## 🎨 Customization

- **Templates**: Add new templates in `src/lib/mock-data.ts`
- **Components**: UI components in `src/components/ui/`
- **Styling**: Tailwind classes throughout the application
- **Animations**: Framer Motion configurations

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

- Built with Next.js, Tailwind CSS, and Shadcn UI
- Inspired by modern invitation platforms
- Thanks to the open-source community

## 📞 Support

For issues, questions, or contributions, please open an issue on GitHub.

---

Made with ❤️ by Vikas Patel