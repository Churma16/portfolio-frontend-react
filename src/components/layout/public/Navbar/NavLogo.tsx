import {Link} from "react-router-dom";

export default function NavLogo() {
    return (
        <Link
            to="/"
            className="text-2xl font-heading font-bold text-white tracking-tight"
        >
            Churma<span className="text-primary">.codes</span>
        </Link>
    );
}
