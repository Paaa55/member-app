
'use client';

import { useState } from 'react';
import { useLiff } from '../components/LiffProvider';

export default function LiffTestPage() {
    const {
        loading,
        error,
        isInitialized,
        isInClient,
        isLoggedIn,
        idToken,
        user,
        login,
    } = useLiff();

    const [copied, setCopied] = useState(false);

    const copyIdToken = async () => {
        if (!idToken) return;

        try {
            await navigator.clipboard.writeText(idToken);
            setCopied(true);

            setTimeout(() => setCopied(false), 2500);
        } catch {
            setCopied(false);
            alert('ไม่สามารถคัดลอก Token ได้');
        }
    };

    return (
        <main style={{ padding: 24 }}>
            <h1>TJ Member</h1>
            <p>LIFF Integration Test</p>

            {loading && <p>กำลังเชื่อมต่อ LINE...</p>}

            {error && (
                <p style={{ color: 'red' }}>
                    LIFF Error: {error}
                </p>
            )}

            <hr />

            <h2>LIFF Debug</h2>

            <p>LIFF Initialized: {String(isInitialized)}</p>
            <p>Inside LINE: {String(isInClient)}</p>
            <p>Logged In: {String(isLoggedIn)}</p>
            <p>ID Token: {idToken ? 'ได้รับแล้ว' : 'ไม่พบ'}</p>

            {idToken && (
                <button
                    onClick={copyIdToken}
                    style={{
                        backgroundColor: '#06C755',
                        color: 'white',
                        padding: '12px 20px',
                        borderRadius: 10,
                        marginTop: 12,
                    }}
                >
                    {copied ? 'คัดลอกแล้ว' : 'Copy ID Token'}
                </button>
            )}

            {!loading && !error && !isLoggedIn && (
                <button
                    onClick={login}
                    className="bg-[#06C755] text-white px-6 py-3 rounded-xl"
                >
                    เข้าสู่ระบบด้วย LINE
                </button>
            )}

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
