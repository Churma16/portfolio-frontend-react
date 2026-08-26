export default function AdminHeader({title, subtitle}: { title: string; subtitle: string }) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
            <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight">
                    {title}
                </h2>
                <p className="text-muted-foreground text-xs sm:text-sm">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}