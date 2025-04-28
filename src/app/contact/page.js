'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import ParticleBackground from '../../components/ParticleBackground';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "me@mattheww.org";

  // Use useCallback for event handlers in React 19
  const copyEmail = useCallback(() => {
    // Using async/await with try/catch for better error handling
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        
        // Clear the copied state after 2 seconds
        const timer = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timer); // Cleanup to prevent memory leaks
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    };
    
    copyToClipboard();
  }, []);

  return (
    <div className="background">
      <ParticleBackground />

      <h1>Contact Me</h1>

      <div className="contact-container">
        <h2 className="contact-description">
          Feel free to reach out with questions, collaboration opportunities, or just to say hello.
        </h2>

        <div className="contact-email" style={{ position: 'relative' }}>
          <button 
            onClick={copyEmail} 
            className="email-text"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              margin: 0,
              font: 'inherit',
              color: 'inherit',
              cursor: 'pointer'
            }}
            aria-label="Copy email address to clipboard"
          >
            {email}
          </button>

          {copied && (
            <span className="tooltip" role="status" aria-live="polite">
              Copied!
            </span>
          )}
        </div>
      </div>

      <div className="social-icons">
        <Link href="/" aria-label="Back to home page">
          <h2>Back to Home</h2>
        </Link>
      </div>
    </div>
  );
}