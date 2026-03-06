'use client';

import { useEffect, useState } from 'react';
import AdminDashboard from '@/components/AdminDashboard';
import { Submission } from '@/hooks/useStorage';
import { supabase } from '@/utils/supabaseClient';

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
    
    // Set up real-time subscription for new submissions
    const subscription = supabase
      .channel('submissions-changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'submissions' },
        (payload) => {
          setSubmissions(prev => [payload.new as Submission, ...prev]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[var(--primary)]">Loading submissions...</div>
      </div>
    );
  }

  return <AdminDashboard submissions={submissions} />;
}
