import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md'
  children: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export function Button({
  variant = 'outline',
  size = 'md',
  children,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-1.5 font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-1'

  const sizes = {
    sm: 'px-3 py-1.5 text-[13px]',
    md: 'px-[14px] py-[9px] text-sm',
  }

  const variants = {
    primary:
      'bg-brand-purple text-white shadow-sm hover:bg-brand-purple-hover disabled:opacity-50 disabled:cursor-not-allowed',
    outline:
      'bg-white text-[#374151] border border-[#E5E7EB] hover:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed',
    ghost: 'bg-transparent text-[#6B7280] hover:bg-gray-100',
  }

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  )
}
