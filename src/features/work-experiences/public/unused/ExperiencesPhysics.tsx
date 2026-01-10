import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

// --- DATA DUMMY ---
const EXPERIENCE_DATA = [
    {
        id: 1,
        role: "Senior Fullstack Engineer",
        company: "Tech Startups Inc.",
        period: "2024 - Present",
        desc: "Memimpin arsitektur microservices & optimasi React.",
        tech: ["Laravel", "React", "AWS"]
    },
    {
        id: 2,
        role: "Backend Developer",
        company: "Digital Solution Agency",
        period: "2022 - 2024",
        desc: "Desain database dan REST API high-performance.",
        tech: ["PHP", "Redis", "Go"]
    },
    {
        id: 3,
        role: "Web Developer",
        company: "Freelance",
        period: "2021 - 2022",
        desc: "Membangun website UMKM dengan SEO technical.",
        tech: ["WordPress", "JS", "CSS"]
    }
];

export default function ExperiencePhysics() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // State untuk memastikan render HTML selesai sebelum fisika jalan
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!sceneRef.current) return;

        // 1. SETUP ENGINE MATTER.JS
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Constraint = Matter.Constraint,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint;

        const engine = Engine.create();
        const world = engine.world;

        // Setup Canvas (untuk debug/mouse interaction, nanti kita hidden render-nya)
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: sceneRef.current.clientWidth,
                height: 800, // Tinggi area fisika
                wireframes: false, // Ubah ke true jika ingin lihat "kerangka" fisikanya
                background: "transparent",
                pixelRatio: 1 // Penting agar mouse akurat
            }
        });

        // 2. MEMBUAT OBJEK FISIKA (BODIES)
        const cardWidth = 320; // Lebar kartu (sesuaikan dengan CSS w-80)
        const cardHeight = 180; // Tinggi perkiraan kartu
        const startX = sceneRef.current.clientWidth / 2;
        const startY = 50;

        const physicsBodies: Matter.Body[] = [];
        const constraints: Matter.Constraint[] = [];

        // -- Anchor (Paku di langit-langit agar rantai tidak jatuh) --
        const anchor = Bodies.circle(startX, startY, 20, { isStatic: true });
        Composite.add(world, anchor);

        let previousBody = anchor;

        EXPERIENCE_DATA.forEach((_, index) => {
            // Buat kotak fisik untuk setiap kartu
            const body = Bodies.rectangle(startX, startY + 150 + (index * 200), cardWidth, cardHeight, {
                chamfer: { radius: 10 }, // Sudut tumpul
                density: 0.005, // Berat benda
                frictionAir: 0.05, // Hambatan udara (agar tidak terlalu liar ayunannya)
                restitution: 0.5, // Kelentingan (memantul)
            });

            physicsBodies.push(body);

            // Buat rantai (Constraint) antar kartu
            const constraint = Constraint.create({
                bodyA: previousBody,
                bodyB: body,
                pointA: index === 0 ? { x: 0, y: 0 } : { x: 0, y: cardHeight / 2 }, // Titik sambung di bawah body sebelumnya
                pointB: { x: 0, y: -cardHeight / 2 - 20 }, // Titik sambung di atas body sekarang (kasih jarak 20px)
                stiffness: 0.8, // Kekakuan tali (0-1)
                damping: 0.1,
                length: 60, // Panjang tali antar kartu
                render: {
                    visible: true, // Tampilkan talinya
                    lineWidth: 2,
                    strokeStyle: '#3b82f6' // Warna biru lara-blue
                }
            });

            constraints.push(constraint);
            previousBody = body;
        });

        Composite.add(world, [...physicsBodies, ...constraints]);

        // 3. MOUSE INTERACTION (Agar bisa ditarik)
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });

        // Penting: Izinkan scroll di atas canvas, tapi tangkap event drag
        mouse.element.removeEventListener("mousewheel", mouse.mousewheel as any);
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel as any);

        Composite.add(world, mouseConstraint);

        // 4. JALANKAN MESIN
        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        // 5. THE SYNC LOOP (Menyinkronkan HTML ke Fisika)
        // Ini magic-nya: Setiap frame, kita ambil posisi body fisika, tempel ke div HTML
        const syncLoop = () => {
            physicsBodies.forEach((body, index) => {
                const card = cardRefs.current[index];
                if (card) {
                    const { x, y } = body.position;
                    const rotation = body.angle;

                    // CSS Transform
                    card.style.transform = `translate(${x - cardWidth / 2}px, ${y - cardHeight / 2}px) rotate(${rotation}rad)`;
                }
            });
            requestAnimationFrame(syncLoop);
        };

        syncLoop();
        setIsReady(true);

        // Cleanup
        return () => {
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
            Composite.clear(world, false);
            Engine.clear(engine);
        };
    }, []);

    return (
        <section className="relative min-h-[120vh] bg-[#050914] overflow-hidden">
            <div className="text-center pt-20 pb-10 relative z-10 pointer-events-none">
                <h2 className="text-4xl font-bold text-white mb-2">
                    <span className="text-lara-blue">Interactive</span> Chain
                </h2>
                <p className="text-slate-400 text-sm">Coba tarik kartu di bawah ini!</p>
            </div>

            {/* Container Utama Fisika */}
            <div ref={sceneRef} className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing">

                {/* Render HTML Cards (Overlay di atas Canvas) */}
                {EXPERIENCE_DATA.map((exp, index) => (
                    <div
                        key={exp.id}
                        ref={(el) => (cardRefs.current[index] = el)}
                        className={`absolute top-0 left-0 w-80 p-6 rounded-2xl bg-[#0a101f]/90 backdrop-blur-md border border-lara-blue/30 shadow-[0_0_20px_rgba(59,130,246,0.2)] select-none pointer-events-none text-center ${isReady ? 'opacity-100' : 'opacity-0'}`}
                        // pointer-events-none penting agar mouse matter.js yang menangkap event, bukan div HTML
                        style={{
                            transformOrigin: "center center",
                            willChange: "transform" // Optimasi performa browser
                        }}
                    >
                        {/* Lubang Rantai Visual (Hiasan) */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600"></div>

                        <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                        <div className="text-lara-blue text-sm font-mono mb-2">@{exp.company}</div>
                        <div className="text-xs text-slate-400 mb-3 border-b border-white/10 pb-2">{exp.period}</div>
                        <p className="text-gray-300 text-xs leading-relaxed mb-3">{exp.desc}</p>

                        <div className="flex flex-wrap justify-center gap-1">
                            {exp.tech.map((t, i) => (
                                <span key={i} className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] rounded border border-blue-500/20">{t}</span>
                            ))}
                        </div>

                        {/* Lubang Rantai Bawah (Hiasan) */}
                        {index !== EXPERIENCE_DATA.length - 1 && (
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600"></div>
                        )}
                    </div>
                ))}

            </div>
        </section>
    );
}