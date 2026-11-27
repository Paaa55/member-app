'use client';

import { useEffect, useState } from 'react';
import { useLiff } from '../components/LiffProvider';

interface Member {
    id: string;
    memberCode: string | null;
    name: string;
    lineUserId: string | null;
    phone: string | null;
    birthDate: string | null;
    homeBranchCode?: string | null;
    currentPoints: number;
    status: string;
    createdAt: string;
}

interface LineLoginResponse {
    isRegistered: boolean;
    accessToken?: string;
    registrationToken?: string;
    member?: Member;
}

export default function LiffTestPage() {
    const {
        loading,
        error,
        isLoggedIn,
        idToken,
        user,
        login,
    } = useLiff();

    const [checking, setChecking] = useState(false);
    const [member, setMember] = useState<Member | null>(null);
    const [registrationRequired, setRegistrationRequired] =
        useState(false);
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        if (loading || !isLoggedIn || !idToken) return;

        const controller = new AbortController();

        const authenticate = async () => {
            setChecking(true);
            setApiError('');
            setMember(null);
            setRegistrationRequired(false);

            try {
                const baseUrl =
                    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '');

                if (!baseUrl) {
                    throw new Error(
                        'Missing NEXT_PUBLIC_API_BASE_URL'
                    );
                }

                // 1. ส่ง LINE ID Token ให้ Backend ตรวจสอบ
                const loginResponse = await fetch(
                    `${baseUrl}/api/auth/line`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ idToken }),
                        signal: controller.signal,
                    }
                );

                const loginData =
                    await loginResponse.json() as LineLoginResponse & {
                        message?: string;
                    };

                if (!loginResponse.ok) {
                    throw new Error(
                        loginData.message || 'LINE authentication failed'
                    );
                }

                // 2. ถ้ายังไม่ได้สมัครสมาชิก
                if (!loginData.isRegistered) {
                    setRegistrationRequired(true);
                    return;
                }

                if (!loginData.accessToken) {
                    throw new Error('Access Token not found');
                }

                // 3. ใช้ Access Token ขอข้อมูลสมาชิก
                const profileResponse = await fetch(
                    `${baseUrl}/api/auth/me`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${loginData.accessToken}`,
                        },
                        signal: controller.signal,
                    }
                );

                const profileData = await profileResponse.json();

                if (!profileResponse.ok) {
                    throw new Error(
                        profileData.message || 'Cannot load member profile'
                    );
                }

                setMember(profileData as Member);
            } catch (err) {
                if (err instanceof Error && err.name === 'AbortError') {
                    return;
                }

                setApiError(
                    err instanceof Error
                        ? err.message
                        : 'Something went wrong'
                );
            } finally {
                if (!controller.signal.aborted) {
                    setChecking(false);
                }
            }
        };

        authenticate();

        return () => controller.abort();
    }, [loading, isLoggedIn, idToken]);

    if (loading) {
        return <main className="p-6">กำลังเชื่อมต่อ LINE...</main>;
    }

    if (error) {
        return (
            <main className="p-6">
                <h1>TJ Member</h1>
                <p className="text-red-500">LIFF Error: {error}</p>
            </main>
        );
    }

    if (!isLoggedIn) {
        return (
            <main className="min-h-screen flex items-center justify-center p-6">
                <button
                    onClick={login}
                    className="bg-[#06C755] text-white px-6 py-3 rounded-xl"
                >
                    เข้าสู่ระบบด้วย LINE
                </button>
            </main>
        );
    }

    if (checking) {
        return (
            <main className="min-h-screen flex items-center justify-center p-6">
                <p>กำลังตรวจสอบข้อมูลสมาชิก...</p>
            </main>
        );
    }

    if (apiError) {
        return (
            <main className="min-h-screen p-6">
                <h1 className="text-2xl font-bold">TJ Member</h1>
                <p className="text-red-500 mt-4">{apiError}</p>
            </main>
        );
    }

    if (registrationRequired) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center p-6">
                <h1 className="text-2xl font-bold">TJ Member</h1>
                <p className="mt-4">สวัสดี {user?.displayName}</p>
                <p className="mt-2 text-gray-500">
                    ยังไม่พบข้อมูลสมาชิกของคุณ
                </p>
                <p className="mt-2">
                    กรุณาดำเนินการสมัครสมาชิก
                </p>
            </main>
        );
    }

    if (!member) {
        return (
            <main className="min-h-screen p-6">
                <h1 className="text-2xl font-bold">TJ Member</h1>
                <p className="mt-4">กำลังรอข้อมูลสมาชิก...</p>
                <pre className="mt-4 rounded bg-gray-100 p-4 text-black">
                    {JSON.stringify({
                        loading,
                        isLoggedIn,
                        hasIdToken: !!idToken,
                        hasUser: !!user,
                        checking,
                        registrationRequired,
                        apiError,
                    }, null, 2)}
                </pre>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-100 p-5">
            <div className="max-w-md mx-auto">
                <header className="mb-6">
                    <h1 className="text-2xl font-bold text-green-700">
                        TJ Member
                    </h1>
                    <p className="text-gray-500">
                        Member Dashboard
                    </p>
                </header>

                <section className="bg-white rounded-2xl shadow p-6">
                    <div className="flex items-center gap-4">
                        {user?.pictureUrl && (
                            <img
                                src={user.pictureUrl}
                                alt="Profile"
                                className="w-16 h-16 rounded-full"
                            />
                        )}

                        <div>
                            <h2 className="text-xl font-bold">
                                {member.name}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {member.memberCode || 'รอออก Member Code'}
                            </p>
                        </div>
                    </div>

                    <hr className="my-5" />

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">
                                เบอร์โทรศัพท์
                            </p>
                            <p className="font-medium">
                                {member.phone || '-'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                คะแนนสะสม
                            </p>
                            <p className="text-2xl font-bold text-green-700">
                                {member.currentPoints.toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                สาขาหลัก
                            </p>
                            <p className="font-medium">
                                {member.homeBranchCode || '-'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                สถานะสมาชิก
                            </p>
                            <p className="font-medium text-green-700">
                                {member.status}
                            </p>
                        </div>
                    </div>
                </section>

                <p className="text-center text-xs text-gray-400 mt-6">
                    TJ Member Platform
                </p>
            </div>
        </main>
    );
}
