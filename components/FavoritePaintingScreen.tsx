'use client';

interface FavoritePaintingScreenProps {
  onSelect: (letter: string) => void;
}

const PAINTINGS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];

export default function FavoritePaintingScreen({ onSelect }: FavoritePaintingScreenProps) {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-semibold text-[var(--primary)]">
            One Final Question
          </h1>
          <p className="text-xl text-[var(--foreground)]">
            Which painting is your favorite?
          </p>
          <p className="text-base text-gray-600">
            Click on your favorite painting below
          </p>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {PAINTINGS.map((letter) => (
            <button
              key={letter}
              onClick={() => onSelect(letter)}
              className="group relative aspect-[3/4] rounded-lg overflow-hidden border-4 border-transparent hover:border-[var(--accent)] transition-all duration-200 shadow-md hover:shadow-xl transform hover:scale-105"
            >
              <img
                src={`/paintings/${letter}.jpg`}
                alt={`Painting ${letter}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200"></div>
              <div className="absolute top-2 left-2 bg-[var(--primary)] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                {letter}
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-[var(--accent)] text-white px-4 py-2 rounded-full font-medium">
                  Select
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
