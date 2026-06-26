export default function ServiceSectionHeader() {
    return (
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                Technical <span className="text-primary">Capabilities</span>.
            </h2>
            <p className="text-muted-foreground text-lg">
                Bridging the gap between{" "}
                <span className="text-foreground font-medium">
                    robust backend logic and interactive frontend experiences
                </span>
                .
            </p>
        </div>
    );
}
