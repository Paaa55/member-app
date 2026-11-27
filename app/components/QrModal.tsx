/* eslint-disable @next/next/no-img-element */
'use client';

import { QRCodeSVG } from 'qrcode.react';
import { Member } from '../types/member';
import { formatMemberCode, generateMemberQrPayload, getMemberTier } from '../utils/formatters';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member;
  linePictureUrl?: string;
}

export default function QrModal({
  isOpen,
  onClose,
  member,
  linePictureUrl,
}: QrModalProps) {
  if (!isOpen) return null;

  const tier = getMemberTier(member.currentPoints);
  const qrPayload = generateMemberQrPayload(member);
  const displayMemberCode = formatMemberCode(member.memberCode);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="ปิดหน้าจอ QR Code"
          className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Brand Monogram */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0B351F] text-white text-xs font-bold">
            TJ
          </div>
          <span className="text-sm font-extrabold tracking-wider text-[#0B351F]">
            TJ MEMBER PASS
          </span>
        </div>

        {/* Member Profile brief */}
        <div className="flex items-center gap-2.5 my-2">
          {linePictureUrl ? (
            <img
              src={linePictureUrl}
              alt={member.name}
              className="h-9 w-9 rounded-full object-cover ring-2 ring-emerald-500"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-800 text-white font-bold text-sm">
              {member.name.charAt(0) || 'M'}
            </div>
          )}
          <div className="text-left">
            <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{member.name}</h3>
            <span className="text-[11px] font-semibold text-emerald-700">{tier.name}</span>
          </div>
        </div>

        {/* Large High Contrast QR Code for POS Optical Scanners */}
        <div className="my-3 rounded-2xl border-2 border-emerald-500/20 bg-white p-4 shadow-sm flex flex-col items-center">
          <QRCodeSVG
            value={qrPayload}
            size={220}
            level="M"
            includeMargin={true}
            className="w-56 h-56"
          />

          {/* Member Code beneath QR for manual cashier key-in */}
          <div className="mt-3 text-center">
            <p className="text-[11px] text-gray-400 font-medium">รหัสสมาชิกสำหรับแคชเชียร์</p>
            <p className="font-mono text-xl font-extrabold tracking-widest text-[#0B351F]">
              {displayMemberCode}
            </p>
          </div>
        </div>

        {/* Brightness Tip for POS optical readers */}
        <div className="mt-2 flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-2 text-left text-amber-800 w-full border border-amber-200/50">
          <span className="text-base">💡</span>
          <p className="text-[11px] leading-tight text-amber-900/80">
            ปรับความสว่างหน้าจอให้อยู่ในระดับสูงสุด เพื่อให้เครื่องสแกนบาร์โค้ดอ่านได้รวดเร็ว
          </p>
        </div>

        {/* Payload / Security Confirmation */}
        <div className="mt-3 w-full text-[10px] text-gray-400 flex items-center justify-between border-t border-gray-100 pt-2.5">
          <span>Payload: TJ_MEMBER_ID v1.0</span>
          <span className="text-emerald-700 font-medium">เข้ารหัสแบบ Opaque ID</span>
        </div>

        <button
          onClick={onClose}
          type="button"
          className="mt-4 w-full rounded-xl bg-[#0B351F] hover:bg-[#124C2D] py-3 text-sm font-semibold text-white transition shadow-md"
        >
          เสร็จสิ้น
        </button>
      </div>
    </div>
  );
}
