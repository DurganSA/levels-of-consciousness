'use client';

import { useState } from 'react';
import PaintingCard from './PaintingCard';

interface GalleryProps {
  onSubmit: (votes: Record<string, number>) => void;
}

const PAINTINGS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];

export default function Gallery({ onSubmit }: GalleryProps) {
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLevelChange = (letter: string, level: number) => {
    setVotes((prev) => {
      const newVotes = { ...prev };
      
      // Find if this level is already assigned to another painting
      const existingPainting = Object.entries(newVotes).find(
        ([paintingLetter, paintingLevel]) => paintingLevel === level && paintingLetter !== letter
      );
      
      // If found, remove it from that painting
      if (existingPainting) {
        delete newVotes[existingPainting[0]];
      }
      
      // Assign the level to the current painting
      newVotes[letter] = level;
      
      return newVotes;
    });
  };

  // Create a map of level -> painting letter for used levels
  const usedLevels: Record<number, string> = {};
  Object.entries(votes).forEach(([letter, level]) => {
    usedLevels[level] = letter;
  });

  const completedCount = Object.keys(votes).length;
  const isComplete = completedCount === PAINTINGS.length;

  const handleSubmit = async () => {
    if (!isComplete) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(votes);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-semibold text-[var(--primary)]">
            The Collection
          </h1>
          <p className="text-lg text-[var(--foreground)]">
            Select a level of consciousness (1-17) for each painting.
            <br />
            Each level can only be assigned to one painting.
          </p>
          <div className="inline-block px-6 py-2 bg-[var(--primary)] text-white rounded-full text-sm font-medium">
            Progress: {completedCount} of {PAINTINGS.length} complete
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAINTINGS.map((letter) => (
            <PaintingCard
              key={letter}
              letter={letter}
              imagePath={`/paintings/${letter}.svg`}
              selectedLevel={votes[letter] || null}
              usedLevels={usedLevels}
              onLevelChange={(level) => handleLevelChange(letter, level)}
            />
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-8">
          <button
            onClick={handleSubmit}
            disabled={!isComplete || isSubmitting}
            className={`px-12 py-4 text-xl font-medium rounded-lg transition-all duration-200 shadow-md ${
              isComplete && !isSubmitting
                ? 'bg-[var(--accent)] hover:bg-[#998562] text-white hover:shadow-lg cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Submitting...' : isComplete ? 'Submit Your Choices' : `Complete ${PAINTINGS.length - completedCount} more`}
          </button>
        </div>
      </div>
    </div>
  );
}
