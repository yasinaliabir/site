# Yasin Ali Abir — Portfolio

A responsive React portfolio with a soft, iOS-inspired light interface. It includes the home page, apps and extensions, social profiles, selected work, courses, contact details, and a four-item floating navigation dock.

## Run locally

Requirements: Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Open the local address printed by Vite. To create a production build:

```sh
npm run build
npm run preview
```

## Pages

- `/` — portrait, profile, social profiles, app list, and separate image-only creator and brand marquees
- `/apps` — all four applications and extensions
- `/apps/:slug` — an individual app detail page
- `/works` — selected portfolio work
- `/works/:slug` — project details with a Behance link
- `/course` — editable course placeholder; replace with published course details when available
- `/contact` — email and social links

## Update profile content

Edit `src/data.ts` to change the desktop and mobile portraits, email, social URLs, app descriptions, app artwork, download URLs, course details, portfolio projects, client photos, and gallery images.

- Replace `public/assets/yasin-portrait-desktop.png` to update the desktop hero portrait.
- Replace `public/assets/yasin-portrait-mobile.png` to update the separate mobile portrait. It is selected only at mobile widths; desktop and tablet continue to use the approved desktop image.
- Replace the four files under `public/assets/apps/` to update app icons.
- Add three client photos under `public/assets/clients/`, then set each `clientPortraits` item's `src` to its path. The home hero shows marked placeholders until those paths are added.
- Replace or reorder the local paths in `gallery` to update the creator and brand marquees. Gallery labels aren't displayed; portrait and logo entries are split by their `type`.
- Replace the local images under `public/assets/social/` to update the icon-only social profiles. Desktop icons sit between the introduction and stats in the hero; mobile keeps the compact row below the hero.
- Leave `downloadUrl: null` for an app that isn't available yet. Its page will show **Coming Soon**. Add a real URL when one is available.
- The current course entry is marked unavailable. Update its title, description, thumbnail, URL, and `available` flag in `src/data.ts` when course information is ready.
- Work image paths and Behance links are stored in `works`.

The portrait, app artwork, portfolio thumbnails, and gallery images are included in `public/assets/`. The reference screenshot itself is not included in the site. The Facebook Page card uses a Meta Business Suite app icon from its [Google Play listing](https://play.google.com/store/apps/details?id=com.facebook.pages.app), saved locally at `public/assets/meta-business-suite.png`.

For static hosting, enable the usual single-page-app fallback so nested routes resolve to `index.html`. The included `_redirects` file covers Netlify; `vercel.json` covers Vercel.
