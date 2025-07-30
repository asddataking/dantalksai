# Dan Talks AI

Welcome to the **Dan Talks AI** website. This Next.js + Tailwind CSS project powers the official landing page for Dan Talks AI, the brand where U.S. Army veteran Dan simplifies real-world AI, experiments, and automations for creators, beginners, and curious minds.

## About this project

The site uses a dark "cosmic" palette with charcoal, purples, blues and soft glows. It features a hero section, about section, video showcase, AI resource vault, services preview, email signup, and footer. Sections are mobile-first and future-proofed for Go High Level (booking embeds, CRM forms, chat widgets).

## Getting started

1. **Install dependencies.** Run `npm install` to install packages.
2. **Start the development server.** Run `npm run dev` and open `http://localhost:3000`.
3. **Build for production.** Run `npm run build` followed by `npm run start`.

## Customising

- **Hero images and copy:** Edit `pages/index.js` to update the hero headline, subtext, and call-to-action links.
- **Avatar:** Replace `public/avatar-placeholder.png` with an image of Dan or your own avatar. Use the same filename for convenience.
- **Videos and resources:** Update the video list and AI Vault cards in `pages/index.js` by editing the arrays at the top of the file.
- **Styles:** Tailwind classes power the look and feel. To adjust the dark theme, edit `tailwind.config.js` and the CSS in `styles/globals.css`.

## Deploying to Vercel

This project is optimised for deployment on Vercel. To deploy:

1. Create a new project on Vercel and link it to this repository.
2. Set the framework preset to **Next.js** and keep the default build settings.
3. Deploy and your site will be available at your Vercel subdomain.

---

Dan built this site with caffeine and cosmic code ✨
