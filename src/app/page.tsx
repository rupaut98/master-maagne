'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Home() {
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rippleRef.current) {
        const ripple = rippleRef.current;
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="container">
      {/* Logo Section */}
      <div className="logo-section">
        <div className="logo-container">
          <Image
            src="/eduai-logo.svg"
            alt="Master Maagne Logo"
            width={32}
            height={32}
            priority
          />
          <span className="logo-text">Master Maagne</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">
          Learn from
          <br />
          <span className="gradient-text">AI Legends</span>
        </h1>
        <p className="hero-subtitle">
          Get personalized lessons from AI-powered versions of
          Nepal's most famous personalities. Ask anything, learn everything.
        </p>
        <Link href="/learn" className="btn-primary">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="5,3 19,12 5,21" />
          </svg>
          Start Learning
        </Link>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
          </div>
          <h3 className="feature-title">AI-Powered</h3>
          <p className="feature-description">
            Advanced AI creates personalized video lessons with perfect lip sync
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
          </div>
          <h3 className="feature-title">Famous Teachers</h3>
          <p className="feature-description">
            Learn from Maagne Budo, Raju Master, Dhurmusey and other legendary figures
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10 2v20M14 2v20M4 7h16M4 17h16" />
            </svg>
          </div>
          <h3 className="feature-title">Instant Videos</h3>
          <p className="feature-description">
            Ask any question and get a custom educational video in seconds
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <div className="section-header">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            Passionate experts dedicated to the future of education
          </p>
        </div>
        
        <div className="team-grid">
          <div className="team-card">
            <div className="team-avatar">
              <Image
                src="/team/Rupak.jpeg"
                alt="Rupak Raut"
                width={80}
                height={80}
                className="avatar-image"
              />
            </div>
            <h3 className="team-name">Rupak raut</h3>
            <p className="team-role">Lead Engineer</p>
          </div>

          <div className="team-card">
            <div className="team-avatar">
              <Image
                src="/team/alisha.jpeg"
                alt="Alisha Khatri"
                width={80}
                height={80}
                className="avatar-image"
              />
            </div>
            <h3 className="team-name">Alisha Khatri</h3>
            <p className="team-role">Product Designer</p>
          </div>

          <div className="team-card">
            <div className="team-avatar">
              <Image
                src="/team/sushant.jpeg"
                alt="Sushant Aryal"
                width={80}
                height={80}
                className="avatar-image"
              />
            </div>
            <h3 className="team-name">Sushant Aryal</h3>
            <p className="team-role">Full Stack Developer</p>
          </div>

          <div className="team-card">
            <div className="team-avatar">
              <Image
                src="/team/bipul.jpeg"
                alt="Bipul Adhikari"
                width={80}
                height={80}
                className="avatar-image"
              />
            </div>
            <h3 className="team-name">Bipul Adhikari</h3>
            <p className="team-role">Frontend Developer</p>
          </div>
          
        </div>
      </div>

      {/* Demo Section */}
      <div className="demo-section">
        <div className="section-header">
          <h2 className="section-title">See It In Action</h2>
          <p className="section-subtitle">
            Experience the magic of AI-powered education
          </p>
        </div>
        
        <div className="demo-container">
          <div className="demo-video">
            <div className="video-placeholder">
              <div className="play-button">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
            </div>
            <div className="demo-overlay">
              <h3 className="demo-title">Watch Demo</h3>
              <p className="demo-description">
                See how Master Maagne creates personalized learning experiences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mouse Ripple Effect */}
      <div ref={rippleRef} className="mouse-ripple" />
    </main>
  );
}