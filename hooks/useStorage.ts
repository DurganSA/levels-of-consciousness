'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';

export interface Submission {
  id: string;
  created_at?: string;
  name: string;
  email: string;
  votes: Record<string, number>; // A-Q: 1-17
  favorite_painting: string; // A-Q
}

export function useStorage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    fetchSubmissions();
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
    }
  };

  const addSubmission = async (submission: Omit<Submission, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .insert([submission])
        .select()
        .single();

      if (error) throw error;

      // Update local state
      setSubmissions(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error adding submission:', error);
      throw error;
    }
  };

  const emailExists = async (email: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('id')
        .ilike('email', email)
        .limit(1);

      if (error) throw error;
      return (data?.length || 0) > 0;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  return {
    submissions,
    addSubmission,
    emailExists,
    refreshSubmissions: fetchSubmissions,
  };
}
