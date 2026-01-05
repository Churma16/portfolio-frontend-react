export default function Footer() {
    return (
        <footer className="mt-auto border-t border-white/10 bg-dark-card py-8 text-center">
            <p className="text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} Aditya Portfolio. Built with
                Laravel & React.
            </p>
        </footer>
    );
}
