// File: src/constants/services.ts (Bisa tetap .ts)
import {HiOutlineServerStack, HiOutlineComputerDesktop, HiOutlineServer,} from "react-icons/hi2";
import {IconType} from "react-icons"; // Import type khusus icon

export interface Service {
    title: string;
    description: string;
    icon: IconType; // Ubah dari ReactNode ke IconType
}

export const SERVICES: Service[] = [
    {
        title: "Backend Development",
        description: "Building RESTful APIs with Laravel, Go, and Express.js, including business logic for financial tracking and inventory management in a production system deployed for a real client.",
        icon: HiOutlineServer,
    },
    {
        title: "Frontend Engineering",
        description: "Developing responsive Single Page Applications (SPA) using React and Tailwind CSS. Currently expanding my skills in creating seamless user interfaces with a focus on clean design and interactivity.",
        icon: HiOutlineComputerDesktop,
    },
    {
        title: "Data & Infrastructure",
        description: "Designing database schemas for real business logic (flexible payment tracking, inventory fulfillment), with hands-on experience in containerization (Docker) and Redis caching.",
        icon: HiOutlineServerStack,
    },
];