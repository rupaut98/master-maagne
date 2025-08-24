'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function Learn() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const rippleRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);

  const examples = [
    'Explain quantum entanglement',
    'How to build a startup',
    'Writing compelling characters',
    'The theory of relativity',
    'Leadership principles',
    'Art of negotiation',
  ];

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

  const handleGenerate = () => {
    if (!searchQuery.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setShowVideo(true);
    }, 3000);
  };

  const handleExampleClick = (example: string) => {
    setSearchQuery(example);
  };

  const handleNewQuestion = () => {
    setShowVideo(false);
    setSearchQuery('');
  };

  return (
    <main className="learn-container">
      {!showVideo ? (
        <>
          {/* Header */}
          <header className="learn-header">
            <Link href="/" className="back-button">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Back
            </Link>
            <div className="header-content">
              <h1 className="page-title">Ask Master Maagne</h1>
              <p className="page-subtitle">Your AI-powered learning companion</p>
            </div>
          </header>

          {/* Main Search Section */}
          <section className="search-section">
            <div className="search-content">
              <h2 className="search-title">
                What would you like to
                <br />
                <span className="gradient-text">learn today?</span>
              </h2>
              <p className="search-description">
                Ask any question and our AI will create a personalized video lesson for you
              </p>

              {/* Enhanced Search Container */}
              <div className="search-box">
                <div className="search-input-container">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="How does quantum physics work? Or What makes a great leader?"
                    className="search-input"
                    onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                  />
                  <button 
                    onClick={handleGenerate}
                    disabled={!searchQuery.trim() || isGenerating}
                    className={`generate-button ${isGenerating ? 'loading' : ''}`}
                  >
                    {isGenerating ? (
                      <div className="loading-spinner" />
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                      </svg>
                    )}
                    <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
                  </button>
                </div>
              </div>

              {/* Examples Section */}
              <div className="examples-section">
                <p className="examples-label">Try these examples:</p>
                <div className="examples-grid">
                  {examples.map((example) => (
                    <button 
                      key={example} 
                      onClick={() => handleExampleClick(example)}
                      className="example-pill"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Loading State */}
          {isGenerating && (
            <section className="loading-section">
              <div className="loading-card">
                <div className="loading-animation">
                  <div className="pulse-ring"></div>
                  <div className="pulse-ring delay-1"></div>
                  <div className="pulse-ring delay-2"></div>
                </div>
                <h3 className="loading-title">Creating your personalized lesson</h3>
                <p className="loading-description">
                  Master Maagne is preparing an amazing video just for you...
                </p>
              </div>
            </section>
          )}
        </>
      ) : (
        /* Video Player Section */
        <section className="video-section">
          <header className="video-header">
            <button onClick={handleNewQuestion} className="back-button">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              New Question
            </button>
          </header>

          <div className="video-player">
            <div className="video-container">
              <div className="video-placeholder">
                <div className="play-overlay">
                  <button className="play-button-large">
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="video-info">
                <h2 className="video-question">"{searchQuery}"</h2>
                <p className="video-teacher">Taught by Master Maagne</p>
                
                <div className="video-controls">
                  <button className="control-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5Z" />
                    </svg>
                    Like
                  </button>
                  <button className="control-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Comment
                  </button>
                  <button className="control-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16,6 12,2 8,6" />
                      <line x1="12" x2="12" y1="2" y2="15" />
                    </svg>
                    Share
                  </button>
                  <button className="control-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                    </svg>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mouse Ripple Effect */}
      <div ref={rippleRef} className="mouse-ripple" />
      
      {/* Particle Container */}
      <div ref={particleContainerRef} className="particle-container" />
    </main>
  );
}