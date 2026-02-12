'use client';

import { useEffect, useState } from 'react';

interface ConfirmationScreenProps {
  name: string;
  onReturnToWelcome: () => void;
}

export default function ConfirmationScreen({ name, onReturnToWelcome }: ConfirmationScreenProps) {
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = 'https://katiecooperart.com/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-block p-4 bg-[var(--success)] rounded-full mb-4">
            <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-[var(--primary)]">
            Thank you, {name}
          </h1>
        </div>

        <div className="space-y-6 text-lg leading-relaxed text-[var(--foreground)]">
          <p>
            Your interpretation of The Levels of Consciousness Collection 
            has been recorded.
          </p>
          <p className="text-base text-gray-600">
            Enjoy the rest of your evening.
          </p>
        </div>

        <div className="mt-8 p-6 bg-white/80 rounded-lg border-2 border-[var(--accent)]">
          <p className="text-lg text-[var(--primary)] font-medium">
            You will now be redirected to Katie's art website in {countdown} seconds...
          </p>
          <a 
            href="https://katiecooperart.com/" 
            className="text-[var(--accent)] hover:underline text-sm mt-2 inline-block"
          >
            Click here if not redirected automatically
          </a>
        </div>

        <button
          onClick={onReturnToWelcome}
          className="mt-8 px-8 py-3 border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white text-lg font-medium rounded-lg transition-colors duration-200"
        >
          Return to Welcome
        </button>
      </div>
    </div>
  );
}
