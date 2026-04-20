import { LogOut } from 'lucide-react'

interface TopHeaderProps {
  title: string
  userName: string
  orgName: string
  onLogout?: () => void
}

export function TopHeader({ title, userName, orgName, onLogout }: TopHeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-[#F1F1F4] bg-white flex-shrink-0">
      <h1 className="text-2xl font-bold text-[#111827] tracking-tight">{title}</h1>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-[#111827] leading-tight">{userName}</p>
          <p className="text-xs text-[#6B7280] leading-tight">{orgName}</p>
        </div>
        <button
          onClick={onLogout}
          className="inline-flex items-center gap-1.5 px-[14px] py-[6px] text-sm font-medium text-brand-purple border border-[#E5E7EB] rounded-md hover:bg-[#F5F4FF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </header>
  )
}
