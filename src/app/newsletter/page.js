'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import newsletterImage from '../../assets/imgs/newsletterImage.svg';

export default function Newsletter() {
  useEffect(() => {
    // Load Mailchimp validation script - cleaner implementation for React 19
    const loadMailchimpScript = async () => {
      // Create script element
      const script = document.createElement('script');
      script.src = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';
      script.async = true;
      
      // Setup onload handler before appending to avoid race conditions
      const onScriptLoad = () => {
        // Initialize Mailchimp variables
        window.fnames = [];
        window.ftypes = [];
        window.fnames[0] = 'EMAIL';
        window.ftypes[0] = 'email';
        
        // Remove event listener to prevent memory leaks
        script.removeEventListener('load', onScriptLoad);
      };
      
      script.addEventListener('load', onScriptLoad);
      
      // Append script to body
      document.body.appendChild(script);
      
      // Return cleanup function
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    };
    
    // Execute the function
    const cleanup = loadMailchimpScript();
    
    // Return the cleanup function
    return () => {
      if (cleanup && typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, []);

  return (
    <div className="background">
      <div className="main-text">
        <h1>NASA Newsletter</h1>
        <h2>Get a beautiful picture handpicked by NASA daily.</h2>
      </div>

      {/* Using Next.js 15 Image component with updated props */}
      <div className="newsletter-image">
        <Image 
          src={newsletterImage} 
          alt="Example of Newsletter" 
          width={500}
          height={300}
          priority={true}
          sizes="(max-width: 600px) 80vw, 40vw"
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '500px',
          }}
        />
      </div>
      <p className="image-description">Example of Newsletter</p>

      <div className="newsletter-form">
        <p className="form-description">
          Do you live in a big city? Does the smog of our industrialization block out the stars for you?
          Have you forgotten the beauty of our galaxy? Sign up for this newsletter to get a different photograph
          of our universe, with a brief explanation written by a professional astronomer. Each photo is randomly
          chosen through the archive, so even those who actively check the{' '}
          <a 
            href="https://apod.nasa.gov/apod/astropix.html" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="NASA Astronomy Picture of the Day website"
          >
            APOD
          </a>{' '}
          daily will still find this useful! All copyright is respected.
        </p>

        <div id="mc_embed_signup">
          <form
            action={process.env.NEXT_PUBLIC_MAILCHIMP_FORM_URL}
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            aria-labelledby="newsletter-heading"
          >
            <div id="mc_embed_signup_scroll">
              <h3 id="newsletter-heading" className="visually-hidden">Subscribe to NASA Newsletter</h3>
              
              <div className="mc-field-group">
                <label htmlFor="mce-EMAIL">Email Address</label>
                <input 
                  type="email" 
                  name="EMAIL" 
                  className="required email" 
                  id="mce-EMAIL" 
                  required 
                  aria-required="true"
                  placeholder="your@email.com"
                />
              </div>
              
              <div id="mce-responses" className="clear foot">
                <div className="response" id="mce-error-response" style={{ display: 'none' }} aria-live="polite" />
                <div className="response" id="mce-success-response" style={{ display: 'none' }} aria-live="polite" />
              </div>
              
              {/* Hidden anti-spam field */}
              <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                <input type="text" name="b_9911ecda9191c30d933073fa2_383d9bb83d" tabIndex="-1" defaultValue="" />
              </div>
              
              <div className="clear foot">
                <input
                  type="submit"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="button"
                  value="Subscribe"
                  aria-label="Subscribe to newsletter"
                />
              </div>
            </div>
          </form>
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