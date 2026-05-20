
*Purpose
PetAdoption is a full-stack MERN platform designed to simplify the pet adoption process. This platform allows users to browse available pets, view detailed profiles, submit adoption requests, and manage their personal requests. Pet owners can manage their listings and handle adoption requests efficiently.

 * Client: https://your-client-live-url.com
* Server: https://your-server-live-url.com
*Features
Dynamic Pet Browsing: Explore pets with advanced search, species-based filtering, and sorting using MongoDB operators.

Secure Authentication: User-friendly registration/login with Google Auth and JWT-based secure session management via HTTPOnly cookies.

User Dashboard: A dedicated space for users to manage their adoption requests and view status updates.

Pet Owner Management: Owners can add, update, delete pet listings, and approve/reject adoption requests through a modal.

Real-time UX: Smooth animations with Framer Motion and modern toast notifications for a premium user experience.

Wishlist Feature: Users can save their favorite pets to a personal wishlist using local storage.

NPM Packages Used
Frontend: next, react, framer-motion, lucide-react, react-hot-toast, axios, next-themes

Backend: express, mongodb, jsonwebtoken, cookie-parser, cors, dotenv

Project Setup
Clone the repository:

Bash
git clone https://github.com/your-username/pet-adoption-client.git
cd pet-adoption-client

Install dependencies:

Bash
npm install
Environment Variables:
Create a .env.local file in the root directory:

Code snippet
MONGODB_URI=MONGODB_URI

JWT_SECRET=JWT_SECRET
NEXT_PUBLIC_API_URL=http://localhost:8000


Run the project:

Bash
npm run dev
Other Rules & Compliance
No Lorem Ipsum: All content is unique and relevant to the project.

UI Notifications: Replaced default alert() with modern react-hot-toast.

Deployment: Deployed on Vercel/Render with optimized performance.

Error Handling: Implemented custom 404 page and robust loading states.

Responsive Design: Fully mobile, tablet, and desktop friendly.

Secure Data: MongoDB credentials are protected via environment variables.

Built with  by [jannati]










































This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
