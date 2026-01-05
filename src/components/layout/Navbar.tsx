import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        // bg-lara-dark: Background #010618
        // border-lara-border: Border #1b293d
        <nav className="border-b border-lara-border bg-lara-dark sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-[74px] items-center justify-between">
                    {/* Logo dengan Font Hanken Grotesk (font-heading) */}
                    <Link
                        to="/"
                        className="text-2xl font-heading font-bold text-white tracking-tight"
                    >
                        Fathan<span className="text-lara-blue">.dev</span>
                    </Link>

                    {/* Menu dengan Font Kanit (font-body) */}
                    <div className="flex gap-8 text-sm font-medium text-lara-sky/80">
                        <Link
                            to="/"
                            className="hover:text-white transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className="hover:text-white transition-colors"
                        >
                            About
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
