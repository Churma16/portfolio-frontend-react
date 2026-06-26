export default function FooterCopyright() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="text-muted-foreground text-sm font-mono">
            &copy; {currentYear}{" "}
            <span className="text-foreground font-bold">Churma.codes</span>. All rights
            reserved.
        </div>
    );
}
