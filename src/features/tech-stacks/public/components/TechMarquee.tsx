import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { motion, AnimatePresence } from "framer-motion";
import TechIcon from "../../../../components/common/TechIcon.tsx";
import { useTechStacks } from "@/features/tech-stacks/hooks/useTechStacks.ts";

export default function TechMarquee() {
    const { data: techStacks = [], isLoading, isError } = useTechStacks();

    // Ref untuk Scene Matter.js
    const sceneRef = useRef<HTMLDivElement>(null);
    const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Ref untuk menyimpan instance engine agar bisa dibersihkan
    const engineRef = useRef<Matter.Engine | null>(null);

    // --- PHYSICS SETUP (Hanya Jalan di Mobile) ---
    useEffect(() => {
        // 1. SAFETY CHECK
        // Jika element tidak ada, atau datanya kosong, atau loading... RETURN.
        // PENTING: Jika clientWidth 0 (artinya sedang di Desktop/Hidden), JANGAN JALANKAN.
        if (
            !sceneRef.current ||
            techStacks.length === 0 ||
            isLoading ||
            sceneRef.current.clientWidth === 0
        ) return;

        // --- SETUP MATTER.JS ---
        const Engine = Matter.Engine;
        const World = Matter.World;
        const Bodies = Matter.Bodies;
        const Mouse = Matter.Mouse;
        const MouseConstraint = Matter.MouseConstraint;
        const Runner = Matter.Runner;
        const Events = Matter.Events;

        const engine = Engine.create();
        const world = engine.world;
        engineRef.current = engine;

        const width = sceneRef.current.clientWidth;
        const height = sceneRef.current.clientHeight;

        // 2. WALLS & CEILING (Kandang Anti Kabur)
        const wallThickness = 500; // Tebal banget biar aman
        const walls = [
            // Lantai
            Bodies.rectangle(width / 2, height + wallThickness / 2, width + 200, wallThickness, { isStatic: true }),
            // Kiri
            Bodies.rectangle(0 - wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true }),
            // Kanan
            Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true }),
            // Atap (Ceiling) - PENTING BIAR GAK TERBANG KE LANGIT
            Bodies.rectangle(width / 2, -wallThickness / 2, width + 200, wallThickness, { isStatic: true })
        ];
        World.add(world, walls);

        // 3. TECH BODIES (Kotak Fisika)
        const techBodies = techStacks.map(() => {
            const size = 60;
            return Bodies.rectangle(
                Math.random() * (width - 100) + 50, // Posisi X Random
                Math.random() * (height / 3),       // Posisi Y (Jatuh dari atas)
                size,
                size,
                {
                    restitution: 0.5, // Mantul sedang
                    friction: 0.5,    // Gesekan sedang
                    density: 0.05,    // Berat
                    angle: Math.random() * Math.PI * 2
                }
            );
        });
        World.add(world, techBodies);

        // 4. MOUSE INTERACTION
        const mouse = Mouse.create(sceneRef.current);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.1, // Tali agak longgar biar gak nembus tembok
                render: { visible: false }
            }
        });

        // Fix scroll issue on mobile
        mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
        World.add(world, mouseConstraint);

        // 5. RESPAWN SYSTEM (Jaring Pengaman)
        Events.on(engine, "beforeUpdate", () => {
            techBodies.forEach((body) => {
                const { x, y } = body.position;
                const buffer = 100; // Batas toleransi kabur

                const isOutsideX = x < -buffer || x > width + buffer;
                const isOutsideY = y < -buffer || y > height + buffer;

                if (isOutsideX || isOutsideY) {
                    // Reset ke tengah
                    Matter.Body.setPosition(body, {
                        x: width / 2 + (Math.random() * 40 - 20),
                        y: height / 2
                    });
                    // Matikan kecepatan
                    Matter.Body.setVelocity(body, { x: 0, y: 0 });
                }
            });
        });

        // 6. RENDER LOOP (Sync Fisika -> HTML)
        const runner = Runner.create();
        Runner.run(runner, engine);

        const updateLoop = () => {
            if (!sceneRef.current) return;
            techBodies.forEach((body, index) => {
                const domNode = boxRefs.current[index];
                if (domNode) {
                    const { x, y } = body.position;
                    const angle = body.angle;
                    // Hardware accelerated transform
                    domNode.style.transform = `translate(${x - 30}px, ${y - 30}px) rotate(${angle}rad)`;
                }
            });
            requestAnimationFrame(updateLoop);
        };
        const animationId = requestAnimationFrame(updateLoop);

        // 7. CLEANUP (Wajib!)
        return () => {
            Runner.stop(runner);
            Engine.clear(engine);
            cancelAnimationFrame(animationId);
            World.clear(world);
            engineRef.current = null;
        };
    }, [techStacks, isLoading]); // Re-run kalau data berubah

    if (isError) return null;

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="py- sm:py- md:py- border-y border-lara-border bg-lara-dark/50 relative"
        >
            <AnimatePresence mode="wait">
                {isLoading ? (
                    // --- SKELETON LOADER ---
                    <motion.div
                        key="skeleton"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 h-[450px] md:h-[120px] place-items-center"
                    >
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex flex-col items-center gap-3 opacity-50">
                                <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-slate-700/50 rounded-lg animate-pulse" />
                                <div className="w-12 h-3 bg-slate-700/50 rounded animate-pulse" />
                            </div>
                        ))}
                    </motion.div>
                ) : (
                    <>
                        {/* MOBILE: Physics Playground */}
                        {/* Note: Gunakan md:hidden agar hilang di desktop */}
                        <motion.div
                            key="mobile-physics"
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.8 }}
                            className="md:hidden relative w-full h-[450px] bg-[#0a101f] overflow-hidden touch-none select-none"
                        >
                            <div
                                ref={sceneRef}
                                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
                            >
                                {techStacks.map((tech, index) => (
                                    <div
                                        key={tech.id || index}
                                        ref={(el) => {
                                            boxRefs.current[index] = el;
                                        }}
                                        className="absolute top-0 left-0 w-[60px] h-[60px] bg-slate-800 border-2 border-slate-600 rounded-xl shadow-lg flex flex-col items-center justify-center select-none will-change-transform z-10"
                                        // Lempar jauh dulu biar gak glitch pas init
                                        style={{ transform: "translate(-999px, -999px)" }}
                                    >
                                        <TechIcon
                                            name={tech.name}
                                            icon={tech.icon}
                                            className="w-8 h-8 text-slate-300 pointer-events-none"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Background Grid Decoration */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-20"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(circle at 50% 50%, #1e293b 1px, transparent 1px)",
                                    backgroundSize: "20px 20px"
                                }}
                            />

                            <div className="absolute top-4 w-full text-center pointer-events-none text-[10px] text-slate-500 font-mono tracking-widest uppercase animate-pulse z-0">
                                Playground Mode: Anti-Gravity Box
                            </div>
                        </motion.div>

                        {/* DESKTOP: Marquee (Infinite Scroll) */}
                        {/* Note: Gunakan hidden md:flex agar muncul HANYA di desktop */}
                        <motion.div
                            key="desktop-marquee"
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.8 }}
                            className="hidden md:flex overflow-hidden relative min-h-[120px] items-center"
                        >
                            {/* Gradient Masking Kiri Kanan */}
                            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-lara-dark to-transparent z-10 pointer-events-none" />
                            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-lara-dark to-transparent z-10 pointer-events-none" />

                            {/* Marquee List 1 */}
                            <div className="inline-flex animate-infinite-scroll gap-16 items-center pr-16">
                                {techStacks.map((tech, index) => (
                                    <div
                                        key={`list1-${index}`}
                                        className="flex items-center gap-3 shrink-0 group/item cursor-default"
                                    >
                                        <TechIcon
                                            name={tech.name}
                                            icon={tech.icon}
                                            className="w-8 h-8 text-slate-600 transition-all duration-500 grayscale group-hover/item:grayscale-0 group-hover/item:scale-110 group-hover/item:text-lara-blue"
                                        />
                                        <span className="text-xl font-heading font-bold text-slate-700 transition-colors duration-300 group-hover/item:text-slate-200 whitespace-nowrap">
                                            {tech.name}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Marquee List 2 - Duplicate for seamless loop */}
                            <div
                                className="inline-flex animate-infinite-scroll gap-16 items-center pr-16"
                                aria-hidden="true"
                            >
                                {techStacks.map((tech, index) => (
                                    <div
                                        key={`list2-${index}`}
                                        className="flex items-center gap-3 shrink-0 group/item cursor-default"
                                    >
                                        <TechIcon
                                            name={tech.name}
                                            icon={tech.icon}
                                            className="w-8 h-8 text-slate-600 transition-all duration-500 grayscale group-hover/item:grayscale-0 group-hover/item:scale-110 group-hover/item:text-lara-blue"
                                        />
                                        <span className="text-xl font-heading font-bold text-slate-700 transition-colors duration-300 group-hover/item:text-slate-200 whitespace-nowrap">
                                            {tech.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.section>
    );
}