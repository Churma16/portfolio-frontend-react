import CodeWindow from "../../../../components/common/CodeWindow.tsx";
import { Profile } from "@/types";

interface AboutCodeWindowProps {
    profile?: Profile;
}

export default function AboutCodeWindow({ profile }: AboutCodeWindowProps) {
    return (
        <div className="relative w-full max-w-lg mx-auto">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent/50 rounded-xl opacity-40 blur-lg rotate-2 transition-colors duration-500" />
            <CodeWindow profile={profile} />
        </div>
    );
}
