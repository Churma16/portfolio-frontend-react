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
        description: "Building RESTful APIs using Laravel, and actively expanding my backend capabilities by developing modern applications with Go and Node.js.",
        icon: HiOutlineServer,
    },
    {
        title: "Frontend Engineering",
        description: "Developing responsive Single Page Applications (SPA) using React and Tailwind CSS, with a strong focus on clean design and interactive user experiences.",
        icon: HiOutlineComputerDesktop,
    },
    {
        title: "Data & Infrastructure",
        description: "Designing efficient database schemas while gaining hands-on experience with containerization (Docker) and caching strategies to improve application performance.",
        icon: HiOutlineServerStack,
    },
];