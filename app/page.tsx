'use client';

import { useEffect, useState } from 'react';

interface HealthResponse {
  status: string;
  message: string;
  timestamp: string;
}

export default function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      setError('API URL is not configured');
      setLoading(false);
      return;
    }

    fetch(`${apiBaseUrl}/api/health`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setHealth(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">
        TJ Member
      </h1>

      {loading && <p>Connecting to Backend...</p>}

      {error && (
        <p className="mt-4 text-red-500">{error}</p>
      )}

      {health && (
        <pre className="mt-4 rounded bg-gray-100 p-4 text-black">
          {JSON.stringify(health, null, 2)}
        </pre>
      )}
    </main>
  );
}
