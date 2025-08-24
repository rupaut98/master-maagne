import Link from 'next/link';

export default function Learn() {
  const examples = [
    'Explain quantum entanglement',
    'How to build a startup',
    'Writing compelling characters',
    'The theory of relativity',
  ];

  return (
    <main className="container-learn">
      {/* Header */}
      <div className="learn-header">
        <Link href="/" className="btn-secondary">
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
        <h1 className="learn-title">Ask Master Maagne</h1>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <h2 className="search-title">
          What would you like to
          <br />
          <span className="gradient-text">learn today?</span>
        </h2>
        <p className="search-subtitle">
          Ask any question and our AI will create a personalized video lesson for you
        </p>

        {/* Search Container */}
        <div className="search-container">
          <input
            type="text"
            placeholder="How does quantum physics work? Or What makes a great leader?"
            className="search-input"
          />
          <button className="btn-primary">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
            Generate
          </button>
        </div>

        {/* Examples Section */}
        <div className="examples-section">
          <p className="examples-label">Try these examples:</p>
          <div className="examples-grid">
            {examples.map((example) => (
              <button key={example} className="example-tag">
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}