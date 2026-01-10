import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, ScrollControls, useScroll, Stars, Text } from "@react-three/drei";
import * as THREE from "three";

// --- DATA DUMMY ---
const EXPERIENCE_DATA = [
    {
        id: 1,
        role: "Senior Fullstack Engineer",
        company: "Tech Startups Inc.",
        period: "2024 - Present",
        desc: "Arsitek sistem Microservices & React Core.",
        tech: ["Laravel", "React", "AWS"]
    },
    {
        id: 2,
        role: "Backend Developer",
        company: "Digital Solution Agency",
        period: "2022 - 2024",
        desc: "Desain API high-concurrency & Database.",
        tech: ["PHP", "Redis", "Go"]
    },
    {
        id: 3,
        role: "Web Developer",
        company: "Freelance",
        period: "2021 - 2022",
        desc: "Website UMKM & Optimasi SEO.",
        tech: ["WordPress", "JS", "CSS"]
    },
    // Tambahkan data dummy agar terowongan terasa lebih panjang
    {
        id: 4,
        role: "Internship",
        company: "University Lab",
        period: "2020 - 2021",
        desc: "Research Assistant for AI Project.",
        tech: ["Python", "TensorFlow"]
    }
];

// --- KOMPONEN KARTU HOLOGRAM ---
function HologramCard({ data, position, rotation }: any) {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    // Animasi Floating (Mengambang)
    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();
        // Gerakan naik turun halus
        groupRef.current.position.y = position[1] + Math.sin(t * 2) * 0.1;
        // Rotasi sedikit agar terlihat 3D
        groupRef.current.rotation.y = rotation[1] + Math.sin(t * 0.5) * 0.05;
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            {/* 1. Base Mesh (Papan Kaca di belakang teks) */}
            <mesh
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <planeGeometry args={[3.5, 2]} />
                <meshPhysicalMaterial
                    color={hovered ? "#00f0ff" : "#050914"} // Biru saat hover
                    transparent
                    opacity={hovered ? 0.2 : 0.8}
                    roughness={0}
                    metalness={0.8}
                    emissive={hovered ? "#00f0ff" : "#000000"}
                    emissiveIntensity={hovered ? 0.5 : 0}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* 2. Border Neon (Frame) */}
            <lineSegments>
                <edgesGeometry args={[new THREE.PlaneGeometry(3.5, 2)]} />
                <lineBasicMaterial color={hovered ? "#ffffff" : "#00f0ff"} linewidth={2} />
            </lineSegments>

            {/* 3. HTML Content (Teks yang tajam) */}
            <Html
                transform
                occlude
                distanceFactor={1.5}
                position={[0, 0, 0.05]} // Sedikit di depan kaca
                style={{
                    width: "300px",
                    textAlign: "left",
                    pointerEvents: "none", // Biar mouse event tembus ke mesh 3D
                    userSelect: "none"
                }}
            >
                <div className={`p-4 transition-all duration-500 ${hovered ? "scale-105 blur-none" : "blur-[0.5px] opacity-80"}`}>
                    <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
                        {data.role}
                    </h3>
                    <div className="text-lara-blue font-mono text-sm mb-2">@{data.company}</div>
                    <p className="text-gray-300 text-xs leading-relaxed border-l-2 border-lara-blue pl-2 mb-2">
                        {data.desc}
                    </p>
                    <div className="flex gap-1 flex-wrap">
                        {data.tech.map((t: string, i: number) => (
                            <span key={i} className="text-[10px] bg-blue-900/50 text-blue-200 px-1 rounded border border-blue-500/30">
                {t}
              </span>
                        ))}
                    </div>
                </div>
            </Html>
        </group>
    );
}

// --- KOMPONEN TEROWONGAN GRID (TRON STYLE) ---
function GridTunnel() {
    const gridRef = useRef<THREE.Group>(null);

    // Efek grid bergerak (seolah kita maju)
    useFrame((state) => {
        if(!gridRef.current) return;
        // Grid floor bergerak mundur agar terasa kita maju
        // Kita tidak perlu menggerakkan ini jika kamera yang bergerak,
        // tapi untuk efek "speed" tambahan bisa ditambahkan tekstur offset.
    });

    return (
        <group ref={gridRef}>
            {/* Lantai Grid */}
            <gridHelper args={[100, 100, 0xff0000, 0x1e1e1e]} position={[0, -2, 0]} />
            {/* Langit-langit Grid (Mirror) */}
            <gridHelper args={[100, 100, 0xff0000, 0x1e1e1e]} position={[0, 2, 0]} />
        </group>
    );
}

// --- PENGENDALI KAMERA BERDASARKAN SCROLL ---
function SceneContent() {
    const scroll = useScroll();
    const { camera } = useThree();

    useFrame(() => {
        // Panjang terowongan berdasarkan jumlah data
        // offset 0 = awal, offset 1 = akhir scroll
        // Kita gerakkan kamera dari Z=0 ke Z negatif (masuk ke dalam layar)
        const targetZ = -scroll.offset * 25; // Makin besar angka, makin jauh jalannya

        // Smooth camera movement (Lerp)
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);

        // Sedikit goyangan kamera agar terasa seperti pesawat/drone
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, Math.sin(scroll.offset * 10) * 0.2, 0.1);
    });

    return (
        <>
            <GridTunnel />

            {/* Partikel Debu Digital */}
            <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Render Semua Kartu Experience */}
            {EXPERIENCE_DATA.map((exp, i) => {
                // Logika Posisi Zig-Zag (Kiri - Kanan)
                const xPos = i % 2 === 0 ? -1.8 : 1.8;
                const zPos = -(i * 6) - 4; // Jarak antar kartu 6 unit ke dalam
                const rotY = i % 2 === 0 ? 0.3 : -0.3; // Menghadap sedikit ke tengah

                return (
                    <HologramCard
                        key={exp.id}
                        data={exp}
                        position={[xPos, 0, zPos]}
                        rotation={[0, rotY, 0]}
                    />
                );
            })}

            {/* Teks Penutup di Ujung Terowongan */}
            <Text
                position={[0, 0, -(EXPERIENCE_DATA.length * 6) - 8]}
                color="#00f0ff"
                fontSize={1}
                anchorX="center"
                anchorY="middle"
            >
                CONTINUE TO EXPLORE
            </Text>
        </>
    );
}

export default function ExperienceHologram() {
    return (
        <section className="h-[250vh] relative bg-black">
            {/* h-[250vh] membuat halaman jadi panjang agar bisa discroll */}

            <div className="sticky top-0 h-screen w-full">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                    {/* Efek Kabut agar ujung jalan tidak terlihat putus (Endless) */}
                    <fog attach="fog" args={['#000000', 5, 20]} />

                    <ambientLight intensity={2} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />

                    <ScrollControls pages={3} damping={0.2}>
                        <SceneContent />
                    </ScrollControls>
                </Canvas>

                {/* Overlay Judul (Tetap diam di layar) */}
                <div className="absolute top-10 left-0 w-full text-center pointer-events-none z-10">
                    <h2 className="text-3xl font-bold text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]">
                        <span className="text-lara-blue">&lt;</span> HOLOGRAM <span className="text-lara-blue">/&gt;</span> ROADMAP
                    </h2>
                    <p className="text-slate-400 text-xs mt-2">SCROLL TO FLY</p>
                </div>
            </div>
        </section>
    );
}