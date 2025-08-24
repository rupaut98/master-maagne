'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Home() {
  const rippleRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrame: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
    }> = [];

    const bubbles: Array<{
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      size: number;
      life: number;
      maxLife: number;
      color: string;
      delay: number;
      opacity: number;
    }> = [];

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (rippleRef.current) {
        const ripple = rippleRef.current;
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        
        // Add subtle cursor-following intensity
        const intensity = Math.min(Math.sqrt(e.movementX ** 2 + e.movementY ** 2) / 10, 1);
        ripple.style.opacity = `${0.3 + intensity * 0.4}`;
      }

      // Create floating bubbles that follow the cursor
      if (Math.random() < 0.4) { // 40% chance to create bubble
        const colors = [
          'rgba(168, 85, 247, 0.3)', 
          'rgba(244, 114, 182, 0.3)', 
          'rgba(251, 146, 60, 0.3)',
          'rgba(139, 92, 246, 0.25)',
          'rgba(236, 72, 153, 0.25)'
        ];
        const size = 15 + Math.random() * 25; // Random size between 15-40px
        
        bubbles.push({
          x: e.clientX + (Math.random() - 0.5) * 100,
          y: e.clientY + (Math.random() - 0.5) * 100,
          targetX: e.clientX,
          targetY: e.clientY,
          size: size,
          life: 180,
          maxLife: 180,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 30,
          opacity: 0.7 + Math.random() * 0.3
        });
      }

      // Create particle trail on mouse movement
      if (Math.random() < 0.2) { // Reduced chance for particles since we have bubbles
        const colors = ['rgba(168, 85, 247, 0.6)', 'rgba(244, 114, 182, 0.6)', 'rgba(251, 146, 60, 0.6)'];
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1,
          life: 60,
          maxLife: 60,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Create burst effect on click
      const burst = document.createElement('div');
      burst.className = 'click-burst';
      burst.style.left = `${e.clientX}px`;
      burst.style.top = `${e.clientY}px`;
      document.body.appendChild(burst);

      setTimeout(() => {
        if (burst.parentNode) {
          burst.parentNode.removeChild(burst);
        }
      }, 600);

      // Create multiple particles on click
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        const speed = 3 + Math.random() * 2;
        const colors = ['rgba(168, 85, 247, 0.8)', 'rgba(244, 114, 182, 0.8)', 'rgba(251, 146, 60, 0.8)'];
        
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 120,
          maxLife: 120,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const updateParticles = () => {
      if (particleContainerRef.current) {
        const container = particleContainerRef.current;
        container.innerHTML = '';

        // Update and render bubbles
        for (let i = bubbles.length - 1; i >= 0; i--) {
          const bubble = bubbles[i];
          
          // Smooth following behavior with delay
          if (bubble.delay > 0) {
            bubble.delay--;
          } else {
            const dx = mouseX - bubble.x;
            const dy = mouseY - bubble.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Smooth easing towards cursor
            const ease = 0.02 + (1 / (bubble.size / 10)); // Smaller bubbles move faster
            bubble.x += dx * ease;
            bubble.y += dy * ease;
            
            // Add gentle floating motion
            bubble.y += Math.sin(Date.now() * 0.001 + i) * 0.5;
            bubble.x += Math.cos(Date.now() * 0.0008 + i) * 0.3;
          }
          
          bubble.life--;

          if (bubble.life <= 0) {
            bubbles.splice(i, 1);
            continue;
          }

          // Create bubble element
          const bubbleEl = document.createElement('div');
          bubbleEl.className = 'bubble';
          bubbleEl.style.left = `${bubble.x}px`;
          bubbleEl.style.top = `${bubble.y}px`;
          bubbleEl.style.width = `${bubble.size}px`;
          bubbleEl.style.height = `${bubble.size}px`;
          bubbleEl.style.backgroundColor = bubble.color;
          
          // Fade out effect
          const lifeRatio = bubble.life / bubble.maxLife;
          bubbleEl.style.opacity = `${lifeRatio * bubble.opacity}`;
          bubbleEl.style.transform = `scale(${0.5 + lifeRatio * 0.5})`;
          
          container.appendChild(bubbleEl);
        }

        // Update and render particles (existing code)
        for (let i = particles.length - 1; i >= 0; i--) {
          const particle = particles[i];
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vy += 0.05; // gravity
          particle.life--;

          if (particle.life <= 0) {
            particles.splice(i, 1);
            continue;
          }

          const particleEl = document.createElement('div');
          particleEl.className = 'particle';
          particleEl.style.left = `${particle.x}px`;
          particleEl.style.top = `${particle.y}px`;
          particleEl.style.backgroundColor = particle.color;
          particleEl.style.opacity = `${particle.life / particle.maxLife}`;
          container.appendChild(particleEl);
        }
      }

      animationFrame = requestAnimationFrame(updateParticles);
    };

    updateParticles();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animationFrame);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
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
            <iframe
              src="https://drive.google.com/file/d/1uBn7wFtAwrSW3O2w_jgZN0MByDGRGggz/preview"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ borderRadius: '12px' }}
              title="Master Maagne Demo Video"
            />
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
      
      {/* Particle Container */}
      <div ref={particleContainerRef} className="particle-container" />
    </main>
  );
}