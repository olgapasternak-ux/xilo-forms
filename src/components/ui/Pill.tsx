import { ReactNode } from 'react'

interface PillProps {
  children: ReactNode
  active?: boolean
  onClick?: () => void
  className?: string
}

export function Pill({ children, active = false, onClick, className = '' }: PillProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple ${
        active
          ? 'border-brand-purple text-brand-purple bg-[#F5F4FF] font-medium'
          : 'border-[#E5E7EB] text-[#111827] bg-white hover:bg-gray-50'
      } ${className}`}
    >
      {children}
    </button>
  )
}
