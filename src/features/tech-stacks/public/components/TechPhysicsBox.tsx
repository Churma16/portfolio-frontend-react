import {useEffect, useRef, useState} from "react";
import Matter from "matter-js";
import {motion} from "framer-motion";
import TechIcon from "../../../../components/common/TechIcon.tsx";
import {TechStack} from "@/types";

interface TechPhysicsBoxProps {
    techStacks: TechStack[];
}

export default function TechPhysicsBox({techStacks}: TechPhysicsBoxProps) {
    const sceneRef = useRef<HTMLDivElement>(null);
    const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
    const engineRef = useRef<Matter.Engine | null>(null);

    // State untuk izin iOS (jika diperlukan nanti)
    const [permissionGranted, setPermissionGranted] = useState(false);

    // --- PHYSICS SETUP (Mobile Only) ---
    useEffect(() => {
        if (
            !sceneRef.current ||
            techStacks.length === 0 ||
            sceneRef.current.clientWidth === 0
        ) return;

        // Initialize Matter.js engine and world
        const Engine = Matter.Engine;
        const World = Matter.World;
        const Bodies = Matter.Bodies;
        const Mouse = Matter.Mouse;
        const MouseConstraint = Matter.MouseConstraint;
        const Runner = Matter.Runner;
        const Events = Matter.Events;

        // Initialize engine
        const engine = Engine.create();
        const world = engine.world;
        engineRef.current = engine;

        // --- SETUP GRAVITASI AWAL ---
        // Default gravitasi ke bawah
        engine.world.gravity.y = 1;
        engine.world.gravity.x = 0;

        // Initiate scene dimensions
        const width = sceneRef.current.clientWidth;
        const height = sceneRef.current.clientHeight;

        // Create walls
        const wallThickness = 500;
        const walls = [
            Bodies.rectangle(width / 2, height + wallThickness / 2, width + 200, wallThickness, {isStatic: true}),
            Bodies.rectangle(0 - wallThickness / 2, height / 2, wallThickness, height * 2, {isStatic: true}),
            Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, {isStatic: true}),
            Bodies.rectangle(width / 2, -wallThickness / 2, width + 200, wallThickness, {isStatic: true}),
        ];
        World.add(world, walls);

        // Create tech bodies
        const techBodies = techStacks.map(() => {
            const size = 60;
            return Bodies.rectangle(
                Math.random() * (width - 100) + 50,
                Math.random() * (height / 3),
                size,
                size,
                {
                    restitution: 0.5,
                    friction: 0.5,
                    density: 0.05,
                    angle: Math.random() * Math.PI * 2,
                }
            );
        });
        World.add(world, techBodies);

        // Mouse interaction
        const mouse = Mouse.create(sceneRef.current);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.1,
                render: {visible: false},
            },
        });

        // @ts-ignore
        mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
        // @ts-ignore
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
        World.add(world, mouseConstraint);

        // Respawn system
        Events.on(engine, "beforeUpdate", () => {
            techBodies.forEach((body) => {
                const {x, y} = body.position;
                const buffer = 100;
                const isOutsideX = x < -buffer || x > width + buffer;
                const isOutsideY = y < -buffer || y > height + buffer;

                if (isOutsideX || isOutsideY) {
                    Matter.Body.setPosition(body, {
                        x: width / 2 + (Math.random() * 40 - 20),
                        y: height / 2,
                    });
                    Matter.Body.setVelocity(body, {x: 0, y: 0});
                }
            });
        });

        // --- GYROSCOPE LOGIC (BAGIAN BARU) ---
        const handleOrientation = (event: DeviceOrientationEvent) => {
            if (!engineRef.current) return;

            const {gamma, beta} = event;
            // Gamma: Miring Kiri/Kanan (-90 sampai 90)
            // Beta: Miring Depan/Belakang (-180 sampai 180)

            if (gamma === null || beta === null) return;

            // Kita batasi gravitasi maksimal di angka 1 atau 1.5 supaya tidak terlalu ngebut
            // Membagi dengan 45 artinya kemiringan 45 derajat akan menghasilkan gravitasi 1G
            const gravityX = Math.min(Math.max(gamma / 45, -1.5), 1.5);
            const gravityY = Math.min(Math.max(beta / 45, -1.5), 1.5);

            engineRef.current.world.gravity.x = gravityX;
            engineRef.current.world.gravity.y = gravityY;
        };

        // Pasang Event Listener
        window.addEventListener("deviceorientation", handleOrientation);

        // Render loop
        const runner = Runner.create();
        Runner.run(runner, engine);

        const updateLoop = () => {
            if (!sceneRef.current) return;
            techBodies.forEach((body, index) => {
                const domNode = boxRefs.current[index];
                if (domNode) {
                    const {x, y} = body.position;
                    const angle = body.angle;
                    domNode.style.transform = `translate(${x - 30}px, ${y - 30}px) rotate(${angle}rad)`;
                }
            });
            requestAnimationFrame(updateLoop);
        };
        const animationId = requestAnimationFrame(updateLoop);

        return () => {
            // Bersihkan Event Listener saat component unmount
            window.removeEventListener("deviceorientation", handleOrientation);

            Runner.stop(runner);
            World.clear(world, false);
            Engine.clear(engine);
            cancelAnimationFrame(animationId);
            engineRef.current = null;
        };
    }, [techStacks]);

    return (
        <motion.div
            initial={{opacity: 0, filter: "blur(10px)"}}
            animate={{opacity: 1, filter: "blur(0px)"}}
            transition={{duration: 0.8}}
            className="md:hidden relative w-full h-[450px] bg-transparent overflow-hidden touch-none select-none"
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
                        className="absolute top-0 left-0 w-[60px] h-[60px] bg-card/80 backdrop-blur-md border border-border/50 rounded-xl shadow-lg flex flex-col items-center justify-center select-none will-change-transform z-10"
                        style={{transform: "translate(-999px, -999px)"}}
                    >
                        <TechIcon
                            name={tech.name}
                            icon={tech.icon}
                            className="w-8 h-8 text-foreground pointer-events-none"
                        />
                        <span className="text-[8px] text-muted-foreground mt-1 pointer-events-none">
                        {tech.name}
                        </span>
                    </div>
                ))}
            </div>

            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 50% 50%, #1e293b 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                }}
            />

            <div
                className="absolute top-4 w-full text-center pointer-events-none text-[10px] text-muted-foreground font-mono tracking-widest uppercase animate-pulse z-0">
                Physics Playground: Move The Box!
            </div>
        </motion.div>
    );
}