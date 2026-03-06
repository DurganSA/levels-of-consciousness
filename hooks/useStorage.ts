'use client';

import { useState, useEffect } from 'react';

export interface Submission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  votes: Record<string, number>; // A-Q: 1-17
  favoritePainting: string; // A-Q
}

const STORAGE_KEY = 'levels-of-consciousness-submissions';

export function useStorage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSubmissions(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored submissions:', e);
      }
    }
  }, []);

  const addSubmission = (submission: Submission) => {
    const updated = [...submissions, submission];
    setSubmissions(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const emailExists = (email: string): boolean => {
    return submissions.some(s => s.email.toLowerCase() === email.toLowerCase());
  };

  return {
    submissions,
    addSubmission,
    emailExists,
  };
}
