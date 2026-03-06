'use client';

import { useState } from 'react';

interface RegistrationFormProps {
  onContinue: (name: string, email: string) => void;
  emailExists: (email: string) => Promise<boolean>;
}

export default function RegistrationForm({ onContinue, emailExists }: RegistrationFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (name.trim().length < 2) {
      setError('Please enter your name (minimum 2 characters)');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    const exists = await emailExists(email);
    if (exists) {
      setError("You've already submitted your choices. Thank you for participating!");
      return;
    }

    onContinue(name.trim(), email.trim().toLowerCase());
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-semibold text-[var(--primary)]">
            Before we begin, please introduce yourself.
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none text-[var(--foreground)] bg-white"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none text-[var(--foreground)] bg-white"
              placeholder="your.email@example.com"
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <p className="text-sm text-gray-600 text-center">
            Your choices will be shared with Katie after the event.
          </p>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-[var(--accent)] hover:bg-[#998562] text-white text-lg font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
