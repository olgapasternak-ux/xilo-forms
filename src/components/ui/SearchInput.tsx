import { InputHTMLAttributes, useRef } from 'react'
import { Search } from 'lucide-react'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string) => void
}

export function SearchInput({ onValueChange, className = '', ...props }: SearchInputProps) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onValueChange?.(e.target.value)
    }, 200)
  }

  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3 text-[#9CA3AF] pointer-events-none" size={15} />
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
        className="w-full pl-9 pr-3 py-[7px] text-sm border border-[#E5E7EB] rounded-lg bg-white placeholder-[#9CA3AF] text-[#111827] focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
        {...props}
      />
    </div>
  )
}
