'use client';

import { useEffect, useState } from 'react';
import AdminDashboard from '@/components/AdminDashboard';
import { Submission } from '@/hooks/useStorage';

const STORAGE_KEY = 'levels-of-consciousness-submissions';

export default function AdminPage() {
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

  return <AdminDashboard submissions={submissions} />;
}
