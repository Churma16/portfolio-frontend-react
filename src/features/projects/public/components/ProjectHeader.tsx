export default function ProjectHeader() {
    return (
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                Featured <span className="text-primary">Projects</span>.
            </h2>
            <p className="text-lara-text-muted text-lg">
                <span className="text-foreground font-medium">Solving problems</span>{" "}
                through code. Here are some of the highlights from my journey as
                a developer.
            </p>
        </div>
    );
}
