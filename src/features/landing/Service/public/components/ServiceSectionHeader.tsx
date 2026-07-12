import { SERVICE_SECTION_TITLE, SERVICE_SECTION_SUBTITLE } from "../../constants/service-section.constants.ts";

export default function ServiceSectionHeader() {
    return (
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                {SERVICE_SECTION_TITLE.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-primary">
                    {SERVICE_SECTION_TITLE.split(" ").slice(-1)[0]}
                </span>
                .
            </h2>
            <p className="text-muted-foreground text-lg">
                {SERVICE_SECTION_SUBTITLE}
            </p>
        </div>
    );
}
