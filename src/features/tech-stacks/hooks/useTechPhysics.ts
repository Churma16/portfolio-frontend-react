import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { TechStack } from "@/types";

export function useTechPhysics(techStacks: TechStack[]) {
    const sceneRef = useRef<HTMLDivElement>(null);
    const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
    const engineRef = useRef<Matter.Engine | null>(null);

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

        // --- OPTIMIZATION: Reduce Iterations ---
        engine.positionIterations = 3;
        engine.velocityIterations = 2;

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

        // --- GYROSCOPE LOGIC ---
        let isOrientationUpdatePending = false;
        const handleOrientation = (event: DeviceOrientationEvent) => {
            if (!engineRef.current || isOrientationUpdatePending) return;

            // --- OPTIMIZATION: Throttle Gyroscope updates to screen refresh rate ---
            isOrientationUpdatePending = true;
            requestAnimationFrame(() => {
                const {gamma, beta} = event;
                if (gamma !== null && beta !== null && engineRef.current) {
                    const gravityX = Math.min(Math.max(gamma / 45, -1.5), 1.5);
                    const gravityY = Math.min(Math.max(beta / 45, -1.5), 1.5);

                    engineRef.current.world.gravity.x = gravityX;
                    engineRef.current.world.gravity.y = gravityY;
                }
                isOrientationUpdatePending = false;
            });
        };

        // Pasang Event Listener
        window.addEventListener("deviceorientation", handleOrientation);

        // Render loop
        const runner = Runner.create();
        let animationId: number;

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
            animationId = requestAnimationFrame(updateLoop);
        };

        // --- OPTIMIZATION: Pause physics when out of view ---
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                Runner.run(runner, engine);
                animationId = requestAnimationFrame(updateLoop);
            } else {
                Runner.stop(runner);
                cancelAnimationFrame(animationId);
            }
        }, { threshold: 0 });

        observer.observe(sceneRef.current);

        return () => {
            // Bersihkan Event Listener dan Observer saat component unmount
            window.removeEventListener("deviceorientation", handleOrientation);
            observer.disconnect();

            Runner.stop(runner);
            World.clear(world, false);
            Engine.clear(engine);
            cancelAnimationFrame(animationId);
            engineRef.current = null;
        };
    }, [techStacks]);

    return { sceneRef, boxRefs };
}
