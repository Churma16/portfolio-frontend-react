import ServiceSectionHeader from "../../Services/ServiceSectionHeader.tsx";
import ServiceGrid from "../../Services/ServiceGrid.tsx";
import { SERVICES } from "@/constants/services.ts";

export default function ServicesSection() {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4 relative z-10">
                <ServiceSectionHeader />
                <ServiceGrid services={SERVICES} />
            </div>
        </section>
    );
}
