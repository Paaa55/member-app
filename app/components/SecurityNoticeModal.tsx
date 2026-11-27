'use client';

import { Member } from '../types/member';
import { generateMemberQrPayload } from '../utils/formatters';

interface SecurityNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member;
}

export default function SecurityNoticeModal({
  isOpen,
  onClose,
  member,
}: SecurityNoticeModalProps) {
  if (!isOpen) return null;

  const rawPayload = generateMemberQrPayload(member);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 text-sm font-bold">
              🛡️
            </span>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">
                ข้อกำหนดความปลอดภัย & POS Architecture
              </h3>
              <p className="text-[11px] text-gray-400">
                Security & POS API Integration Contract
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-gray-100 p-1.5 text-gray-400 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Security Commitments */}
        <div className="py-4 space-y-4 text-xs">
          <div>
            <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              หลักการความปลอดภัยข้อมูลส่วนบุคคล (Data Privacy)
            </h4>
            <ul className="space-y-1.5 text-gray-600 pl-3">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>ไม่ระบุเบอร์โทรศัพท์:</strong> ป้องกันการแอบถ่าย QR Code เพื่อนำเบอร์ไปใช้งาน</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>ไม่ระบุ LINE ID Token หรือ Access Token:</strong> ป้องกัน Token รั่วไหล</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>ใช้รหัสประจำตัวแบบ Opaque Identifier:</strong> มีเพียงระบบ POS ที่ได้รับการรับรองเท่านั้นที่จะ Map ข้อมูลได้</span>
              </li>
            </ul>
          </div>

          {/* Current QR Code Payload Inspection */}
          <div>
            <h4 className="font-bold text-gray-800 mb-1.5">
              โครงสร้าง Payload ของ QR Code ในปัจจุบัน:
            </h4>
            <pre className="rounded-xl bg-gray-900 p-3 text-[11px] font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(JSON.parse(rawPayload), null, 2)}
            </pre>
            <p className="text-[10px] text-gray-400 mt-1">
              *ข้อมูลข้างต้นเป็นโครงสร้างสาธิต (Demo Payload) เพื่อรองรับการทดสอบ UI/UX
            </p>
          </div>

          {/* Production POS Requirements */}
          <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200/60">
            <h4 className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
              <span>⚠️</span>
              ข้อจำกัดและการพัฒนาสำหรับ Production POS
            </h4>
            <p className="text-amber-900/90 leading-relaxed text-[11px]">
              QR Code ในเวอร์ชันนี้เป็น <strong>Identity Representation สำหรับทดสอบหน้าบ้าน</strong> ยังไม่ถือเป็น Production-ready สำหรับการสแกนหักเงินหรือตัดคะแนนที่แคชเชียร์ จนกว่าจะมีการพัฒนาระบบฝั่ง Backend ดังนี้:
            </p>
            <ol className="list-decimal pl-4 mt-2 space-y-1 text-amber-950 text-[11px]">
              <li>ระบบ <strong>Dynamic TOTP / One-Time QR Token</strong> ที่หมดอายุภายใน 60 วินาที</li>
              <li>การป้องกัน <strong>Replay Attack</strong> (ป้องกันการแคปหน้าจอ QR ไปใช้งานซ้ำ)</li>
              <li>API Endpoint <code>POST /api/pos/members/scan</code> ฝั่ง Backend สำหรับเครื่องสแกน POS</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-gray-100">
          <button
            onClick={onClose}
            type="button"
            className="w-full rounded-xl bg-[#0B351F] py-2.5 text-xs font-semibold text-white hover:bg-emerald-900 transition"
          >
            รับทราบและปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
}
