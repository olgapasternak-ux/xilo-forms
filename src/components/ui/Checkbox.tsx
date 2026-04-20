import { InputHTMLAttributes, useEffect, useRef } from 'react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  indeterminate?: boolean
}

export function Checkbox({ label, indeterminate, className = '', ...props }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate ?? false
    }
  }, [indeterminate])

  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <input
        ref={ref}
        type="checkbox"
        className="w-4 h-4 rounded border-[#D1D5DB] text-brand-purple accent-[#5A4FFF] cursor-pointer focus:ring-brand-purple focus:ring-offset-0"
        {...props}
      />
      {label && <span className="ml-2 text-sm text-[#374151]">{label}</span>}
    </label>
  )
}
