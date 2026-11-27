/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';

interface StateProps {
  onRetry?: () => void;
  message?: string;
}

export function LoadingView() {
  return (
    <main className="min-h-screen bg-[#F6F8F5] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md flex flex-col items-center text-center space-y-4">
        {/* Animated Brand Monogram */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-[#0B351F] text-white text-2xl font-black shadow-xl animate-pulse">
          TJ
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 ring-4 ring-[#F6F8F5]" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-lg font-bold text-gray-800">
            TJ Member
          </h2>
          <p className="text-xs text-gray-500">
            กำลังเชื่อมต่อระบบ LINE MINI App...
          </p>
        </div>

        {/* Skeleton Card Preview */}
        <div className="w-full h-48 rounded-3xl bg-gray-200/60 animate-pulse mt-4" />
      </div>
    </main>
  );
}

export function CheckingView() {
  return (
    <main className="min-h-screen bg-[#F6F8F5] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md flex flex-col items-center text-center space-y-4">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B351F] text-white shadow-lg">
          <svg className="w-7 h-7 animate-spin text-emerald-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>

        <div>
          <h2 className="text-base font-bold text-gray-800">
            กำลังตรวจสอบข้อมูลสมาชิก
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            กำลังยืนยันสถานะบัตรกับระบบ Tuenjai Member...
          </p>
        </div>
      </div>
    </main>
  );
}

export function LoginPromptView({ onLogin }: { onLogin: () => void }) {
  return (
    <main className="min-h-screen bg-[#F6F8F5] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-7 shadow-sm border border-gray-100 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-[#0B351F] text-white text-2xl font-bold shadow-md mb-4">
          TJ
        </div>

        <h1 className="text-2xl font-extrabold text-gray-800">
          ยินดีต้อนรับสู่ TJ Member
        </h1>
        <p className="text-xs text-gray-500 mt-2 mb-6">
          เข้าสู่ระบบด้วย LINE เพื่อเปิดใช้งานบัตรสมาชิกดิจิทัลและสะสมคะแนน
        </p>

        <button
          onClick={onLogin}
          type="button"
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#06C755] hover:bg-[#05B34C] text-white font-bold py-4 shadow-md transition"
        >
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 5.82 2 10.53c0 4.22 3.59 7.74 8.44 8.41.33.07.78.22.89.51.1.26.07.67.03.93l-.15.9c-.05.28-.22 1.11.97.6 1.19-.5 6.44-3.8 8.79-6.5C22.42 13.78 22 12.22 22 10.53 22 5.82 17.52 2 12 2z" />
          </svg>
          <span>เข้าสู่ระบบด้วย LINE</span>
        </button>

        <Link
          href="/welcome"
          className="inline-block mt-4 text-xs font-semibold text-emerald-800 hover:underline"
        >
          กลับหน้าต้อนรับ / วิธีการอื่น
        </Link>
      </div>
    </main>
  );
}

export function RegistrationRequiredView({
  displayName,
  pictureUrl,
}: {
  displayName?: string;
  pictureUrl?: string;
}) {
  return (
    <main className="min-h-screen bg-[#F6F8F5] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-7 shadow-sm border border-gray-100 text-center">
        {/* Member profile peek */}
        <div className="relative inline-block mb-3">
          {pictureUrl ? (
            <img
              src={pictureUrl}
              alt="LINE Profile"
              className="h-16 w-16 rounded-full object-cover ring-4 ring-emerald-500/20 mx-auto"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-800 text-white font-bold text-xl mx-auto">
              TJ
            </div>
          )}
        </div>

        <h2 className="text-xl font-extrabold text-gray-800">
          ยินดีต้อนรับคุณ {displayName || 'ผู้ใช้งาน LINE'}
        </h2>
        <p className="text-xs text-gray-500 mt-2 mb-6 leading-relaxed">
          บัญชี LINE ของคุณยังไม่ได้ผูกกับบัตรสมาชิก TJ Member<br />
          กรุณาลงทะเบียนเพียง 1 นาทีเพื่อรับบัตรสมาชิกดิจิทัลและสิทธิพิเศษทันที
        </p>

        <div className="space-y-3">
          <Link
            href="/register/line"
            className="block w-full rounded-2xl bg-[#06C755] hover:bg-[#05B34C] text-white font-bold py-3.5 text-sm shadow-md transition"
          >
            ดำเนินการสมัครสมาชิกด้วย LINE
          </Link>

          <Link
            href="/welcome"
            className="block w-full rounded-2xl border border-gray-200 text-gray-600 font-semibold py-3 text-xs hover:bg-gray-50 transition"
          >
            เลือกวิธีสมัครอื่น
          </Link>
        </div>
      </div>
    </main>
  );
}

export function ApiErrorView({ message, onRetry }: StateProps) {
  return (
    <main className="min-h-screen bg-[#F6F8F5] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-7 shadow-sm border border-gray-100 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 text-2xl font-bold mb-3">
          ⚠️
        </div>

        <h2 className="text-lg font-bold text-gray-800">
          ไม่สามารถโหลดข้อมูลบัตรได้
        </h2>
        <p className="text-xs text-red-500 mt-2 mb-6">
          {message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง'}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            type="button"
            className="w-full rounded-2xl bg-[#0B351F] hover:bg-emerald-900 text-white font-semibold py-3 text-sm shadow-md transition"
          >
            ลองใหม่อีกครั้ง (Retry)
          </button>
        )}
      </div>
    </main>
  );
}
