import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function FooterCopyright() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-muted-foreground text-sm font-mono text-center md:text-left">
                &copy; {currentYear}{" "}
                <span className="text-foreground font-bold">Churma.codes</span>.{" "}
                All rights reserved.
            </p>
            <Link
                to="/privacy-policy"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
            >
                <Shield className="w-3 h-3" />
                Privacy Policy
            </Link>
        </div>
    );
}
