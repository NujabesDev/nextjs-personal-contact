'use client';

import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

// Using React 19 component style with explicit return
export default function ParticleBackground() {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    // Dynamically import Matter.js to avoid SSR issues in Next.js 15
    let isMounted = true;
    let cleanup = () => {};

    const setupMatter = async () => {
      if (!isMounted) return;
      
      // Matter.js modules
      const Engine = Matter.Engine;
      const Render = Matter.Render;
      const World = Matter.World;
      const Bodies = Matter.Bodies;
      const Body = Matter.Body;

      // Create engine with improved options for React 19
      const engine = Engine.create({
        gravity: { x: 0, y: 0 },
        enableSleeping: false,
      });
      engineRef.current = engine;

      // Only create renderer if we have a DOM element
      if (!sceneRef.current) return;

      // Create renderer with Next.js 15 optimizations
      const render = Render.create({
        element: sceneRef.current,
        engine: engine,
        options: {
          width: window.innerWidth,
          height: window.innerHeight,
          wireframes: false,
          background: 'transparent',
          pixelRatio: window.devicePixelRatio || 1,
          // Improved rendering for higher performance
          showSleeping: false,
          showDebug: false,
          showBroadphase: false,
          showBounds: false,
          showVelocity: false,
          showCollisions: false,
          showAxes: false,
          showPositions: false,
          showAngleIndicator: false,
          showIds: false,
        }
      });

      // Create particles with optimized count for performance
      const particleCount = Math.min(60, Math.floor(window.innerWidth / 25));
      const particles = [];

      // Brand color palette
      const colors = ['#872e1b', '#63854f', '#a8b4bc'];

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 6 + 1;
        // Distribute particles more evenly
        const x = Math.random() * (window.innerWidth - 20) + 10;
        const y = Math.random() * (window.innerHeight - 20) + 10;
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Create particle with optimized properties
        const particle = Bodies.circle(x, y, size, {
          friction: 0,
          frictionAir: 0.025,
          restitution: 0.8,
          render: {
            fillStyle: color,
            opacity: 0.7,
          },
          isStatic: false,
          // Add label for debugging
          label: 'particle',
        });
        
        // Add random velocity - more controlled for better aesthetic
        Body.setVelocity(particle, {
          x: (Math.random() - 0.5) * 1.5,
          y: (Math.random() - 0.5) * 1.5
        });
        
        particles.push(particle);
      }

      // Add particles to the world
      World.add(engine.world, particles);

      // Run the engine and renderer
      const runner = Engine.run(engine);
      Render.run(render);

      // Debounced resize handler for better performance
      let resizeTimeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (render && render.canvas) {
            render.options.width = window.innerWidth;
            render.options.height = window.innerHeight;
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;
            Render.setPixelRatio(render, window.devicePixelRatio || 1);
          }
        }, 250);
      };
      
      window.addEventListener('resize', handleResize);

      // Enhanced cleanup function
      cleanup = () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
        
        if (runner) {
          Engine.clear(engine);
          World.clear(engine.world);
          Engine.stop(runner);
        }
        
        if (render) {
          Render.stop(render);
          if (render.canvas) {
            render.canvas.remove();
          }
          render.canvas = null;
          render.context = null;
          render.textures = {};
        }
      };
    };

    setupMatter();

    // Cleanup with isMounted guard to prevent memory leaks
    return () => {
      isMounted = false;
      cleanup();
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}