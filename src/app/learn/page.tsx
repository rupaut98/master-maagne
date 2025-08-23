import Link from 'next/link';

export default function Learn() {
  const examples = [
    'Explain quantum entanglement',
    'How to build a startup',
    'Writing compelling characters',
    'The theory of relativity',
  ];

  return (
    <main>
      {/* Header */}
      <div>
        <Link href="/">
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
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          <span>Back</span>
        </Link>
        <h1>Ask AI Teachers</h1>
      </div>

      {/* Search Section */}
      <div>
        <h2>
          What would you like to
          <br />
          <span>learn today?</span>
        </h2>
        <p>
          Ask any question and our AI will create a personalized video lesson for you
        </p>

        {/* Search Bar */}
        <div>
          <input
            type="text"
            placeholder="How does quantum physics work? Or What makes a great leader?"
          />
          <button>
            Generate
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
          </button>
        </div>

        {/* Example Questions */}
        <div>
          {examples.map((example) => (
            <button key={example}>
              {example}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}