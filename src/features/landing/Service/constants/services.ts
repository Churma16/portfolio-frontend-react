// File: src/constants/services.ts (Bisa tetap .ts)
import {HiOutlineCircleStack, HiOutlineComputerDesktop, HiOutlineServer,} from "react-icons/hi2";
import {IconType} from "react-icons"; // Import type khusus icon

export interface Service {
    title: string;
    description: string;
    icon: IconType; // Ubah dari ReactNode ke IconType
}

export const SERVICES: Service[] = [
    {
        title: "Backend Development",
        description: "Building secure and robust RESTful APIs using Laravel. I focus on maintainable code architecture, secure authentication with Sanctum, and reliability through thorough testing practices.",
        icon: HiOutlineServer,
    },
    {
        title: "Frontend Engineering",
        description: "Developing responsive Single Page Applications (SPA) using React and Tailwind CSS. Currently expanding my skills in creating seamless user interfaces with a focus on clean design and interactivity.",
        icon: HiOutlineComputerDesktop,
    },
    {
        title: "Database Optimization",
        description: "Designing efficient MySQL schemas with a focus on data integrity. I am actively deepening my expertise in indexing strategies and query optimization while utilizing Redis for high-performance caching.",
        icon: HiOutlineCircleStack,
    },
];