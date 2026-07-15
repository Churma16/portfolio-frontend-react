# Polyglot Portfolio - Frontend

[![React Version](https://img.shields.io/badge/React-v19.x-61DAFB?logo=react&logoColor=white)](https://react.dev) [![Build Tool](https://img.shields.io/badge/Vite-v7.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev) [![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A modern, multi-theme personal portfolio web application built with React and Vite. It serves as an interactive resume, showcasing projects, work experiences, and tech stacks, and is designed to seamlessly integrate with three different backend implementations (Laravel, Go, Express).

---

## Key Features

### Public Visitor Pages
*   **Hero Section**: Dynamic introduction with aesthetic styling.
*   **Projects & Work Experiences**: Detailed showcase of professional background and past work.
*   **Tech Stack**: Visual representation of skills and technologies.
*   **Backend Toggle**: Dynamic switching between Laravel, Go, and Express backend APIs to demonstrate API integrations.

### Admin Dashboard
*   **Content Management**: Full CRUD operations for projects, experiences, categories, and tags.
*   **Protected Routes**: Secure access for authorized administrator only.

---

## Tech Stack & Libraries

*   **Framework/Core**: React (v19) / Vite (v7) / TypeScript
*   **Styling**: Tailwind CSS / Framer Motion
*   **Data Fetching**: TanStack Query (v5) / Axios
*   **Interactive / Graphics**: Three.js (@react-three/fiber & @react-three/drei), Matter.js (2D physics), tsParticles
*   **UI Components**: Shadcn UI (Radix primitives), Tiptap Editor, Sonner (Toasts)
*   **Form Management**: React Hook Form / Zod

---

## Installation & Setup

### Method 1: Local Development Setup

#### Prerequisites
*   Node.js >= 18.x
*   npm

#### Steps
1.  **Clone and Navigate**:
    ```bash
    git clone <repository-url>
    cd my-portfolio
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Configuration**:
    Create `.env` based on `.env.example` (or configure your backend URLs):
    ```bash
    cp .env.example .env
    ```
4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
5.  **Build for Production**:
    ```bash
    npm run build
    ```

---

## Acknowledgements

Special thanks and appreciation to:
*   **Open Source Community**: For the amazing libraries and tools that made this project possible.

---

## Author

**Churma16**

---

## License

This project is licensed under the [MIT License](LICENSE).
