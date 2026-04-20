import { ReactNode, useEffect, useRef } from 'react'

interface DropdownMenuProps {
  open: boolean
  onClose: () => void
  anchor?: 'right' | 'left'
  children: ReactNode
  className?: string
}

export function DropdownMenu({
  open,
  onClose,
  anchor = 'right',
  children,
  className = '',
}: DropdownMenuProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={ref}
      role="menu"
      aria-expanded={open}
      className={`absolute z-50 mt-1 bg-white border border-[#E5E7EB] rounded-xl shadow-lg p-2 min-w-[230px] ${
        anchor === 'right' ? 'right-0' : 'left-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

interface DropdownItemProps {
  icon?: ReactNode
  children: ReactNode
  onClick?: () => void
  destructive?: boolean
  rightIcon?: ReactNode
  className?: string
}

export function DropdownItem({
  icon,
  children,
  onClick,
  destructive = false,
  rightIcon,
  className = '',
}: DropdownItemProps) {
  return (
    <button
      role="menuitem"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] transition-colors text-left
        ${destructive ? 'text-[#D14343] hover:bg-red-50' : 'text-[#111827] hover:bg-[#F5F4FF]'}
        ${className}`}
    >
      {icon && <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">{icon}</span>}
      <span className="flex-1">{children}</span>
      {rightIcon && <span className="ml-auto text-[#9CA3AF]">{rightIcon}</span>}
    </button>
  )
}

export function DropdownDivider() {
  return <div className="my-1 border-t border-[#F1F1F4]" />
}
