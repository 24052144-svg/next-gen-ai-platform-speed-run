# Next-Gen AI Platform Speed Run

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://next-gen-ai-platform-speed-run.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/24052144-svg/next-gen-ai-platform-speed-run)

## 🚀 Live Deployment

**[https://next-gen-ai-platform-speed-run.vercel.app](https://next-gen-ai-platform-speed-run.vercel.app)**

---

## 📋 Project Overview

A Next-Gen AI Platform built with React + Vite featuring:

- 🌐 **Interactive 3D Hero** — Three.js orb with React Three Fiber, Sparkles & Drei
- ✨ **Native CSS Animations** — Hardware-accelerated `transform` & `opacity` transitions (no runtime JS animation engines)
- 🎯 **Intersection Observer** — Staggered entrance animations triggered on scroll (≤ 500ms total timeline)
- 💱 **WAAPI Price Flip** — Web Animations API micro-interaction on billing toggle / currency switch (zero React re-renders)
- 🎨 **Token-Based Design System** — Full CSS custom properties color palette + motion timing spec
- 📱 **Responsive** — Bento grid (desktop) / Accordion (mobile)

---

## 🎨 Design System

### Color Palette
| Token | Hex | Name |
|---|---|---|
| `--color-arctic-powder` | `#F1F6F4` | Background |
| `--color-nocturnal-expedition` | `#114C5A` | Primary |
| `--color-oceanic-noir` | `#172B36` | Text |
| `--color-forsythia` | `#FFC801` | Accent Yellow |
| `--color-deep-saffron` | `#FF9932` | Accent Orange |
| `--color-mystic-mint` | `#D9E8E2` | Subtle |

### Motion Timing Spec
| Category | Duration | Curve |
|---|---|---|
| Micro-interactions (hover/toggle) | 150ms–200ms | `ease-out` |
| Structural reflows (accordion/layout) | 300ms–400ms | `ease-in-out` |

### Typography
- **Headers:** JetBrains Mono
- **Body:** Inter

---

## 🛠️ Tech Stack

- **React 19** + **Vite 8**
- **Three.js** + **@react-three/fiber** + **@react-three/drei**
- **Vanilla CSS** with custom properties
- **Web Animations API (WAAPI)** for isolated DOM mutations
- **IntersectionObserver** for scroll-triggered animations

---

## 🏃 Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📦 Build & Deploy

```bash
npm run build
npx vercel --prod
```
