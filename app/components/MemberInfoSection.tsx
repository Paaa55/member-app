'use client';

import { Member } from '../types/member';
import { formatMemberCode, formatThaiDate, getMemberTier } from '../utils/formatters';

interface MemberInfoSectionProps {
  member: Member;
  onOpenSecurityModal: () => void;
}

export default function MemberInfoSection({
  member,
  onOpenSecurityModal,
}: MemberInfoSectionProps) {
  const tier = getMemberTier(member.currentPoints);
  const displayMemberCode = formatMemberCode(member.memberCode);
  const formattedCreatedDate = formatThaiDate(member.createdAt);

  // Progress to next tier
  const progressPercent = Math.min(
    100,
    Math.max(0, (member.currentPoints / tier.nextTierPoints) * 100)
  );

  return (
    <div className="w-full mt-6 space-y-4">
      {/* Tier Progress Card (Demo Tier progression) */}
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-700 text-xs font-bold">
              ★
            </span>
            <div>
              <h4 className="text-sm font-bold text-gray-800">
                สถานะระดับสมาชิก: {tier.name}
              </h4>
              <p className="text-[11px] text-gray-400">
                สิทธิ์พิเศษเฉพาะสมาชิกเตือนใจพาณิชย์
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded-full border border-amber-200/50">
            Demo Tier
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-500">
              สะสมแต้มปัจจุบัน: <strong className="text-gray-800">{member.currentPoints.toLocaleString()}</strong> แต้ม
            </span>
            <span className="text-emerald-700 font-medium">
              เป้าหมายถัดไป: {tier.nextTierName}
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-2 text-right">
            {tier.id === 'PLATINUM'
              ? 'คุณอยู่ในสมาชิกระดับสูงสุดแล้ว'
              : `ต้องการอีก ${(tier.nextTierPoints - member.currentPoints).toLocaleString()} แต้ม เพื่อเลื่อนเป็น ${tier.nextTierName}`}
          </p>
        </div>
      </div>

      {/* Official Membership Information Table */}
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
          <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>ข้อมูลสมาชิก (Membership Information)</span>
          </h4>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {member.status === 'ACTIVE' ? 'สถานะปกติ' : member.status}
          </span>
        </div>

        <div className="mt-3 divide-y divide-gray-50 text-xs">
          {/* Member Code */}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-gray-500">รหัสสมาชิก (Member Code)</span>
            <span className="font-mono font-bold text-gray-800 tracking-wider">
              {displayMemberCode}
            </span>
          </div>

          {/* Member Since */}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-gray-500">วันที่สมัครสมาชิก (Member Since)</span>
            <span className="font-medium text-gray-800">
              {formattedCreatedDate}
            </span>
          </div>

          {/* Membership Status */}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-gray-500">สถานะบัตร (Membership Status)</span>
            <span className="font-semibold text-emerald-700">
              {member.status}
            </span>
          </div>

          {/* Home Branch */}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-gray-500">สาขาหลัก (Home Branch)</span>
            <span className="font-medium text-gray-800">
              {member.homeBranchCode || 'สาขาสำนักงานใหญ่ (HQ)'}
            </span>
          </div>

          {/* Account Channel */}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-gray-500">ช่องทางเชื่อมต่อ (Auth Provider)</span>
            <span className="inline-flex items-center gap-1 font-semibold text-[#06C755]">
              <svg className="w-3.5 h-3.5 fill-[#06C755]" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 5.82 2 10.53c0 4.22 3.59 7.74 8.44 8.41.33.07.78.22.89.51.1.26.07.67.03.93l-.15.9c-.05.28-.22 1.11.97.6 1.19-.5 6.44-3.8 8.79-6.5C22.42 13.78 22 12.22 22 10.53 22 5.82 17.52 2 12 2z" />
              </svg>
              LINE MINI App
            </span>
          </div>
        </div>
      </div>

      {/* POS Security & Architecture Information Banner */}
      <div className="rounded-2xl bg-emerald-50/60 p-4 border border-emerald-100 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <span className="text-base mt-0.5">🛡️</span>
          <div>
            <h5 className="text-xs font-bold text-emerald-950">
              ระบบความปลอดภัยดิจิทัล (POS Security Standards)
            </h5>
            <p className="text-[11px] text-emerald-800/80 mt-0.5 leading-relaxed">
              QR Code ไม่มีการเก็บเบอร์โทรศัพท์หรือ Token ส่วนตัว และใช้โครงสร้าง Payload สำหรับเตรียมพร้อมเชื่อมต่อ POS
            </p>
          </div>
        </div>
        <button
          onClick={onOpenSecurityModal}
          type="button"
          className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline underline-offset-2 flex-shrink-0"
        >
          อ่านเพิ่มเติม
        </button>
      </div>
    </div>
  );
}
