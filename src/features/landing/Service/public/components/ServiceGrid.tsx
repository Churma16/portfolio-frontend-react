import ServiceCard from "./ServiceCard.tsx";
// Hapus ekstensi .ts di import
import { Service } from "../../constants/services.ts";

interface ServiceGridProps {
    services: Service[];
}

export default function ServiceGrid({ services }: ServiceGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
                <ServiceCard key={index} index={index} {...service} />
            ))}
        </div>
    );
}