export interface Member {
  id: string;
  memberCode: string | null;
  name: string;
  lineUserId: string | null;
  phone: string | null;
  birthDate: string | null;
  homeBranchCode?: string | null;
  currentPoints: number;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | string;
  createdAt: string;
}

export interface LineLoginResponse {
  isRegistered: boolean;
  accessToken?: string;
  registrationToken?: string;
  member?: Member;
  message?: string;
}

export interface MemberQrPayload {
  v: string;
  iss: 'TJ_MEMBER';
  type: 'MEMBER_CARD_ID';
  mid: string;
  code: string;
  iat: number;
  env: 'demo';
  note: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  nameTh: string;
  badgeColor: string;
  minPoints: number;
  nextTierPoints: number;
  nextTierName: string;
  perks: string[];
}
