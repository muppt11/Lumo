# Lumo — Gamified Personal Finance

> **Lumo turns banking into a fun game.** Complete quests, build streaks, earn rewards, and form smarter money habits. Illuminate your finances with positive reinforcement and playful UX.

---

## ✨ Features (current & planned)

- **Quests & Streaks:** Habit loops for no-spend days, on-time bills, round-ups, and more  
- **Rewards & Badges:** Earnable milestones to keep motivation high  
- **Insights:** Simple, approachable views to track progress and trends  
- **Privacy-first:** Local development setup with no secrets committed to source  
- **Future ideas:** Budget templates, friend challenges, gentle nudges

> _This repo currently contains the front-end scaffold; backend/API wiring can be added later._

---

## 🧱 Tech Stack

- **React + TypeScript** (Vite dev server & build)
- **ESLint** with TypeScript rules
- **React Compiler** enabled by default (see notes below)
- **(Optional) shadcn/ui** scaffolding via `components.json`—add Tailwind & run the shadcn CLI if you choose to use it

---

## 🚀 Quickstart

Prereqs:
- **Node.js ≥ 18** (recommended: the latest LTS)

Install & run:

```bash
# 1) Install deps
npm install

# 2) Start dev server
npm run dev

# 3) Build for production
npm run build

# 4) Preview local production build
npm run preview 

```

🧩 Development Notes

React Compiler

This template enables the React Compiler out of the box. It can improve runtime performance by moving work out of render, but it may impact dev/build times. If you hit issues, consult the React docs or temporarily disable it in your setup.

Using shadcn/ui (optional)

If you plan to use shadcn/ui:
	1.	Add Tailwind CSS and configure tailwind.config.js and postcss.config.js.
	2.	Install shadcn CLI and generate components into your src directory.
	3.	Keep components.json in sync as you add components.

⸻

🔧 Common Scripts
	•	npm run dev — Start the Vite dev server with HMR
	•	npm run build — Production build
	•	npm run preview — Preview the production build locally
	•	npm run lint — Lint the project (if configured)

⸻

📦 Environment Variables

This scaffold doesn’t require any env vars by default.
When you add APIs (e.g., bank data or auth), create a .env and never commit secrets:

🛡️ Security & Privacy
	•	Do not commit API keys, tokens, or personal data.
	•	If you add telemetry, document opt-in/opt-out clearly.

⸻

🗺️ Roadmap
	•	Onboarding flow with habits & goal selection
	•	Streak engine + progress widgets
	•	Rewards/badges system
	•	Lightweight insights page
	•	Optional account linking or CSV import (mock or real API)

⸻

🤝 Contributing

PRs welcome! Please:
	1.	Create a feature branch
	2.	Keep changes scoped & well-described
	3.	Add/adjust linting and minimal tests where relevant

⸻

📄 License

Add a license file (e.g., MIT) to clarify usage. Until then, the project is “All rights reserved” by default.

⸻

🙌 Acknowledgements

Bootstrapped from the Vite + React + TypeScript template. Thanks to the Vite & React communities!
