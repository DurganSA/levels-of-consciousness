'use client';

interface PaintingCardProps {
  letter: string;
  imagePath: string;
  selectedLevel: number | null;
  usedLevels: Record<number, string>; // level -> painting letter
  onLevelChange: (level: number) => void;
}

const CONSCIOUSNESS_LEVELS = [
  { value: 1, name: 'Shame' },
  { value: 2, name: 'Guilt' },
  { value: 3, name: 'Apathy' },
  { value: 4, name: 'Grief' },
  { value: 5, name: 'Fear' },
  { value: 6, name: 'Desire' },
  { value: 7, name: 'Anger' },
  { value: 8, name: 'Pride' },
  { value: 9, name: 'Courage' },
  { value: 10, name: 'Neutrality' },
  { value: 11, name: 'Willingness' },
  { value: 12, name: 'Acceptance' },
  { value: 13, name: 'Reason' },
  { value: 14, name: 'Love' },
  { value: 15, name: 'Joy' },
  { value: 16, name: 'Peace' },
  { value: 17, name: 'Enlightenment' },
];

export default function PaintingCard({ letter, imagePath, selectedLevel, usedLevels, onLevelChange }: PaintingCardProps) {
  const selectedLevelName = CONSCIOUSNESS_LEVELS.find(l => l.value === selectedLevel)?.name;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      {/* Painting Image */}
      <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={imagePath}
          alt={`Painting ${letter}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-[var(--primary)] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
          {letter}
        </div>
        {selectedLevel && (
          <div className="absolute top-3 right-3 bg-[var(--success)] text-white px-3 py-1 rounded-full text-sm font-medium">
            ✓
          </div>
        )}
      </div>

      {/* Dropdown Selector */}
      <div className="space-y-2">
        <label htmlFor={`level-${letter}`} className="block text-sm font-medium text-[var(--foreground)]">
          Consciousness Level
        </label>
        <select
          id={`level-${letter}`}
          value={selectedLevel || ''}
          onChange={(e) => onLevelChange(parseInt(e.target.value))}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none text-[var(--foreground)] bg-white ${
            selectedLevel ? 'border-[var(--success)]' : 'border-gray-300'
          }`}
        >
          <option value="">Select level...</option>
          {CONSCIOUSNESS_LEVELS.map((level) => {
            const isUsedByAnother = usedLevels[level.value] && usedLevels[level.value] !== letter;
            const usedBy = usedLevels[level.value];
            
            return (
              <option 
                key={level.value} 
                value={level.value}
                style={isUsedByAnother ? { 
                  color: '#999',
                  fontStyle: 'italic'
                } : {}}
              >
                {level.value}. {level.name}{isUsedByAnother ? ` (used by ${usedBy})` : ''}
              </option>
            );
          })}
        </select>
        {selectedLevelName && (
          <div className="text-sm text-[var(--accent)] font-medium">
            Selected: {selectedLevelName}
          </div>
        )}
      </div>
    </div>
  );
}
