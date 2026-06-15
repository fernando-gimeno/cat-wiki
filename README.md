<h1 align="center">🐱 Cat Wiki</h1>

<p align="center">
  A beautifully illustrated feline encyclopedia to discover and compare cat breeds.
</p>

<p align="center">
  <a href="https://cat-wiki-inky-ten.vercel.app">Live demo</a>
</p>

---

## 📖 Description

**Cat Wiki** is a web application that works as a repository of cat breeds. It lets you explore the different characteristics of each breed —temperament, origin, life expectancy and care traits— through a modern, responsive interface.

The data is fetched in real time from [The Cat API](https://thecatapi.com), and it includes photo galleries per breed, search and a most-searched breeds section.

## ✨ Features

- **Breed catalog** with detailed traits and characteristics.
- **Detail page** per breed with a photo gallery and ability metrics.
- **Breed search**.
- **"Most Searched Breeds" section** with a selection of feline portraits.
- **Server-side rendering (SSR)** with revalidation and caching of API requests.
- **SEO optimized**: metadata, Open Graph, Twitter Cards, `sitemap.ts`, `robots.ts`, `manifest.ts` and JSON-LD structured data.
- **Responsive design** and image optimization with `sharp`.

## 🛠️ Tech stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Headless UI](https://headlessui.com/)
- [Lucide React](https://lucide.dev/)
- [The Cat API](https://thecatapi.com/)

## 🚀 Installation and usage

You need to have [Git](https://git-scm.com), [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

```bash
# Clone the repository
git clone https://github.com/fernandouy/cat-wiki.git
cd cat-wiki

# Install dependencies
pnpm install
```

### Environment variables

Copy `.env.template` to `.env` and fill in the values:

```bash
cp .env.template .env
```

| Variable               | Description                                                                 |
| ---------------------- | --------------------------------------------------------------------------- |
| `CAT_API_KEY`          | API key for [The Cat API](https://thecatapi.com) (required).                |
| `NEXT_PUBLIC_SITE_URL` | Public site origin for SEO (optional; defaults to `http://localhost:3000`). |

### Available scripts

```bash
# Development environment
pnpm dev

# Build for production
pnpm build

# Serve the production build
pnpm start

# Linting
pnpm lint
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📁 Project structure

```
src/app/
├── components/      # Reusable components (search, breed-card, json-ld...)
├── details/         # Breed detail page and its components/interfaces
├── libs/            # The Cat API client and site configuration
├── views/           # Page sections (hero, discover, footer...)
├── layout.tsx       # Root layout and metadata
├── page.tsx         # Main page
├── sitemap.ts       # Dynamic sitemap
├── robots.ts        # robots.txt
└── manifest.ts      # Web App Manifest
```

## 📬 Contact

- GitHub: [@fernandouy](https://github.com/fernandouy/)
