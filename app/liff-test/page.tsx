
'use client';

import { useEffect, useState } from 'react';
import liff from '@line/liff';

interface LiffUser {
    userId: string;
    displayName: string;
    pictureUrl?: string;
}

export default function LiffTestPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState<LiffUser | null>(null);
    const [debug, setDebug] = useState({
        liffInitialized: false,
        isInClient: false,
        isLoggedIn: false,
        hasIdToken: false,
    });

    useEffect(() => {
        let cancelled = false;

        async function initializeLiff() {
            try {
                const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

                if (!liffId) {
                    throw new Error('LIFF ID is not configured');
                }

                await liff.init({ liffId });

                if (cancelled) return;

                const isInClient = liff.isInClient();
                const isLoggedIn = liff.isLoggedIn();
                const idToken = liff.getIDToken();

                setDebug({
                    liffInitialized: true,
                    isInClient,
                    isLoggedIn,
                    hasIdToken: Boolean(idToken),
                });

                if (!isLoggedIn) {
                    if (!isInClient) {
                        liff.login();
                        return;
                    }

                    throw new Error('LINE user is not logged in');
                }

                if (!idToken) {
                    throw new Error(
                        'ID Token not found. Check openid scope.',
                    );
                }

                const profile = await liff.getProfile();

                if (cancelled) return;

                setUser({
                    userId: profile.userId,
                    displayName: profile.displayName,
                    pictureUrl: profile.pictureUrl,
                });
            } catch (err) {
                if (cancelled) return;

                setError(
                    err instanceof Error
                        ? err.message
                        : 'Unable to initialize LIFF',
                );
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        initializeLiff();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <main style={{ padding: 24 }}>
            <h1>Retail Member App</h1>

            {loading && <p>กำลังเชื่อมต่อ LINE...</p>}

            {error && (
                <p style={{ color: 'red' }}>
                    LIFF Error: {error}
                </p>
            )}

            <h2>LIFF Debug</h2>
            <p>LIFF Initialized: {String(debug.liffInitialized)}</p>
            <p>Inside LINE: {String(debug.isInClient)}</p>
            <p>Logged In: {String(debug.isLoggedIn)}</p>
            <p>ID Token: {debug.hasIdToken ? 'ได้รับแล้ว' : 'ไม่พบ'}</p>

            {user && (
                <>
                    <hr />
                    <h2>LINE Profile</h2>

                    {user.pictureUrl && (
                        <img
                            src={user.pictureUrl}
                            alt="LINE Profile"
                            width={80}
                            height={80}
                            style={{ borderRadius: '50%' }}
                        />
                    )}

                    <p>ชื่อ: {user.displayName}</p>
                    <p>LINE User ID: {user.userId}</p>
                </>
            )}
        </main>
    );
}
