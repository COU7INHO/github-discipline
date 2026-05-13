<p align="center">
  <img src="public/brand.png" alt="The GitHub Discipline" width="160" />
</p>

<h1 align="center">The GitHub Discipline</h1>

<p align="center">
  <em>A field manual on GitHub habits for engineering teams.</em>
</p>

---

## About this project

This is a website built to help engineering teams adopt better practices around how code moves through GitHub. The focus is **not** on the technical mechanics of git — there are excellent resources for that elsewhere. The focus is on the concepts and habits that improve the entire development flow: how work is captured as intent, how it travels through review, and how it eventually lands in production.

Treat the content as **suggestions, not commandments**. Read each chapter against your team's reality. Where it aligns with what you already do, that is validation. Where it conflicts, that is a conversation worth having. Adopt what fits, adapt what almost fits, and discard what does not serve you — the goal is a workflow your team owns, not one imported wholesale from a stranger's manual.

The site itself is the artifact. The rest of this README is just how you run it.

## Quick start

```bash
git clone git@github.com:COU7INHO/github-discipline.git
cd github-discipline
npm install
npm run dev
```

Then open [http://localhost:4321](http://localhost:4321).

## Structure

```
.
├── public/
│   ├── brand.png            # logo / favicon
│   └── images/              # placeholder screenshots (replace with real ones)
├── src/
│   ├── components/          # Hero, Sidebar, Chapter, Callout, Screenshot, Code, ...
│   ├── layouts/             # BaseLayout
│   ├── pages/
│   │   └── index.astro      # the entire guide lives here
│   └── styles/
│       └── global.css       # design tokens, typography, motion
├── astro.config.mjs
└── package.json
```

## The nine chapters

```
00  Preface
01  Repository Setup
02  Branching Strategy
03  Issues First
04  Working on Branches
05  Pull Requests
06  Code Review
07  Merging Strategy
08  AI Agents
```

## Replacing the placeholder screenshots

Inside `public/images/` there are seven SVG placeholders rendered to look like GitHub UI mockups. Each is referenced from `src/pages/index.astro`. Drop your real screenshots in with the same filenames (or update the `src` in the page) and they will appear in the same frame.

## Build & deploy

```bash
npm run build        # outputs static site to ./dist
npm run preview      # serve dist locally to verify
```

The build is pure static files — host on anything: GitHub Pages, Netlify, Vercel, or an Nginx on a Raspberry Pi:

```nginx
server {
  listen 80;
  server_name discipline.local;
  root /var/www/github-discipline/dist;
  index index.html;
}
```

## Tech stack

| Layer            | Choice                                              |
| ---------------- | --------------------------------------------------- |
| Framework        | [Astro](https://astro.build) 4                      |
| Styling          | Hand-rolled CSS with custom properties (no Tailwind, no CSS-in-JS) |
| Syntax highlight | [Shiki](https://shiki.style) (`github-dark-default`) |
| Display font     | [Fraunces](https://fonts.google.com/specimen/Fraunces) — variable serif |
| Body font        | [Geist](https://vercel.com/font) — modern sans     |
| Mono font        | [JetBrains Mono](https://www.jetbrains.com/lp/mono/) |
| Hosting          | Any static host — Nginx on a Raspberry Pi is fine  |

### Why Astro and not Vite + React?

The site is a **guide**, not an application. ~99% of the bytes on every page are content — headings, paragraphs, code, images. That fact shaped the whole stack:

- **Static-first by default.** Astro renders to plain HTML at build time. Open the dev tools on any page and you'll find almost no JavaScript loaded — the browser is just parsing HTML and applying CSS. A React + Vite SPA would ship a JS runtime, a router, and a virtual DOM for a page that has none of those needs.

- **Islands of interactivity, not oceans.** The few interactive bits — scroll-based progress bar, sidebar active-section tracking, code copy buttons — are tiny vanilla-JS islands embedded in static HTML. Each one ships only the code it needs, where it needs it. In a React app, every interaction pays the cost of bootstrapping the entire framework on every page.

- **Performance on a Raspberry Pi.** The deployment target is a Pi. A static HTML page served by Nginx is essentially free to deliver. Sending a 200 kB React bundle that has to hydrate before the page becomes interactive — on a device with limited CPU — is the wrong trade for a content site.

- **Component model where it helps, none where it doesn't.** Astro's `.astro` files give us the React-style ergonomics (props, slots, scoped styles, component composition) without the runtime. We get the developer experience of components without forcing the browser to also know what a component is.

- **Content stays close to the code.** The entire guide is one `.astro` file with strongly-typed prop usage — searchable, refactorable, version-controllable as plain text. No headless CMS, no Markdown collection, no router config. The right level of complexity for a nine-chapter document.

The rule of thumb: **if the page would work as a printed magazine, Astro is the right tool. If it would work as an iOS app, reach for React.** This is a magazine.

## Contributing

The guide itself describes how to contribute. If you have read it and disagree with something — open an issue. That is, of course, the only acceptable way to enter the repository.

---

<p align="center">
  <sub>A living document — v1.0</sub>
</p>
