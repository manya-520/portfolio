# portfolui

A UI portfolio—a collection of projects and prototypes by a product designer. This repo organizes case studies under `projects/` and hosts the portfolio site itself with Next.js.

## Folder structure overview

```
portfolui/
├── projects/              # Case study folders (Markdown notes & assets)
│   ├── actual/
│   ├── superlabs/
│   └── bounteous/
├── src/
│   ├── components/       # Shared React UI components
│   ├── pages/            # Next.js routes (Pages Router)
│   └── styles/           # Global & shared styles (Tailwind entry, CSS)
├── public/               # Static assets served at /
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── README.md
```

## Tech stack

- **Next.js** — React framework for the portfolio site  
- **React** — UI  
- **Tailwind CSS** — utility-first styling  

## Setup (run locally)

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000).

For a production build:

```bash
npm run build
npm start
```

## Projects in this repo

| Folder | Topic |
|--------|--------|
| `projects/actual` | Actual AI — agentic developer tools platform |
| `projects/superlabs` | Super Labs — AI marketplace for non-technical businesses |
| `projects/bounteous` | Bounteous / SniffAI — AI compliance platform for telecom |
