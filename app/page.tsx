'use client';

import { useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import RegistrationForm from '@/components/RegistrationForm';
import Gallery from '@/components/Gallery';
import FavoritePaintingScreen from '@/components/FavoritePaintingScreen';
import ConfirmationScreen from '@/components/ConfirmationScreen';
import { useStorage, Submission } from '@/hooks/useStorage';
import { sendSubmissionEmail } from '@/utils/emailService';

type Screen = 'welcome' | 'registration' | 'gallery' | 'favorite' | 'confirmation';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userVotes, setUserVotes] = useState<Record<string, number>>({});
  const { submissions, addSubmission, emailExists } = useStorage();

  const handleBegin = () => {
    setCurrentScreen('registration');
  };

  const handleRegistrationContinue = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
    setCurrentScreen('gallery');
  };

  const handleGallerySubmit = async (votes: Record<string, number>) => {
    setUserVotes(votes);
    setCurrentScreen('favorite');
  };

  const handleFavoriteSelect = async (favoritePainting: string) => {
    const submission: Submission = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      name: userName,
      email: userEmail,
      votes: userVotes,
      favoritePainting,
    };

    addSubmission(submission);
    
    // Attempt to send email (non-blocking)
    sendSubmissionEmail(submission).catch(err => {
      console.error('Email send failed:', err);
    });

    setCurrentScreen('confirmation');
  };

  const handleReturnToWelcome = () => {
    setUserName('');
    setUserEmail('');
    setUserVotes({});
    setCurrentScreen('welcome');
  };

  return (
    <div>
      {/* Branding Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <img 
            src="/KatieLogo.png" 
            alt="Katie Cooper Art" 
            className="h-12 w-auto"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {currentScreen === 'welcome' && (
          <WelcomeScreen onBegin={handleBegin} />
        )}
        {currentScreen === 'registration' && (
          <RegistrationForm
            onContinue={handleRegistrationContinue}
            emailExists={emailExists}
          />
        )}
        {currentScreen === 'gallery' && (
          <Gallery onSubmit={handleGallerySubmit} />
        )}
        {currentScreen === 'favorite' && (
          <FavoritePaintingScreen onSelect={handleFavoriteSelect} />
        )}
        {currentScreen === 'confirmation' && (
          <ConfirmationScreen
            name={userName}
            onReturnToWelcome={handleReturnToWelcome}
          />
        )}
      </main>
    </div>
  );
}
