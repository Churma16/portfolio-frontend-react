// src/pages/LoginPage.tsx
import PublicLayout from "../../components/layout/public/PublicLayout.tsx";
import LoginForm from "@/features/auth/components/LoginForm.tsx";
import GlitchBackground from "@/features/auth/components/GlitchBackground.tsx";
import GlitchGhostElements from "@/features/auth/components/GlitchGhostElements.tsx";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm.ts";
import { useGlitchEffect } from "@/features/auth/hooks/useGlitchEffect.ts";

const GLITCH_STYLES = `
    @keyframes glitch-anim-1 {
        0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
        20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
        40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
        60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
        80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
        100% { clip-path: inset(30% 0 20% 0); transform: translate(1px, -1px); }
    }
    
    .hacked-effect {
        animation: glitch-anim-1 0.6s infinite linear alternate-reverse;
        background-color: #000 !important;
        border: 1px solid #0f0 !important;
        color: #0f0 !important;
        text-shadow: 2px 0 red, -2px 0 blue;
        box-shadow: 0 0 15px #0f0;
        filter: contrast(200%) brightness(150%);
    }
    .hacked-effect input {
        background-color: #000 !important;
        color: #0f0 !important;
        border-color: #0f0 !important;
        font-family: monospace;
    }
    .hacked-effect button {
        background-color: #0f0 !important;
        color: #000 !important;
        font-weight: 900;
        text-transform: uppercase;
    }
`;

export default function LoginPage() {
    const { email, setEmail, password, setPassword, status, errorMessage, handleSubmit } = useLoginForm();
    const isGlitch = useGlitchEffect();

    return (
        <PublicLayout>
            <style>{GLITCH_STYLES}</style>
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
                <GlitchBackground isGlitch={isGlitch} />

                <div className="relative mx-4">
                    <GlitchGhostElements isGlitch={isGlitch} />
                    <LoginForm
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        status={status}
                        errorMessage={errorMessage}
                        isGlitch={isGlitch}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </PublicLayout>
    );
}