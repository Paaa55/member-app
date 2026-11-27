'use client';

interface DashboardHeaderProps {
  branchName?: string;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export default function DashboardHeader({
  branchName = 'สาขาสำนักงานใหญ่',
  isRefreshing,
  onRefresh,
}: DashboardHeaderProps) {
  return (
    <header className="w-full flex items-center justify-between pb-4">
      {/* Brand Monogram & Name */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0B351F] text-white font-extrabold text-base shadow-sm border border-emerald-700/40">
          TJ
        </div>
        <div>
          <h1 className="text-base font-extrabold text-[#0B351F] tracking-tight leading-tight">
            TJ Member
          </h1>
          <p className="text-[11px] font-medium text-gray-500">
            Tuenjai Panit Digital Card
          </p>
        </div>
      </div>

      {/* Right controls: Branch pill & Refresh button */}
      <div className="flex items-center gap-2">
        <div className="hidden xs:flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-medium text-gray-600 shadow-sm border border-gray-100">
          <span className="text-emerald-600">📍</span>
          <span className="truncate max-w-[110px]">{branchName}</span>
        </div>

        {/* Refresh Points / Card Button */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          title="รีเฟรชข้อมูลบัตร"
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm border border-gray-100 hover:text-emerald-700 hover:border-emerald-200 transition disabled:opacity-50"
        >
          <svg
            className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
