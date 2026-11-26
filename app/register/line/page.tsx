
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLiff } from '@/app/components/LiffProvider';

export default function LineRegisterPage() {
    const { loading, isLoggedIn, user, login } = useLiff();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [branchCode, setBranchCode] = useState('');

    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setOtpSent(true);
        setOtpError('');
    }

    function verifyOtp() {
        if (otp === '123456') {
            setOtpVerified(true);
            setOtpError('');
        } else {
            setOtpError('รหัส OTP ไม่ถูกต้อง กรุณาลองอีกครั้ง');
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                กำลังตรวจสอบข้อมูล LINE...
            </main>
        );
    }

    if (!isLoggedIn || !user) {
        return (
            <main className="min-h-screen flex items-center justify-center p-5">
                <section className="text-center">
                    <h1 className="text-xl font-bold">กรุณาเข้าสู่ระบบ LINE</h1>
                    <button
                        onClick={login}
                        className="mt-5 bg-[#06C755] text-white px-6 py-3 rounded-xl"
                    >
                        เข้าสู่ระบบด้วย LINE
                    </button>
                    <Link href="/welcome" className="block mt-5 text-sm">
                        กลับหน้าหลัก
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F5F8F2] px-5 py-8">
            <div className="max-w-md mx-auto">
                <Link href="/welcome" className="text-sm text-[#187B43]">
                    ← กลับหน้าก่อนหน้า
                </Link>

                <h1 className="text-2xl font-bold text-gray-800 mt-6">
                    สมัครสมาชิกด้วย LINE
                </h1>

                <section className="bg-white rounded-2xl p-5 shadow-sm mt-6">
                    <div className="flex items-center gap-3 pb-5 border-b">
                        {user.pictureUrl && (
                            <img
                                src={user.pictureUrl}
                                alt="LINE Profile"
                                className="w-14 h-14 rounded-full object-cover"
                            />
                        )}
                        <div>
                            <p className="text-xs text-gray-400">LINE Account</p>
                            <p className="font-semibold">{user.displayName}</p>
                            <p className="text-xs text-green-600">เชื่อมต่อ LINE แล้ว</p>
                        </div>
                    </div>

                    {!otpSent && (
                        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                            <div>
                                <label className="block text-sm mb-2">ชื่อ - นามสกุล</label>
                                <input
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="กรอกชื่อ - นามสกุล"
                                    className="w-full border rounded-xl px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2">เบอร์โทรศัพท์</label>
                                <input
                                    required
                                    type="tel"
                                    inputMode="numeric"
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                    placeholder="08XXXXXXXX"
                                    className="w-full border rounded-xl px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2">วันเกิด</label>
                                <input
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    className="w-full border rounded-xl px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2">
                                    สาขาที่ใช้บริการประจำ
                                </label>
                                <select
                                    value={branchCode}
                                    onChange={(e) => setBranchCode(e.target.value)}
                                    className="w-full border rounded-xl px-4 py-3 bg-white"
                                >
                                    <option value="">เลือกสาขา (ไม่บังคับ)</option>
                                    <option value="HQ">สำนักงานใหญ่</option>
                                    <option value="BR001">สาขาทดลอง 001</option>
                                    <option value="BR002">สาขาทดลอง 002</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#187B43] text-white rounded-xl py-4 font-semibold"
                            >
                                ดำเนินการต่อ
                            </button>
                        </form>
                    )}

                    {otpSent && !otpVerified && (
                        <div className="mt-6 space-y-4">
                            <h2 className="text-lg font-bold">ยืนยันเบอร์โทรศัพท์</h2>

                            <p className="text-sm text-gray-500">
                                กรุณากรอกรหัส OTP สำหรับเบอร์ {phone}
                            </p>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                                <p className="text-sm font-semibold text-yellow-800">
                                    DEMO MODE
                                </p>
                                <p className="text-sm text-yellow-800">
                                    รหัส OTP ทดสอบคือ 123456
                                </p>
                            </div>

                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => {
                                    setOtp(e.target.value.replace(/\D/g, ''));
                                    setOtpError('');
                                }}
                                placeholder="กรอกรหัส OTP 6 หลัก"
                                className="w-full border rounded-xl px-4 py-3 text-center tracking-widest text-xl"
                            />

                            {otpError && (
                                <p className="text-sm text-red-500">{otpError}</p>
                            )}

                            <button
                                type="button"
                                onClick={verifyOtp}
                                className="w-full bg-[#187B43] text-white rounded-xl py-4 font-semibold"
                            >
                                ยืนยัน OTP
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setOtpSent(false);
                                    setOtp('');
                                    setOtpError('');
                                }}
                                className="w-full text-sm text-gray-500"
                            >
                                กลับไปแก้ไขข้อมูล
                            </button>
                        </div>
                    )}

                    {otpVerified && (
                        <div className="mt-6 bg-green-50 rounded-xl p-5 text-center">
                            <p className="text-3xl text-green-600">✓</p>
                            <h2 className="font-bold text-green-800 mt-2">
                                ยืนยัน OTP สำเร็จ
                            </h2>
                            <p className="text-sm text-green-700 mt-2">
                                เบอร์ {phone} ผ่านการตรวจสอบใน Demo แล้ว
                            </p>
                            <p className="text-xs text-green-700 mt-3">
                                ขั้นตอนถัดไปจะเชื่อม Backend เพื่อสร้างบัญชีสมาชิก
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
