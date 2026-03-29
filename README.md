# Your Farm 🚜

**Your Farm** is an interactive, educational farming simulator built with **React**, **Three.js**, and **Zustand**. 

The game challenges players to manage a multi-year agricultural operation, focusing on the critical real-world tradeoff between immediate **Production** (Profit) and long-term **Sustainability** (Soil Health, Biodiversity, and Water Table management).

## 🌟 Features

- **5-Stage Farming Cycle**: Navigate through Land Prep, Cropping, Nutrient Management, Irrigation, and Harvest.
- **Dynamic Consequence Engine**: Every choice you make has immediate and long-term effects on your farm's ecosystem.
- **Multi-Year Persistence**: Watch how your decisions in Year 1 affect your baseline productivity in subsequent years.
- **Tangible Economy**: Manage a starting budget of $50,000 and invest in sustainable technologies.
- **Interactive 3D Scene**: Visual feedback on soil health and water levels using `@react-three/fiber`.
- **Tradeoff Lens**: A real-time optimization graph to help you find the balance between profit and the environment.

## 🛠️ Tech Stack

- **Frontend**: React 18
- **3D Rendering**: Three.js / @react-three/fiber / @react-three/drei
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-farm.git
   cd your-farm
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🌍 Deployment

This project is optimized for deployment on **Vercel** or **Netlify**. Simply connect your GitHub repository and the build script (`npm run build`) will handle the rest.

## 📝 License

Distributed under the MIT License.
