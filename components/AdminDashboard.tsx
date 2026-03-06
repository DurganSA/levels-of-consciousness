'use client';

import { Submission } from '@/hooks/useStorage';

interface AdminDashboardProps {
  submissions: Submission[];
}

const PAINTINGS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];

const CONSCIOUSNESS_LEVELS: Record<number, string> = {
  1: 'Shame',
  2: 'Guilt',
  3: 'Apathy',
  4: 'Grief',
  5: 'Fear',
  6: 'Desire',
  7: 'Anger',
  8: 'Pride',
  9: 'Courage',
  10: 'Neutrality',
  11: 'Willingness',
  12: 'Acceptance',
  13: 'Reason',
  14: 'Love',
  15: 'Joy',
  16: 'Peace',
  17: 'Enlightenment',
};

export default function AdminDashboard({ submissions }: AdminDashboardProps) {
  const getLevelName = (levelNumber: number | undefined): string => {
    if (!levelNumber) return '-';
    return CONSCIOUSNESS_LEVELS[levelNumber] || '-';
  };

  const handleExport = () => {
    const headers = ['Timestamp', 'Name', 'Email', ...PAINTINGS, 'Favorite Painting'];
    const rows = submissions.map(sub => [
      new Date(sub.created_at || '').toLocaleString('en-GB'),
      sub.name,
      sub.email,
      ...PAINTINGS.map(letter => getLevelName(sub.votes[letter])),
      sub.favorite_painting || '-'
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `consciousness-votes-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-semibold text-[var(--primary)]">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Total Submissions: <span className="font-bold text-[var(--primary)]">{submissions.length}</span>
              </p>
            </div>
            {submissions.length > 0 && (
              <button
                onClick={handleExport}
                className="px-6 py-3 bg-[var(--accent)] hover:bg-[#998562] text-white font-medium rounded-lg transition-colors duration-200"
              >
                Export CSV
              </button>
            )}
          </div>
        </div>

        {/* Submissions Table */}
        {submissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center text-gray-500">
            No submissions yet.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[var(--primary)] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Timestamp</th>
                    <th className="px-4 py-3 text-left font-medium">Name</th>
                    <th className="px-4 py-3 text-left font-medium">Email</th>
                    {PAINTINGS.map(letter => (
                      <th key={letter} className="px-2 py-3 text-center font-medium">
                        {letter}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-center font-medium">Favorite</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                        {new Date(submission.created_at || '').toLocaleString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-medium">
                        {submission.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                        {submission.email}
                      </td>
                      {PAINTINGS.map(letter => (
                        <td key={letter} className="px-2 py-3 text-center font-medium text-[var(--primary)]">
                          {getLevelName(submission.votes[letter])}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-center font-bold text-[var(--accent)] text-lg">
                        {submission.favorite_painting || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
