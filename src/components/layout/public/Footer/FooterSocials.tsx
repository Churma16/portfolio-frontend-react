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
        <div className="flex items-center gap-6">
            <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="text-lara-text-muted hover:text-lara-text-primary transition-colors"
            >
                <SiGithub className="w-5 h-5" />
            </a>
            <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-lara-text-muted hover:text-lara-accent-blue-light transition-colors"
            >
                <SiLinkedin className="w-5 h-5" />
            </a>
            <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                className="text-lara-text-muted hover:text-pink-500 transition-colors"
            >
                <SiInstagram className="w-5 h-5" />
            </a>
        </div>
    );
}
