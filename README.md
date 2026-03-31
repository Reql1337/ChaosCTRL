<div align="center">
  <img src="public/banner.png" alt="ChaosCTRL Banner" width="100%">
  <br />
  <h1><b>ChaosCTRL</b></h1>
  <p><i>Stop Scope Creep in its Tracks. Quantify impact, score turbulence, and simulate futures.</i></p>

  <p>
    <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Supabase-2.9-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
  </p>
</div>

---

## ⚡ Overview

**ChaosCTRL** is a state-of-the-art project management layer designed to eliminate the uncertainty of software delivery. It integrates deeply with your existing issue trackers to provide real-time risk assessment, complexity scoring, and timeline simulations.

At its core, ChaosCTRL uses the **Chaos Score**—a proprietary metric powered by Gemini AI that evaluates tickets based on dependency depth, architectural complexity, and historical sprint data to flag high-risk "minor tweaks" before they derail your release.

---

## 🚀 Key Features

### 🔍 Real-time Scope Monitoring
Instant integration with your workflow. Every new ticket or 'quick ask' is automatically analyzed for potential scope creep.

### 🧪 The Chaos Score
Quantitative risk assessment for every task.
- **Low (0-30)**: Low risk, standard task.
- **Medium (31-70)**: Potential dependencies, requires review.
- **High (71-100)**: Structural impact, high risk of delay.

### ⏳ Delay Simulator
Visualize the ripple effect of new requests. ChaosCTRL simulates the impact of adding tasks mid-sprint, showing you exactly how many days your final deadline will shift.

### 📊 Impact Visualization
Beautiful, interactive dashboards using **Recharts** and **Framer Motion** to visualize sprint health and velocity.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://reactjs.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database/Auth**: [Supabase](https://supabase.com/)
- **AI Core**: [Google Gemini GenAI](https://ai.google.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

---

## 🚦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Supabase Account](https://supabase.com/)
- [Google Gemini API Key](https://aistudio.google.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Reql1337/ChaosCTRL.git
   cd ChaosCTRL
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory and add your credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

---

## ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with 💚 for chaotic project managers everywhere.</p>
</div>
