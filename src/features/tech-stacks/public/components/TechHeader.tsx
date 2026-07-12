import { TECH_SECTION_TITLE, TECH_SECTION_SUBTITLE } from "../../constants/tech.constants.ts";

export default function TechHeader() {
    return (
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                {TECH_SECTION_TITLE.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-primary">
                    {TECH_SECTION_TITLE.split(" ").slice(-1)[0]}
                </span>
                .
            </h2>
            <p className="text-lara-text-muted text-lg">
                {TECH_SECTION_SUBTITLE}
            </p>
        </div>
    )
}