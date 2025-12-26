# Client Dashboard - Sign In Page

A modern sign-in page built with Next.js 14, TypeScript, and Tailwind CSS, implementing the Wisemonk design from Figma.

## Features

- **Sign-in Form**: Email/password authentication with Google SSO option
- **Responsive Design**: Clean, modern UI matching the Figma design
- **Marketing Content**: Trust indicators, company logos, and testimonials
- **Interactive Elements**: Password visibility toggle, form validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles and Tailwind imports
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Sign-in page
├── components/
│   ├── Header.tsx       # Header with logo and sign up button
│   ├── SignInForm.tsx   # Sign-in form component
│   └── MarketingContent.tsx # Marketing content and testimonials
├── package.json
├── tailwind.config.js   # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

## Technologies

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React**: UI library

## Notes

- Image assets are loaded from Figma's CDN (valid for 7 days)
- For production, consider downloading and hosting images locally
- Form submission handlers are placeholders - implement your authentication logic



