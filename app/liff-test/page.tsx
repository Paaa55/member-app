
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
    const [hasIdToken, setHasIdToken] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function initializeLiff() {
            try {
                const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

                if (!liffId) {
                    throw new Error('LIFF ID is not configured');
                }

                await liff.init({ liffId });

                // Outside LINE app, redirect to LINE Login if needed.
                // Inside LIFF browser, login is handled by LIFF initialization.
                if (!liff.isLoggedIn()) {
                    if (!liff.isInClient()) {
                        liff.login();
                        return;
                    }

                    throw new Error('Unable to authenticate LINE user');
                }

                const idToken = liff.getIDToken();

                if (!idToken) {
                    throw new Error(
                        'ID Token not found. Check the openid scope in LINE Developers.',
                    );
                }

                const profile = await liff.getProfile();

                if (cancelled) return;

                setHasIdToken(true);
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

    if (loading) {
        return <main>กำลังเชื่อมต่อ LINE...</main>;
    }

    if (error) {
        return (
            <main>
                <h1>LIFF Error</h1>
                <p>{error}</p>
            </main>
        );
    }

    return (
        <main style={{ padding: 24 }}>
            <h1>Retail Member App</h1>

            <p>LINE Login สำเร็จ</p>

            {user?.pictureUrl && (
                <img
                    src={user.pictureUrl}
                    alt="LINE Profile"
                    width={80}
                    height={80}
                    style={{ borderRadius: '50%' }}
                />
            )}

            <p>ชื่อ: {user?.displayName}</p>
            <p>LINE User ID: {user?.userId}</p>
            <p>ID Token: {hasIdToken ? 'ได้รับแล้ว' : 'ไม่พบ Token'}</p>
        </main>
    );
}
