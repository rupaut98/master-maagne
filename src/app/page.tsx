import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
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
    </main>
  );
}