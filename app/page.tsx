
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

  useEffect(() => {
    fetch('http://localhost:3001/api/health')
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">
        Retail Member Platform
      </h1>

      {loading ? (
        <p>Connecting to Backend...</p>
      ) : (
        <pre className="mt-4 rounded bg-gray-100 p-4 text-black">
          {JSON.stringify(health, null, 2)}
        </pre>
      )}
    </main>
  );
}
