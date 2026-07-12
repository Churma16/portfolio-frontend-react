import { Link } from "react-router-dom";

export default function FooterNav() {
    return (
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
            <Link to="/#home" className="hover:text-primary transition-colors">
                Home
            </Link>
            <Link to="/#projects" className="hover:text-primary transition-colors">
                Projects
            </Link>
            <Link to="/#contact" className="hover:text-primary transition-colors">
                Contact
            </Link>
            <Link to="/#about" className="hover:text-primary transition-colors">
                About
            </Link>
        </nav>
    );
}
