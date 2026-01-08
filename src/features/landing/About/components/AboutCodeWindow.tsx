import CodeWindow from "../../../../components/common/CodeWindow.tsx";
import { Profile } from "@/types";

interface AboutCodeWindowProps {
    profile?: Profile;
}

export default function AboutCodeWindow({ profile }: AboutCodeWindowProps) {
    return (
        <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-lara-blue to-purple-600 rounded-xl opacity-20 blur-lg rotate-2" />
            <CodeWindow profile={profile} />
        </div>
    );
}
