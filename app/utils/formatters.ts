import { Member, MemberQrPayload, MembershipTier } from '../types/member';

/**
 * Format member code for display (e.g., "TJ-2026-0042")
 */
export function formatMemberCode(code: string | null | undefined): string {
  if (!code) return 'TJ-PENDING';
  return code.toUpperCase();
}

/**
 * Format registration date to Thai readable string
 */
export function formatThaiDate(dateString: string | null | undefined): string {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    
    const day = date.getDate();
    const months = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear() + 543; // Buddhist Era
    return `${day} ${month} ${year}`;
  } catch {
    return dateString;
  }
}

/**
 * Generate secure, versioned, non-sensitive QR payload for POS identity demonstration
 * Strictly adheres to security rules:
 * - NO phone numbers
 * - NO LINE ID Token or JWT tokens
 * - NO personal identifiable details (PII)
 * - Uses only versioned schema, issuer, and opaque member ID/code
 */
export function generateMemberQrPayload(member: Member): string {
  const payload: MemberQrPayload = {
    v: '1.0',
    iss: 'TJ_MEMBER',
    type: 'MEMBER_CARD_ID',
    mid: member.id,
    code: member.memberCode || member.id.slice(0, 8).toUpperCase(),
    iat: Math.floor(Date.now() / 1000),
    env: 'demo',
    note: 'DEMO_PAYLOAD: Production POS requires backend-signed dynamic one-time tokens',
  };

  return JSON.stringify(payload);
}

/**
 * Calculate member tier (Demo logic until backend provides tier schema)
 */
export function getMemberTier(points: number = 0): MembershipTier {
  if (points >= 5000) {
    return {
      id: 'PLATINUM',
      name: 'Platinum Member',
      nameTh: 'สมาชิกระดับแพลทินัม',
      badgeColor: 'from-amber-200 via-yellow-400 to-amber-500',
      minPoints: 5000,
      nextTierPoints: 5000,
      nextTierName: 'ระดับสูงสุด',
      perks: [
        'สะสมคะแนน x3 ทุกการใช้จ่าย',
        'ส่วนลดพิเศษ 10% ทุกวันศุกร์',
        'คูปองวันเกิดมูลค่า 300 บาท',
        'บริการจัดส่งฟรีไม่มีขั้นต่ำ',
        'ช่องทางชำระเงินด่วนพิเศษ'
      ]
    };
  }

  if (points >= 1000) {
    return {
      id: 'GOLD',
      name: 'Gold Member',
      nameTh: 'สมาชิกระดับโกลด์',
      badgeColor: 'from-yellow-300 via-amber-400 to-yellow-600',
      minPoints: 1000,
      nextTierPoints: 5000,
      nextTierName: 'Platinum Member',
      perks: [
        'สะสมคะแนน x2 ทุกการใช้จ่าย',
        'ส่วนลดพิเศษ 5% สินค้าร่วมรายการ',
        'คูปองวันเกิดมูลค่า 150 บาท',
        'บริการจัดส่งฟรีเมื่อช้อปครบ 500 บาท'
      ]
    };
  }

  return {
    id: 'SILVER',
    name: 'Silver Member',
    nameTh: 'สมาชิกระดับซิลเวอร์',
    badgeColor: 'from-slate-200 via-gray-300 to-zinc-400',
    minPoints: 0,
    nextTierPoints: 1000,
    nextTierName: 'Gold Member',
    perks: [
      'สะสมคะแนน 1 แต้ม ทุก 25 บาท',
      'รับสิทธิพิเศษโปรโมชั่นรายสัปดาห์',
      'คูปองต้อนรับสมาชิกใหม่',
      'แลกคะแนนเป็นส่วนลดเงินสด'
    ]
  };
}
