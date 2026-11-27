/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Member } from '../types/member';
import { formatMemberCode, generateMemberQrPayload, getMemberTier } from '../utils/formatters';

interface MembershipCardProps {
  member: Member;
  linePictureUrl?: string;
  lineDisplayName?: string;
  onExpandQr: () => void;
  onOpenSecurityModal: () => void;
}

export default function MembershipCard({
  member,
  linePictureUrl,
  lineDisplayName,
  onExpandQr,
  onOpenSecurityModal,
}: MembershipCardProps) {
  const [copied, setCopied] = useState(false);
  const tier = getMemberTier(member.currentPoints);
  const qrPayload = generateMemberQrPayload(member);
  const displayMemberCode = formatMemberCode(member.memberCode);

  const handleCopyCode = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (member.memberCode) {
      try {
        await navigator.clipboard.writeText(member.memberCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback for older browsers
      }
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B351F] via-[#124C2D] to-[#072414] text-white shadow-2xl border border-[#20603A]/40 transition-all duration-300">
      {/* Luxury Background Watermark Pattern */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-12 -bottom-12 h-56 w-56 rounded-full bg-yellow-500/10 blur-3xl" />
      
      {/* Subtle Guilloché / Radial Geometric Accent */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"
      />

      <div className="relative p-6 sm:p-7 flex flex-col justify-between">
        {/* Top Header: Branding & Tier Badge */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* TJ Logo Emblem */}
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E8A4E] to-[#125831] shadow-inner border border-white/20">
              <span className="text-xl font-black tracking-tighter text-white">TJ</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-wider text-white">TJ MEMBER</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[10px] font-medium tracking-widest text-emerald-200/70 uppercase">
                Tuenjai Panit Group
              </p>
            </div>
          </div>

          {/* Membership Tier Badge (Demo tier with label) */}
          <div className="flex flex-col items-end">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400/20 via-yellow-400/30 to-amber-300/20 px-3 py-1 border border-amber-300/40 backdrop-blur-md">
              <svg className="w-3.5 h-3.5 text-amber-300 fill-amber-300" viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-xs font-bold text-amber-200 tracking-wide uppercase">
                {tier.name}
              </span>
            </div>
            <span className="text-[9px] text-emerald-200/60 mt-0.5 tracking-tight">
              (Demo Tier)
            </span>
          </div>
        </div>

        {/* Member Profile Row */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            {/* LINE Profile Picture or Fallback Monogram */}
            <div className="relative">
              {linePictureUrl ? (
                <img
                  src={linePictureUrl}
                  alt={member.name}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-emerald-400/50 shadow-md"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-800/80 ring-2 ring-white/20 text-white font-bold text-lg">
                  {member.name.charAt(0) || 'M'}
                </div>
              )}
              {/* Active verification badge */}
              <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-emerald-500 border-2 border-[#0B351F] flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            </div>

            {/* Member Names & Code */}
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight line-clamp-1">
                {member.name}
              </h2>
              {lineDisplayName && lineDisplayName !== member.name && (
                <p className="text-xs text-emerald-200/70 line-clamp-1">
                  LINE: {lineDisplayName}
                </p>
              )}
              
              {/* Member Code with Copy Icon */}
              <div className="mt-1 flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-emerald-100/90 tracking-wider">
                  {displayMemberCode}
                </span>
                <button
                  onClick={handleCopyCode}
                  type="button"
                  title="คัดลอกรหัสสมาชิก"
                  className="inline-flex items-center justify-center rounded-md bg-white/10 p-1 hover:bg-white/20 transition text-emerald-200"
                >
                  {copied ? (
                    <span className="text-[10px] text-emerald-300 px-1 font-sans">คัดลอกแล้ว</span>
                  ) : (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Points Highlight Chip */}
          <div className="text-right pl-2">
            <span className="text-[10px] font-medium text-emerald-200/80 uppercase tracking-wider block">
              คะแนนสะสม
            </span>
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-2xl font-black text-amber-300 tracking-tight">
                {member.currentPoints.toLocaleString()}
              </span>
              <span className="text-[11px] font-medium text-emerald-200/70">แต้ม</span>
            </div>
          </div>
        </div>

        {/* QR Code Retail Presentation Container */}
        <div className="mt-5 rounded-2xl bg-white p-4 shadow-lg flex flex-col items-center">
          <div 
            onClick={onExpandQr}
            className="group relative cursor-pointer flex flex-col items-center w-full"
            role="button"
            tabIndex={0}
            aria-label="แตะเพื่อขยาย QR Code"
          >
            {/* QR Code Container with High Optical Readability */}
            <div className="bg-white p-2 rounded-xl transition-transform duration-200 group-hover:scale-[1.02]">
              <QRCodeSVG
                value={qrPayload}
                size={168}
                level="M"
                includeMargin={false}
                className="w-40 h-40 sm:w-44 sm:h-44"
              />
            </div>

            {/* Member Code beneath QR for manual POS cashier entry */}
            <div className="mt-2 flex items-center justify-center gap-1.5 text-gray-800">
              <span className="text-[11px] text-gray-400 font-medium">รหัสสมาชิก:</span>
              <span className="font-mono text-sm font-bold tracking-widest text-[#0B351F]">
                {displayMemberCode}
              </span>
            </div>

            {/* Tap to expand hint */}
            <div className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-emerald-700 group-hover:text-emerald-800 transition">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span>แตะเพื่อขยาย QR Code สำหรับสแกน</span>
            </div>
          </div>

          {/* Security & POS Demo Notice Pill */}
          <div className="mt-3 pt-2.5 border-t border-gray-100 w-full flex items-center justify-between text-[10px] text-gray-400">
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>QR Code สำหรับระบุตัวตน (POS Demo v1.0)</span>
            </div>
            <button
              onClick={onOpenSecurityModal}
              type="button"
              className="text-emerald-700 hover:text-emerald-800 font-semibold underline underline-offset-2 flex items-center gap-0.5"
            >
              <span>ความปลอดภัย</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Card Footer Bar */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-emerald-100/70 pt-1">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>{member.homeBranchCode ? `สาขา ${member.homeBranchCode}` : 'ทุกสาขา Tuenjai Panit'}</span>
          </div>

          <div className="flex items-center gap-1 font-medium text-emerald-200">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            <span>สถานะ: {member.status === 'ACTIVE' ? 'พร้อมใช้งาน' : member.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
