export default function AdminHeader({title, subtitle}: { title: string; subtitle: string }) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h2 className="text-3xl font-heading font-bold text-foreground tracking-tight">
                    {title}
                </h2>
                <p className="text-slate-400 text-sm">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}