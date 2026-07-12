import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Matter from "matter-js";
import {Sparkles} from "lucide-react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    size: number;
    color: string;
}

export default function NotFoundPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState({x: 0, y: 0});

    useEffect(() => {
        if (!canvasRef.current) return;

        // Matter.js module aliases
        const Engine = Matter.Engine;
        const World = Matter.World;
        const Bodies = Matter.Bodies;
        const Composite = Matter.Composite;
        const Events = Matter.Events;

        // Create engine with custom gravity
        const engine = Engine.create();
        engine.world.gravity.y = 0.8;

        const width = window.innerWidth;
        const height = window.innerHeight;

        // Create renderer
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d")!;
        canvas.width = width;
        canvas.height = height;

        // Particle system
        let particles: Particle[] = [];

        const createParticles = (x: number, y: number, count: number = 8) => {
            const colors = ["#60a5fa", "#3b82f6", "#ec4899", "#f472b6", "#8b5cf6", "#a78bfa"];
            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 * i) / count;
                const speed = Math.random() * 3 + 2;
                particles.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 1,
                    life: 1,
                    size: Math.random() * 3 + 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                });
            }
        };

        // Create static boundaries
        const ground = Bodies.rectangle(width / 2, height + 20, width + 100, 40, {isStatic: true});
        const leftWall = Bodies.rectangle(-20, height / 2, 40, height + 100, {isStatic: true});
        const rightWall = Bodies.rectangle(width + 20, height / 2, 40, height + 100, {isStatic: true});
        const ceiling = Bodies.rectangle(width / 2, -20, width + 100, 40, {isStatic: true});

        World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

        // Color palettes
        const colors = {
            circles: ["#60a5fa", "#3b82f6", "#0ea5e9"],
            polygons: ["#ec4899", "#f472b6", "#db2777"],
            accents: ["#8b5cf6", "#a78bfa", "#c4b5fd"],
        };

        // Responsive object count based on screen size
        const isMobile = width < 768;
        const initialObjectCount = isMobile ? 10 : 20;
        const maxObjectCount = isMobile ? 30 : 60;

        // Create initial objects
        const objects: any[] = [];
        for (let i = 0; i < initialObjectCount; i++) {
            const size = Math.random() * 18 + 12;
            const type = Math.random();
            let obj;

            if (type < 0.5) {
                obj = Bodies.circle(Math.random() * width, Math.random() * (height * 0.4), size / 2, {
                    friction: 0.6,
                    restitution: 0.85,
                    frictionAir: 0.015,
                    density: 0.002,
                    label: "circle",
                });
            } else {
                obj = Bodies.polygon(
                    Math.random() * width,
                    Math.random() * (height * 0.4),
                    Math.floor(Math.random() * 3) + 4,
                    size,
                    {
                        friction: 0.5,
                        restitution: 0.8,
                        frictionAir: 0.02,
                        density: 0.0015,
                        label: "polygon",
                    }
                );
            }
            objects.push(obj);
        }
        World.add(engine.world, objects);

        // Mouse interaction
        let lastClickTime = 0;
        const handleClick = (e: MouseEvent) => {
            const now = Date.now();
            const size = Math.random() * 20 + 15;

            // Prevent too many objects - respect device limits
            if (objects.length < maxObjectCount) {
                const newBody = Bodies.circle(e.clientX, e.clientY, size / 2, {
                    friction: 0.5,
                    restitution: 0.9,
                    frictionAir: 0.01,
                    density: 0.002,
                });
                World.add(engine.world, newBody);
                objects.push(newBody);
            }

            // Create particles on click
            if (now - lastClickTime > 50) {
                createParticles(e.clientX, e.clientY, 12);
                lastClickTime = now;
            }
        };

        // Update mouse position for proximity effects
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({x: e.clientX, y: e.clientY});
        };

        canvas.addEventListener("click", handleClick);
        canvas.addEventListener("mousemove", handleMouseMove);

        // Animation loop
        let frameCount = 0;
        const animate = () => {
            frameCount++;
            Engine.update(engine);

            // Draw animated background
            const bgGradient = ctx.createLinearGradient(0, 0, width, height);
            bgGradient.addColorStop(0, "#0f172a");
            bgGradient.addColorStop(0.3, "#1a2847");
            bgGradient.addColorStop(0.5, "#1e293b");
            bgGradient.addColorStop(0.7, "#1a2847");
            bgGradient.addColorStop(1, "#0d1b2a");
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, width, height);


            // Draw animated background grid with glow - Responsive
            const gridOpacity = 0.03 + Math.sin(frameCount * 0.005) * 0.02;
            ctx.strokeStyle = `rgba(100, 150, 255, ${gridOpacity})`;
            ctx.lineWidth = 1;
            const gridSize = Math.max(30, Math.min(60, width / 20)); // Responsive grid size
            for (let x = 0; x < width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y < height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // Draw pulsing orbs in background - Responsive positioning
            for (let i = 0; i < 3; i++) {
                const orbX = (width / 4) * (i + 1);
                const orbY = (height / 3) * (i % 2 + 1);
                const baseOrbSize = Math.max(30, Math.min(60, Math.min(width, height) * 0.15));
                const orbSize = Math.sin(frameCount * 0.003 + i) * (baseOrbSize * 0.5) + baseOrbSize;
                const orbOpacity = Math.sin(frameCount * 0.004 + i * Math.PI / 3) * 0.05 + 0.03;

                const orbGradient = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbSize);
                orbGradient.addColorStop(0, `rgba(96, 165, 250, ${orbOpacity})`);
                orbGradient.addColorStop(1, `rgba(96, 165, 250, 0)`);
                ctx.fillStyle = orbGradient;
                ctx.beginPath();
                ctx.arc(orbX, orbY, orbSize, 0, Math.PI * 2);
                ctx.fill();
            }

            // Update and draw particles with trails
            particles = particles.filter((p) => p.life > 0);
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.15;
                p.life -= 0.02;

                // Draw particle trail
                ctx.globalAlpha = p.life * 0.3;
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 10;
                for (let i = 1; i < 3; i++) {
                    ctx.globalAlpha = (p.life * 0.3) / i;
                    ctx.beginPath();
                    ctx.arc(p.x - p.vx * i, p.y - p.vy * i, p.size / i, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Draw main particle with glow
                ctx.globalAlpha = p.life;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 15;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
                ctx.shadowColor = "transparent";
            });

            // Draw all physics bodies
            const bodies = Composite.allBodies(engine.world);
            bodies.forEach((body) => {
                if (body.isStatic) return;

                ctx.save();
                ctx.translate(body.position.x, body.position.y);
                ctx.rotate(body.angle);

                // Draw shadow
                ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
                ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
                ctx.shadowBlur = 15;
                ctx.shadowOffsetY = 5;

                if (body.label === "circle") {
                    // Animated circle with glow
                    const glowIntensity = Math.sin(frameCount * 0.02) * 0.3 + 0.7;
                    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, body.circleRadius!);
                    gradient.addColorStop(0, `rgba(96, 165, 250, ${glowIntensity})`);
                    gradient.addColorStop(0.7, `rgba(59, 130, 246, 0.8)`);
                    gradient.addColorStop(1, `rgba(30, 58, 138, 0.5)`);

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(0, 0, body.circleRadius!, 0, Math.PI * 2);
                    ctx.fill();

                    // Glow effect
                    ctx.strokeStyle = `rgba(147, 197, 253, ${0.5 + glowIntensity * 0.5})`;
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    // Inner highlight
                    ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + glowIntensity * 0.3})`;
                    ctx.beginPath();
                    ctx.arc(
                        -body.circleRadius! * 0.3,
                        -body.circleRadius! * 0.3,
                        body.circleRadius! * 0.4,
                        0,
                        Math.PI * 2
                    );
                    ctx.fill();
                } else {
                    // Polygon with gradient
                    const vertices = body.vertices;
                    const gradient = ctx.createLinearGradient(-30, -30, 30, 30);
                    gradient.addColorStop(0, "#ec4899");
                    gradient.addColorStop(0.5, "#f472b6");
                    gradient.addColorStop(1, "#db2777");

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.moveTo(vertices[0].x - body.position.x, vertices[0].y - body.position.y);
                    for (let i = 1; i < vertices.length; i++) {
                        ctx.lineTo(vertices[i].x - body.position.x, vertices[i].y - body.position.y);
                    }
                    ctx.closePath();
                    ctx.fill();

                    // Polygon outline glow
                    ctx.strokeStyle = "rgba(248, 113, 182, 0.8)";
                    ctx.lineWidth = 2.5;
                    ctx.stroke();
                }

                ctx.restore();
            });

            // Draw main text with advanced glow effects - Responsive sizing
            ctx.save();
            ctx.globalAlpha = 0.95;

            // Responsive font size based on screen width
            const fontSize404 = Math.max(80, Math.min(160, width * 0.35));
            const fontSizeTitle = Math.max(28, Math.min(48, width * 0.15));
            const fontSizeSubtitle = Math.max(14, Math.min(18, width * 0.045));

            // Multiple glow layers for 404
            const glowIntensity = Math.sin(frameCount * 0.005) * 0.2 + 0.3;
            for (let i = 3; i > 0; i--) {
                ctx.shadowColor = `rgba(59, 130, 246, ${glowIntensity * (1 - i / 3)})`;
                ctx.shadowBlur = 30 * i;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.fillStyle = "#ffffff";
                ctx.font = `bold ${fontSize404}px 'Arial', sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("404", width / 2, height / 2 - (fontSize404 * 0.5));
            }

            // Main "Page Not Found" text with gradient
            ctx.shadowColor = "rgba(236, 72, 153, 0.8)";
            ctx.shadowBlur = 25;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.font = `700 ${fontSizeTitle}px 'Arial', sans-serif`;
            ctx.fillStyle = "#e0e7ff";
            ctx.fillText("Page Not Found", width / 2, height / 2 + 30);

            // Enhanced subtitle with animation
            const subtitleGlow = Math.sin(frameCount * 0.004) * 0.3 + 0.65;
            ctx.shadowColor = `rgba(148, 163, 184, ${subtitleGlow * 0.5})`;
            ctx.shadowBlur = 15;
            ctx.font = `400 ${fontSizeSubtitle}px 'Arial', sans-serif`;
            ctx.fillStyle = `rgba(148, 163, 184, ${subtitleGlow})`;
            ctx.fillText(
                "The page you're looking for has gone missing",
                width / 2,
                height / 2 + (fontSizeTitle * 1.3) + 20
            );

            ctx.restore();

            requestAnimationFrame(animate);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            canvas.removeEventListener("click", handleClick);
            canvas.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-slate-950">
            {/* Canvas for Matter.js animation */}
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
            />

            {/* Navigation buttons overlay - Responsive */}
            <div
                className="absolute bottom-8 md:bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row gap-4 md:gap-6 z-20 px-4 w-full md:w-auto">
                <Link
                    to="/"
                    className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg md:rounded-xl font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-blue-500/50 overflow-hidden text-center"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        ← Go Home
                    </span>
                    <div
                        className="absolute inset-0 bg-blue-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-0"/>
                </Link>
                <Link
                    to="/login"
                    className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-lg md:rounded-xl font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-pink-500/50 overflow-hidden text-center"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Login
                    </span>
                    <div
                        className="absolute inset-0 bg-pink-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-0"/>
                </Link>
            </div>

            {/* Floating instruction - Responsive text size */}
            <div
                className="absolute top-6 md:top-12 left-1/2 transform -translate-x-1/2 text-center z-20 pointer-events-none px-4">
                <p className="text-gray-300 text-xs md:text-sm font-medium tracking-wide flex items-center gap-1 justify-center">
                    <Sparkles className="w-4 h-4 text-yellow-400" /> Click anywhere to create chaos <Sparkles className="w-4 h-4 text-yellow-400" />
                </p>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"/>
            <div
                className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl pointer-events-none"/>
        </div>
    );
}
