// src/components/Auth/GlitchGhostElements.tsx
interface GlitchGhostElementsProps {
    isGlitch: boolean;
}

export default function GlitchGhostElements({ isGlitch }: GlitchGhostElementsProps) {
    if (!isGlitch) return null;

    return (
        <>
            <div className="absolute inset-0 bg-red-500/50 translate-x-2 translate-y-1 z-0 rounded-2xl blur-md" />
            <div className="absolute inset-0 bg-blue-500/50 -translate-x-2 -translate-y-1 z-0 rounded-2xl blur-md" />
        </>
    );
}