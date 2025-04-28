'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Import the ParticleBackground component with dynamic import
// This will prevent it from being included in server-side rendering
const ParticleBackground = dynamic(
  () => import('../components/ParticleBackground'),
  { ssr: false }
);

export default function Home() {
  // Use state to track client-side mounting
  const [mounted, setMounted] = useState(false);
  
  // Only run after component mounts in the browser
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Prevent right-click context menu
  const handleContextMenu = (e) => e.preventDefault();

  return (
    <div className="background" onContextMenu={handleContextMenu}>
      {/* Only render ParticleBackground on client side */}
      {mounted && <ParticleBackground />}

      <h1>Matthew Witkowski</h1>

      {/* Social links */}
      <div className="social-icons" style={{ pointerEvents: 'auto' }}>
        <a 
          href="https://github.com/NujabesDev" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <h2>GitHub</h2>
        </a>
        
        <h2 className="no-copy" aria-hidden="true">•</h2>
        
        <Link href="/newsletter">
          <h2>NASA Newsletter</h2>
        </Link>
        
        <h2 className="no-copy" aria-hidden="true">•</h2>
        
        <Link href="/contact">
          <h2>Contact Me</h2>
        </Link>
      </div>
    </div>
  );
}