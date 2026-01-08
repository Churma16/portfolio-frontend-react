export default function FooterCopyright() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="text-slate-500 text-sm font-mono">
            &copy; {currentYear}{" "}
            <span className="text-white font-bold">Churma.codes</span>. All rights
            reserved.
        </div>
    );
}
