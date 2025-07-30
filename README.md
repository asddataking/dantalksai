# Dan Talks AI Website

This repository contains a simple, modern landing page for **Dan Talks AI**, a creator brand focused on delivering practical artificial intelligence tools and tutorials for creators and small businesses. The site is designed to be mobile‑first, using a dark colour palette with purple and blue accents and generous whitespace.

## Features

- **Hero section** with a punchy headline, sub‑headline, and two primary call‑to‑action buttons.
- **Latest Video** embed so visitors can watch the newest content without leaving the site (replace the placeholder video ID in `index.html`).
- **Free AI Starter Pack** section with an email capture form (replace the form `action` with your mailing list integration).
- **Featured Tutorials & Tools** grid featuring six example cards—update the card titles, descriptions and links as needed.
- **About Dan** section with a short biography written in a friendly, no‑hype tone.
- **Work with Dan** section inviting visitors to book consultations or sponsor the show.
- Clean **footer** with navigation links and automatic copyright year.

## Getting Started

1. **Serve locally:** You can open `index.html` directly in your browser, or serve it using a simple HTTP server:

   ```bash
   python3 -m http.server 8080
   ```

   Then visit `http://localhost:8080/index.html`.

2. **Customize content:**
   - Replace `PLACEHOLDER_VIDEO_ID` in the `<iframe>` URL in the Latest Video section with the YouTube video ID of the latest episode.
   - Edit the card titles, descriptions and links in the Tutorials & Tools section.
   - Update the email form `action` attribute to integrate with your email service.
   - Swap out the hero and about images by changing the `src` attributes of the `<img>` tags (images should be hosted externally or placed in an `assets` folder).

3. **Deploy to Vercel:** Once you are happy with the site, you can deploy it using the [Vercel CLI](https://vercel.com/docs/cli). Make sure you have the Vercel CLI installed and you are logged in.

   ```bash
   vercel --prod
   ```

   Follow the prompts to link to a new or existing Vercel project and deploy your site.

## License

This project is provided as‑is without any warranty. Feel free to modify and adapt it for your own use.