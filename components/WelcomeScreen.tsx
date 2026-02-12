'use client';

interface WelcomeScreenProps {
  onBegin: () => void;
}

export default function WelcomeScreen({ onBegin }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-light tracking-wide text-[var(--primary)]">
            Welcome to
          </h1>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-wide text-[var(--primary)]">
            The Levels of Consciousness Collection
          </h2>
        </div>

        <div className="space-y-6 text-lg leading-relaxed text-[var(--foreground)]">
          <p>
            You are invited to explore Katie Cooper's new exhibition 
            and share your interpretation of each piece.
          </p>
          <p>
            As you view each painting, consider which level of 
            consciousness it represents to you, then record your 
            choice here.
          </p>
        </div>

        <button
          onClick={onBegin}
          className="mt-12 px-12 py-4 bg-[var(--accent)] hover:bg-[#998562] text-white text-xl font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Begin Experience
        </button>
      </div>
    </div>
  );
}
