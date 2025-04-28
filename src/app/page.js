'use client';

import Link from 'next/link';
import ParticleBackground from '../components/ParticleBackground';

export default function Home() {
  // Prevent right-click context menu
  const handleContextMenu = (e) => e.preventDefault();

  return (
    <div className="background" onContextMenu={handleContextMenu}>
      <ParticleBackground />

      <h1>Matthew Witkowski</h1>

      {/* Social links with React 19 and Next.js 15 best practices */}
      <div className="social-icons" style={{ pointerEvents: 'auto' }}>
        <a 
          href="https://github.com/NujabesDev" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
        >
          <h2>GitHub</h2>
        </a>
        
        <h2 className="no-copy" aria-hidden="true">•</h2>
        
        <Link 
          href="/newsletter"
          aria-label="NASA Newsletter"
        >
          <h2>NASA Newsletter</h2>
        </Link>
        
        <h2 className="no-copy" aria-hidden="true">•</h2>
        
        <Link 
          href="/contact"
          aria-label="Contact Information"
        >
          <h2>Contact Me</h2>
        </Link>
      </div>
    </div>
  );
}