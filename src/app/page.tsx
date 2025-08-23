import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* Logo */}
      <div>
        <div>
          <Image
            src="/eduai-logo.svg"
            alt="EduAI Logo"
            width={80}
            height={80}
            priority
          />
          <h2>EduAI</h2>
        </div>

        {/* Hero Section */}
        <div>
          <h1>
            Learn from
            <br />
            <span>AI Legends</span>
          </h1>
          <p>
            Get personalized lessons from AI-powered versions of
            <br />
            history's greatest minds. Ask anything, learn everything.
          </p>
          <Link href="/learn">
            Start Learning
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Features Grid */}
        <div>
          <div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <h3>AI-Powered</h3>
            <p>
              Advanced AI creates personalized video lessons with perfect lip sync
            </p>
          </div>

          <div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </div>
            <h3>Famous Teachers</h3>
            <p>
              Learn from Einstein, Jobs, Shakespeare and other legendary figures
            </p>
          </div>

          <div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <h3>Instant Videos</h3>
            <p>
              Ask any question and get a custom educational video in seconds
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}