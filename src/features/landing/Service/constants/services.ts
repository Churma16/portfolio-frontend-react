// File: src/constants/services.ts (Bisa tetap .ts)
import {
    HiOutlineServer,
    HiOutlineComputerDesktop,
    HiOutlineCircleStack,
} from "react-icons/hi2";
import { IconType } from "react-icons"; // Import type khusus icon

export interface Service {
    title: string;
    description: string;
    icon: IconType; // Ubah dari ReactNode ke IconType
}

export const SERVICES: Service[] = [
    {
        title: "Backend Development",
        description: "Building robust RESTful APIs using Laravel 11. Focusing on authentication (Sanctum), automated testing (Pest), and scalable architecture.",
        icon: HiOutlineServer, 
    },
    {
        title: "Frontend Engineering",
        description: "Crafting responsive Single Page Applications (SPA) with React and Tailwind CSS. Obsessed with pixel-perfect design and smooth interactions.",
        icon: HiOutlineComputerDesktop,
    },
    {
        title: "Database Optimization",
        description: "Designing efficient schemas in MySQL. Implementing indexing strategies, query optimization, and Redis caching for high-performance data.",
        icon: HiOutlineCircleStack,
    },
];