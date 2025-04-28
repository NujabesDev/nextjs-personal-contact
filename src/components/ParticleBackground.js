// 1. Updated ParticleBackground.js with proper hydration handling
'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

export default function ParticleBackground() {
  const sceneRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Only mount component on client-side to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  useEffect(() => {
    if (!isMounted) return;
    
    // Only import Matter.js on the client side
    const importMatter = async () => {
      try {
        const Matter = await import('matter-js');
        
        if (!sceneRef.current) return;
        
        // Matter.js setup
        const Engine = Matter.Engine;
        const Render = Matter.Render;
        const World = Matter.World;
        const Bodies = Matter.Bodies;
        const Body = Matter.Body;
        
        const engine = Engine.create({
          gravity: { x: 0, y: 0 },
          enableSleeping: false,
        });
        
        const render = Render.create({
          element: sceneRef.current,
          engine: engine,
          options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false,
            background: 'transparent',
            pixelRatio: 1, // Use 1 for better performance
          }
        });
        
        // Create particles
        const particleCount = Math.min(40, Math.floor(window.innerWidth / 30)); // Reduced count
        const particles = [];
        
        const colors = ['#872e1b', '#63854f', '#a8b4bc'];
        
        for (let i = 0; i < particleCount; i++) {
          const size = Math.random() * 4 + 1; // Smaller particles
          const x = Math.random() * window.innerWidth;
          const y = Math.random() * window.innerHeight;
          
          const color = colors[Math.floor(Math.random() * colors.length)];
          
          const particle = Bodies.circle(x, y, size, {
            friction: 0,
            frictionAir: 0.03, // Increased for stability
            restitution: 0.7,
            render: {
              fillStyle: color,
              opacity: 0.6,
            }
          });
          
          Body.setVelocity(particle, {
            x: (Math.random() - 0.5) * 1,
            y: (Math.random() - 0.5) * 1
          });
          
          particles.push(particle);
        }
        
        World.add(engine.world, particles);
        
        const runner = Engine.run(engine);
        Render.run(render);
        
        // Simplified resize handler
        const handleResize = () => {
          if (render.canvas) {
            render.options.width = window.innerWidth;
            render.options.height = window.innerHeight;
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;
          }
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
          window.removeEventListener('resize', handleResize);
          
          if (runner) Engine.stop(runner);
          if (render) Render.stop(render);
          
          if (render.canvas) {
            render.canvas.remove();
            render.canvas = null;
            render.context = null;
          }
          
          World.clear(engine.world);
          Engine.clear(engine);
        };
      } catch (error) {
        console.error('Failed to initialize Matter.js:', error);
      }
    };
    
    importMatter();
  }, [isMounted]);
  
  // Only render the container if mounted (client-side)
  if (!isMounted) return null;
  
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
