'use client';

import { useCallback, useEffect, useState } from 'react';
import { useLiff } from '../components/LiffProvider';
import { Member, LineLoginResponse } from '../types/member';
import MembershipCard from '../components/MembershipCard';
import QuickActions from '../components/QuickActions';
import MemberInfoSection from '../components/MemberInfoSection';
import QrModal from '../components/QrModal';
import SecurityNoticeModal from '../components/SecurityNoticeModal';
import DashboardHeader from '../components/DashboardHeader';
import {
  LoadingView,
  CheckingView,
  LoginPromptView,
  RegistrationRequiredView,
  ApiErrorView,
} from '../components/StateViews';

export default function LiffTestPage() {
  const {
    loading,
    error,
    isLoggedIn,
    idToken,
    user,
    login,
  } = useLiff();

  const [checking, setChecking] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [member, setMember] = useState<Member | null>(null);
  const [registrationRequired, setRegistrationRequired] = useState(false);
  const [apiError, setApiError] = useState('');

  // Modals state
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);

  // Authenticate and load member data
  const authenticate = useCallback(async (isManualRefresh = false) => {
    if (!idToken) return;

    if (isManualRefresh) {
      setIsRefreshing(true);
    } else {
      setChecking(true);
    }
    
    setApiError('');
    if (!isManualRefresh) {
      setMember(null);
    }
    setRegistrationRequired(false);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '');

      if (!baseUrl) {
        throw new Error('Missing NEXT_PUBLIC_API_BASE_URL');
      }

      // 1. ส่ง LINE ID Token ให้ Backend ตรวจสอบ
      const loginResponse = await fetch(`${baseUrl}/api/auth/line`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      const loginData = (await loginResponse.json()) as LineLoginResponse;

      if (!loginResponse.ok) {
        throw new Error(loginData.message || 'LINE authentication failed');
      }

      // 2. ถ้ายังไม่ได้สมัครสมาชิก
      if (!loginData.isRegistered) {
        setRegistrationRequired(true);
        return;
      }

      if (!loginData.accessToken) {
        throw new Error('Access Token not found');
      }

      // 3. ใช้ Access Token ขอข้อมูลสมาชิก
      const profileResponse = await fetch(`${baseUrl}/api/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${loginData.accessToken}`,
        },
      });

      const profileData = await profileResponse.json();

      if (!profileResponse.ok) {
        throw new Error(profileData.message || 'Cannot load member profile');
      }

      setMember(profileData as Member);
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : 'Something went wrong'
      );
    } finally {
      setChecking(false);
      setIsRefreshing(false);
    }
  }, [idToken]);

  useEffect(() => {
    let ignore = false;
    if (loading || !isLoggedIn || !idToken) return;

    void (async () => {
      await Promise.resolve();
      if (!ignore) {
        authenticate(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [loading, isLoggedIn, idToken, authenticate]);

  // Loading state
  if (loading) {
    return <LoadingView />;
  }

  // LIFF initialization error
  if (error) {
    return <ApiErrorView message={`LIFF Error: ${error}`} />;
  }

  // Not logged in to LINE
  if (!isLoggedIn) {
    return <LoginPromptView onLogin={login} />;
  }

  // Checking backend member record (initial load)
  if (checking && !member) {
    return <CheckingView />;
  }

  // API error
  if (apiError && !member) {
    return (
      <ApiErrorView
        message={apiError}
        onRetry={() => authenticate(false)}
      />
    );
  }

  // LINE account verified, but not yet registered as a member
  if (registrationRequired) {
    return (
      <RegistrationRequiredView
        displayName={user?.displayName}
        pictureUrl={user?.pictureUrl}
      />
    );
  }

  // Waiting for member record
  if (!member) {
    return <CheckingView />;
  }

  // Member Dashboard: Digital Membership Card Experience
  return (
    <main className="min-h-screen bg-[#F6F8F5] text-gray-800 pb-12 selection:bg-emerald-200">
      <div className="max-w-md mx-auto px-4 pt-5">
        {/* Top Header */}
        <DashboardHeader
          branchName={member.homeBranchCode ? `สาขา ${member.homeBranchCode}` : 'สาขาสำนักงานใหญ่'}
          isRefreshing={isRefreshing}
          onRefresh={() => authenticate(true)}
        />

        {/* Digital Membership Card Hero */}
        <MembershipCard
          member={member}
          linePictureUrl={user?.pictureUrl}
          lineDisplayName={user?.displayName}
          onExpandQr={() => setIsQrModalOpen(true)}
          onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
        />

        {/* Quick Actions (My Points, Coupons, Purchase History, Member Benefits) */}
        <QuickActions member={member} />

        {/* Membership Details & Tier Progress */}
        <MemberInfoSection
          member={member}
          onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
        />

        {/* Fullscreen QR Modal for POS Scanning */}
        <QrModal
          isOpen={isQrModalOpen}
          onClose={() => setIsQrModalOpen(false)}
          member={member}
          linePictureUrl={user?.pictureUrl}
        />

        {/* Security & POS Architecture Explanation Modal */}
        <SecurityNoticeModal
          isOpen={isSecurityModalOpen}
          onClose={() => setIsSecurityModalOpen(false)}
          member={member}
        />

        {/* App Footer */}
        <footer className="mt-8 text-center text-xs text-gray-400 space-y-1">
          <p className="font-semibold text-gray-500">
            TJ Member · Tuenjai Panit Group
          </p>
          <p className="text-[11px]">
            ระบบบัตรสมาชิกดิจิทัลสำหรับลูกค้าคนสำคัญ · v1.0.0
          </p>
        </footer>
      </div>
    </main>
  );
}
