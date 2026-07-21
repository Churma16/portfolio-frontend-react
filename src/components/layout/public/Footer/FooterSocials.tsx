import {SiGithub, SiInstagram, SiLinkedin} from "react-icons/si";

interface FooterSocialsProps {
    github?: string;
    linkedin?: string;
    instagram?: string;
}

export default function FooterSocials({
    github = "https://github.com",
    linkedin = "https://linkedin.com",
    instagram = "https://instagram.com",
}: FooterSocialsProps) {
    return (
        <div className="flex items-center gap-4">
            <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-all flex items-center justify-center"
            >
                <SiGithub className="w-5 h-5" />
            </a>
            <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all flex items-center justify-center"
            >
                <SiLinkedin className="w-5 h-5" />
            </a>
            <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl border border-border/50 text-muted-foreground hover:text-pink-500 hover:border-pink-500/50 transition-all flex items-center justify-center"
            >
                <SiInstagram className="w-5 h-5" />
            </a>
        </div>
    );
}
