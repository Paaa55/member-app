
'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';

type Step = 'phone' | 'otp' | 'profile' | 'completed';

export default function PhoneRegisterPage() {
    const [step, setStep] = useState<Step>('phone');

    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');

    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [branchCode, setBranchCode] = useState('');

    function handlePhoneSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (phone.length !== 10) return;

        setOtp('');
        setOtpError('');
        setStep('otp');
    }

    function handleVerifyOtp() {
        if (otp !== '123456') {
            setOtpError('รหัส OTP ไม่ถูกต้อง กรุณาลองอีกครั้ง');
            return;
        }

        setOtpError('');
        setStep('profile');
    }

    function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Demo เท่านั้น ยังไม่ได้บันทึกข้อมูลลง Backend
        setStep('completed');
    }

    return (
        <main className="min-h-screen bg-[#F5F8F2] px-5 py-8">
            <div className="max-w-md mx-auto">

                <Link href="/welcome" className="text-sm text-[#187B43]">
                    ← กลับหน้าหลัก
                </Link>

                <header className="mt-6 mb-6">
                    <p className="text-sm font-semibold text-[#187B43]">
                        TJ MEMBER REGISTRATION
                    </p>

                    <h1 className="text-2xl font-bold text-gray-800 mt-2">
                        สมัครสมาชิกด้วยเบอร์โทรศัพท์
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        สมัครสมาชิกได้โดยไม่ต้องเข้าสู่ระบบ LINE
                    </p>
                </header>

                {/* Progress */}
                <div className="flex items-center gap-2 mb-6">
                    {['phone', 'otp', 'profile'].map((item, index) => {
                        const steps = ['phone', 'otp', 'profile'];
                        const currentIndex = steps.indexOf(step);
                        const active = index <= currentIndex;

                        return (
                            <div
                                key={item}
                                className={`h-1.5 flex-1 rounded-full ${active ? 'bg-[#187B43]' : 'bg-gray-200'
                                    }`}
                            />
                        );
                    })}
                </div>

                <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                    {/* STEP 1: Phone */}
                    {step === 'phone' && (
                        <form onSubmit={handlePhoneSubmit} className="space-y-5">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    ระบุเบอร์โทรศัพท์
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    เราจะใช้เบอร์โทรศัพท์เพื่อยืนยันตัวตนของคุณ
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                    เบอร์โทรศัพท์
                                </label>

                                <input
                                    type="tel"
                                    inputMode="numeric"
                                    required
                                    maxLength={10}
                                    pattern="[0-9]{10}"
                                    value={phone}
                                    onChange={(event) =>
                                        setPhone(event.target.value.replace(/\D/g, ''))
                                    }
                                    placeholder="08XXXXXXXX"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#187B43]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#187B43] text-white rounded-xl py-4 font-semibold"
                            >
                                ขอรหัส OTP
                            </button>
                        </form>
                    )}

                    {/* STEP 2: OTP */}
                    {step === 'otp' && (
                        <div className="space-y-5">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    ยืนยันเบอร์โทรศัพท์
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    กรอกรหัส OTP สำหรับเบอร์ {phone}
                                </p>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                                <p className="text-sm font-semibold text-yellow-800">
                                    DEMO MODE
                                </p>
                                <p className="text-sm text-yellow-800 mt-1">
                                    รหัส OTP ทดสอบคือ 123456
                                </p>
                            </div>

                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                value={otp}
                                onChange={(event) => {
                                    setOtp(event.target.value.replace(/\D/g, ''));
                                    setOtpError('');
                                }}
                                placeholder="กรอกรหัส OTP 6 หลัก"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center tracking-widest text-xl outline-none focus:border-[#187B43]"
                            />

                            {otpError && (
                                <p className="text-sm text-red-500">{otpError}</p>
                            )}

                            <button
                                type="button"
                                onClick={handleVerifyOtp}
                                className="w-full bg-[#187B43] text-white rounded-xl py-4 font-semibold"
                            >
                                ยืนยัน OTP
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setStep('phone');
                                    setOtp('');
                                    setOtpError('');
                                }}
                                className="w-full text-sm text-gray-500"
                            >
                                กลับไปแก้ไขเบอร์โทรศัพท์
                            </button>
                        </div>
                    )}

                    {/* STEP 3: Profile */}
                    {step === 'profile' && (
                        <form onSubmit={handleProfileSubmit} className="space-y-4">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    ข้อมูลสมาชิก
                                </h2>
                                <p className="text-sm text-green-700 mt-1">
                                    ยืนยันเบอร์โทรศัพท์สำเร็จแล้ว
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                    ชื่อ - นามสกุล
                                </label>
                                <input
                                    required
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    placeholder="กรอกชื่อ - นามสกุล"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                    วันเกิด
                                </label>
                                <input
                                    type="date"
                                    value={birthDate}
                                    onChange={(event) => setBirthDate(event.target.value)}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                    สาขาที่ใช้บริการประจำ
                                </label>
                                <select
                                    value={branchCode}
                                    onChange={(event) => setBranchCode(event.target.value)}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white"
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
                                สมัครสมาชิก
                            </button>
                        </form>
                    )}

                    {/* STEP 4: Completed */}
                    {step === 'completed' && (
                        <div className="text-center py-5">
                            <div className="text-4xl text-green-600">✓</div>

                            <h2 className="text-xl font-bold text-green-800 mt-3">
                                กรอกข้อมูลสำเร็จ
                            </h2>

                            <p className="text-sm text-gray-500 mt-2">
                                ข้อมูลสมาชิก Demo พร้อมสำหรับเชื่อมต่อ Backend
                            </p>

                            <div className="bg-gray-50 rounded-xl p-4 mt-5 text-left space-y-2">
                                <p className="text-sm">
                                    <span className="text-gray-500">ชื่อ:</span> {name}
                                </p>
                                <p className="text-sm">
                                    <span className="text-gray-500">เบอร์โทรศัพท์:</span> {phone}
                                </p>
                                <p className="text-sm">
                                    <span className="text-gray-500">วันเกิด:</span> {birthDate || '-'}
                                </p>
                                <p className="text-sm">
                                    <span className="text-gray-500">สาขา:</span> {branchCode || '-'}
                                </p>
                            </div>

                            <p className="text-xs text-gray-400 mt-4">
                                ขณะนี้ยังไม่มีการบันทึกข้อมูลลงฐานข้อมูลจริง
                            </p>

                            <Link
                                href="/welcome"
                                className="block w-full mt-5 bg-[#187B43] text-white rounded-xl py-4 font-semibold"
                            >
                                กลับหน้าหลัก
                            </Link>
                        </div>
                    )}
                </section>

                <p className="text-xs text-center text-gray-400 mt-6">
                    TJ Member · Tuenjai Panit Group
                </p>
            </div>
        </main>
    );
}
