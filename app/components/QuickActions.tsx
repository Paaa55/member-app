'use client';

import { useState } from 'react';
import { Member } from '../types/member';
import { getMemberTier } from '../utils/formatters';

interface QuickActionsProps {
  member: Member;
}

type ActionModalType = 'points' | 'coupons' | 'history' | 'benefits' | null;

export default function QuickActions({ member }: QuickActionsProps) {
  const [activeModal, setActiveModal] = useState<ActionModalType>(null);
  const tier = getMemberTier(member.currentPoints);

  // Demo Coupons Data
  const demoCoupons = [
    {
      id: 'CPN-01',
      title: 'ส่วนลด 50 บาท',
      desc: 'เมื่อซื้อสินค้าในเครือเตือนใจพาณิชย์ครบ 500 บาท',
      exp: '31 ธ.ค. 2026',
      tag: 'ยอดนิยม',
      code: 'TJ50OFF',
    },
    {
      id: 'CPN-02',
      title: 'ฟรี คูปองเครื่องดื่ม / กาแฟ',
      desc: 'รับสิทธิ์เครื่องดื่มฟรี 1 แก้วที่มุมกาแฟทุกสาขา',
      exp: '15 ธ.ค. 2026',
      tag: 'สิทธิพิเศษ',
      code: 'TJCOFFEE',
    },
    {
      id: 'CPN-03',
      title: 'คะแนนสะสม x2 เท่า',
      desc: 'สำหรับการซื้อสินค้าแผนกของใช้ในครัวเรือน',
      exp: '31 ม.ค. 2027',
      tag: 'Bonus Points',
      code: 'TJDOUBLE',
    },
  ];

  // Demo Purchase History Data
  const demoHistory = [
    {
      id: 'INV-2026-0891',
      date: '25 พ.ย. 2026, 14:32 น.',
      branch: 'สาขาสำนักงานใหญ่ (HQ)',
      amount: '฿580.00',
      pointsEarned: '+23 แต้ม',
      itemsCount: '4 รายการ',
    },
    {
      id: 'INV-2026-0744',
      date: '18 พ.ย. 2026, 11:15 น.',
      branch: 'สาขาตลาดสดเตือนใจ',
      amount: '฿1,240.00',
      pointsEarned: '+49 แต้ม',
      itemsCount: '8 รายการ',
    },
    {
      id: 'INV-2026-0610',
      date: '02 พ.ย. 2026, 17:50 น.',
      branch: 'สาขาสำนักงานใหญ่ (HQ)',
      amount: '฿320.00',
      pointsEarned: '+12 แต้ม',
      itemsCount: '2 รายการ',
    },
  ];

  return (
    <div className="w-full mt-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-bold text-gray-800 tracking-tight">
          บริการและสิทธิประโยชน์
        </h3>
        <span className="text-[11px] font-medium text-emerald-700">
          Quick Actions
        </span>
      </div>

      {/* 4 Action Buttons Grid */}
      <div className="grid grid-cols-4 gap-2.5">
        {/* Action 1: My Points */}
        <button
          onClick={() => setActiveModal('points')}
          type="button"
          className="group flex flex-col items-center justify-center rounded-2xl bg-white p-3 shadow-sm border border-gray-100 hover:border-emerald-200 hover:shadow-md transition text-center"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 group-hover:scale-105 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="mt-2 text-xs font-semibold text-gray-700 leading-tight">
            คะแนนสะสม
          </span>
          <span className="text-[10px] text-amber-700 font-bold mt-0.5">
            {member.currentPoints.toLocaleString()} แต้ม
          </span>
        </button>

        {/* Action 2: Coupons */}
        <button
          onClick={() => setActiveModal('coupons')}
          type="button"
          className="group relative flex flex-col items-center justify-center rounded-2xl bg-white p-3 shadow-sm border border-gray-100 hover:border-emerald-200 hover:shadow-md transition text-center"
        >
          {/* Notification Badge */}
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow">
            3
          </span>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-105 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>
          <span className="mt-2 text-xs font-semibold text-gray-700 leading-tight">
            คูปองของฉัน
          </span>
          <span className="text-[10px] text-emerald-600 font-medium mt-0.5">
            3 ใบพร้อมใช้
          </span>
        </button>

        {/* Action 3: Purchase History */}
        <button
          onClick={() => setActiveModal('history')}
          type="button"
          className="group flex flex-col items-center justify-center rounded-2xl bg-white p-3 shadow-sm border border-gray-100 hover:border-emerald-200 hover:shadow-md transition text-center"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:scale-105 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <span className="mt-2 text-xs font-semibold text-gray-700 leading-tight">
            ประวัติซื้อ
          </span>
          <span className="text-[10px] text-gray-400 font-medium mt-0.5">
            ใบเสร็จ
          </span>
        </button>

        {/* Action 4: Member Benefits */}
        <button
          onClick={() => setActiveModal('benefits')}
          type="button"
          className="group flex flex-col items-center justify-center rounded-2xl bg-white p-3 shadow-sm border border-gray-100 hover:border-emerald-200 hover:shadow-md transition text-center"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 group-hover:scale-105 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>
          <span className="mt-2 text-xs font-semibold text-gray-700 leading-tight">
            สิทธิพิเศษ
          </span>
          <span className="text-[10px] text-purple-700 font-medium mt-0.5">
            {tier.name.split(' ')[0]}
          </span>
        </button>
      </div>

      {/* Interactive Detail Sheet / Modal for Quick Actions */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 backdrop-blur-sm transition-opacity"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-white p-6 shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  {activeModal === 'points' && '🪙'}
                  {activeModal === 'coupons' && '🏷️'}
                  {activeModal === 'history' && '🧾'}
                  {activeModal === 'benefits' && '👑'}
                </span>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">
                    {activeModal === 'points' && 'คะแนนสะสมของฉัน'}
                    {activeModal === 'coupons' && 'คูปองและส่วนลดพิเศษ'}
                    {activeModal === 'history' && 'ประวัติการซื้อสินค้า'}
                    {activeModal === 'benefits' && 'สิทธิประโยชน์สมาชิก'}
                  </h4>
                  <span className="text-[10px] text-gray-400">
                    ข้อมูลจำลอง (Demo Feature Preview)
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="rounded-full bg-gray-100 p-1.5 text-gray-400 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body: Points Detail */}
            {activeModal === 'points' && (
              <div className="py-4 space-y-4">
                <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-5 text-white text-center shadow-md">
                  <p className="text-xs text-amber-100">คะแนนปัจจุบันของคุณ</p>
                  <p className="text-3xl font-extrabold mt-1">{member.currentPoints.toLocaleString()} แต้ม</p>
                  <p className="text-xs text-amber-100/90 mt-2">
                    คะแนนเทียบเท่ามูลค่าส่วนลด ฿{(member.currentPoints * 0.1).toFixed(0)} บาท
                  </p>
                </div>
                <div className="rounded-xl border border-gray-100 p-3 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>การคำนวณแต้ม</span>
                    <span className="font-semibold text-gray-800">25 บาท = 1 คะแนน</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>คะแนนที่จะหมดอายุปีนี้</span>
                    <span className="font-semibold text-gray-800">0 แต้ม (ยังไม่มีแต้มหมดอายุ)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Body: Coupons List */}
            {activeModal === 'coupons' && (
              <div className="py-4 space-y-3">
                {demoCoupons.map((coupon) => (
                  <div key={coupon.id} className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 relative overflow-hidden">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          {coupon.tag}
                        </span>
                        <h5 className="font-bold text-gray-800 text-sm mt-1">{coupon.title}</h5>
                        <p className="text-xs text-gray-500 mt-0.5">{coupon.desc}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-emerald-100/80 flex items-center justify-between text-xs">
                      <span className="text-gray-400 text-[11px]">ใช้ได้ถึง {coupon.exp}</span>
                      <button 
                        type="button"
                        onClick={() => alert(`คูปองโค้ด: ${coupon.code} (ตัวอย่างฟังก์ชันสาธิต)`)}
                        className="rounded-lg bg-[#0B351F] text-white px-3 py-1 text-xs font-semibold hover:bg-emerald-800 transition"
                      >
                        กดรับสิทธิ์
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Modal Body: Purchase History */}
            {activeModal === 'history' && (
              <div className="py-4 space-y-3">
                {demoHistory.map((history) => (
                  <div key={history.id} className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-gray-800">{history.branch}</span>
                        <p className="text-[11px] text-gray-400 mt-0.5">{history.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-gray-900">{history.amount}</span>
                        <p className="text-[11px] font-semibold text-emerald-600">{history.pointsEarned}</p>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-200/60 flex items-center justify-between text-[11px] text-gray-500">
                      <span>เลขที่: {history.id}</span>
                      <span>{history.itemsCount}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Modal Body: Member Benefits */}
            {activeModal === 'benefits' && (
              <div className="py-4 space-y-3">
                <div className="rounded-2xl bg-purple-50 p-4 border border-purple-100">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👑</span>
                    <div>
                      <h5 className="font-bold text-purple-900 text-sm">สิทธิประโยชน์ {tier.name}</h5>
                      <p className="text-xs text-purple-700">{tier.nameTh}</p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-gray-700">
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-center gap-2 rounded-xl bg-gray-50 p-2.5">
                      <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer Close */}
            <div className="mt-4 pt-3 border-t border-gray-100 text-center">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full rounded-xl bg-gray-100 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-200 transition"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
