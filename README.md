# Shop by Fendi

Cinematic videography portfolio for Joshua "Fendi" Buck — Seattle-based videographer.

Built with **Vite + React + TypeScript + Tailwind CSS + Framer Motion**.

## Local development

```bash
npm install
npm run dev
```

Then visit http://localhost:5173.

## Production build

```bash
npm run build
npm run preview
```

## Deploy

This project is set up to be imported into **[Lovable](https://lovable.dev)** for hosting and further iteration. Lovable will detect the Vite + React stack automatically.

Alternative one-click deploys:
- [Vercel](https://vercel.com) — import this repo, Vercel auto-detects Vite.
- [Netlify](https://netlify.com) — build command `npm run build`, publish directory `dist`.

## Editing content

- **Hero copy** — `src/components/Hero.tsx`
- **Services & pricing** — `src/components/Services.tsx`
- **About copy** — `src/components/About.tsx`
- **Portfolio grid** — `src/data/work.ts` (edit titles, categories, swap image paths)
- **Photos** — drop new files into `public/images/` and reference them as `/images/your-file.jpg`

## Credits

Photography: Jevoy Palmer · Subject & creative direction: Joshua "Fendi" Buck
