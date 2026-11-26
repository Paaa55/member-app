
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLiff } from '../components/LiffProvider';

export default function WelcomePage() {
    const router = useRouter();

    const {
        loading,
        error,
        isLoggedIn,
        user,
        login,
    } = useLiff();

    function handleLineRegister() {
        if (loading) return;

        if (!isLoggedIn) {
            login();
            return;
        }

        router.push('/register/line');
    }

    return (
        <main className="min-h-screen bg-[#F5F8F2] flex items-center justify-center p-5">
            <div className="w-full max-w-md">

                {/* Brand */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#187B43] text-white text-3xl font-bold shadow-lg mb-5">
                        TJ
                    </div>

                    <h1 className="text-3xl font-bold text-[#174D31]">
                        TJ Member
                    </h1>

                    <p className="text-gray-500 mt-2">
                        สมาชิกคนสำคัญของ Tuenjai Panit Group
                    </p>
                </div>

                {/* Welcome Card */}
                <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

                    <h2 className="text-xl font-bold text-gray-800 text-center">
                        ยินดีต้อนรับ
                    </h2>

                    <p className="text-sm text-gray-500 text-center mt-2 mb-7">
                        สมัครสมาชิกเพื่อรับสิทธิประโยชน์และสะสมคะแนน
                    </p>

                    {/* LINE Register */}
                    <button
                        onClick={handleLineRegister}
                        disabled={loading}
                        className="w-full rounded-xl bg-[#06C755] hover:bg-[#05B34C] disabled:opacity-50 text-white font-semibold py-4 transition"
                    >
                        {loading
                            ? 'กำลังเชื่อมต่อ...'
                            : isLoggedIn
                                ? 'ดำเนินการสมัครด้วย LINE'
                                : 'สมัครสมาชิกด้วย LINE'}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="h-px bg-gray-200 flex-1" />
                        <span className="text-xs text-gray-400">หรือ</span>
                        <div className="h-px bg-gray-200 flex-1" />
                    </div>

                    {/* Phone Register */}
                    <Link
                        href="/register/phone"
                        className="block w-full text-center rounded-xl border-2 border-[#187B43] text-[#187B43] hover:bg-green-50 font-semibold py-4 transition"
                    >
                        สมัครสมาชิกด้วยเบอร์โทรศัพท์
                    </Link>

                    {error && (
                        <p className="text-sm text-red-500 text-center mt-4">
                            {error}
                        </p>
                    )}

                    {user && (
                        <div className="mt-6 p-3 bg-green-50 rounded-xl text-center">
                            <p className="text-sm text-green-800">
                                เข้าสู่ระบบ LINE แล้ว: {user.displayName}
                            </p>
                        </div>
                    )}
                </section>

                <p className="text-center text-xs text-gray-400 mt-6">
                    TJ Member · Tuenjai Panit Group
                </p>
            </div>
        </main>
    );
}
