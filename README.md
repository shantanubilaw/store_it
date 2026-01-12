# Store It

A modern web application built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Chart.js, and Appwrite.

## 🚀 Tech Stack

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible UI components
- **[Chart.js](https://www.chartjs.org/)** - Simple yet flexible charting library
- **[Appwrite](https://appwrite.io/)** - Backend as a Service (BaaS)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- An Appwrite account and project (optional, for backend features)

### Installation

Dependencies are already installed. To reinstall:
```bash
npm install
```

### Configuration

Configure environment variables in `.env.local`:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
```

To get these values:
- Sign up at [Appwrite Cloud](https://cloud.appwrite.io/) or host your own instance
- Create a new project
- Copy the Project ID and Endpoint from your project settings

### Running the App

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🎨 Available shadcn/ui Components

The following components are already installed:
- Button
- Card
- Input

To add more components:
```bash
npx shadcn@latest add [component-name]
```

Browse available components at [ui.shadcn.com](https://ui.shadcn.com/docs/components)

## 📊 Using Chart.js

Chart.js is integrated with `react-chartjs-2`. See the example in `src/components/ChartExample.tsx` for basic usage.

## 🔐 Using Appwrite

Appwrite services are configured in `src/lib/appwrite.ts`. Available services:
- **Account** - User authentication and account management
- **Databases** - NoSQL database collections
- **Storage** - File storage and management

Example usage:
```typescript
import { account, databases, storage } from '@/lib/appwrite';

// Get current user
const user = await account.get();

// Create a document
const doc = await databases.createDocument(
  'database-id',
  'collection-id',
  'unique()',
  { name: 'John Doe' }
);
```

## 📁 Project Structure

```
store_it/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   └── ui/          # shadcn/ui components
│   └── lib/             # Utility functions and configurations
│       ├── appwrite.ts  # Appwrite configuration
│       └── utils.ts     # Helper utilities
├── public/              # Static assets
└── ...config files
```

## 🛠️ Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
