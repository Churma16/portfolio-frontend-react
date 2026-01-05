import ServiceCard from "../Services/ServiceCard";
// Import ikon outline yang modern
import {
    HiOutlineServer,
    HiOutlineComputerDesktop,
    HiOutlineCircleStack,
} from "react-icons/hi2";

const services = [
    {
        title: "Backend Development",
        description:
            "Building robust RESTful APIs using Laravel 11. Focusing on authentication (Sanctum), automated testing (Pest), and scalable architecture.",
        icon: <HiOutlineServer className="w-6 h-6" />, // Icon Server
    },
    {
        title: "Frontend Engineering",
        description:
            "Crafting responsive Single Page Applications (SPA) with React and Tailwind CSS. Obsessed with pixel-perfect design and smooth interactions.",
        icon: <HiOutlineComputerDesktop className="w-6 h-6" />, // Icon Layar
    },
    {
        title: "Database Optimization",
        description:
            "Designing efficient schemas in MySQL. Implementing indexing strategies, query optimization, and Redis caching for high-performance data.",
        icon: <HiOutlineCircleStack className="w-6 h-6" />, // Icon Database
    },
];

export default function ServicesSection() {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                        What I <span className="text-lara-blue">Offer</span>.
                    </h2>
                    <p className="text-slate-400 text-lg">
                        I don't just write code; I build complete, efficient
                        solutions.
                    </p>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            index={index}
                            {...service} // Spread operator biar ringkas
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
