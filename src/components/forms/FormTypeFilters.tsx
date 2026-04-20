import { FileText, UserCircle, SlidersHorizontal } from 'lucide-react'
import { TypeFilter } from '../../types'
import { SearchInput } from '../ui/SearchInput'

interface FormTypeFiltersProps {
  activeFilter: TypeFilter
  onFilterChange: (f: TypeFilter) => void
  counts: { all: number; customer: number; intake: number }
  onSearch: (query: string) => void
}

export function FormTypeFilters({ activeFilter, onFilterChange, counts, onSearch }: FormTypeFiltersProps) {
  return (
    <div className="flex items-center gap-2 px-6 py-3 border-b border-[#F1F1F4]">
      {/* All Forms pill */}
      <button
        onClick={() => onFilterChange('all')}
        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors focus:outline-none
          ${activeFilter === 'all'
            ? 'border-[#2E2E3A] text-[#111827] bg-white'
            : 'border-[#E5E7EB] text-[#6B7280] bg-white hover:bg-gray-50'
          }`}
      >
        All Forms
        <span className="text-[12px] text-[#6B7280]">({counts.all})</span>
      </button>

      {/* Customer Form pill */}
      <button
        onClick={() => onFilterChange('Customer Form')}
        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors focus:outline-none
          ${activeFilter === 'Customer Form'
            ? 'border-[#B88A1E] bg-[#FFF4D6] text-[#B88A1E]'
            : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#FFF4D6]/40'
          }`}
      >
        <UserCircle size={14} className={activeFilter === 'Customer Form' ? 'text-[#B88A1E]' : 'text-[#9CA3AF]'} />
        Customer Form
        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-semibold
          ${activeFilter === 'Customer Form' ? 'bg-[#E8C97A] text-[#7A5A10]' : 'bg-[#F2F2F5] text-[#6B7280]'}`}>
          {counts.customer}
        </span>
      </button>

      {/* Intake Form pill */}
      <button
        onClick={() => onFilterChange('Intake Form')}
        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors focus:outline-none
          ${activeFilter === 'Intake Form'
            ? 'border-brand-purple bg-[#EEF0FF] text-brand-purple'
            : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#EEF0FF]/40'
          }`}
      >
        <FileText size={14} className={activeFilter === 'Intake Form' ? 'text-brand-purple' : 'text-[#9CA3AF]'} />
        Intake Form
        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-semibold
          ${activeFilter === 'Intake Form' ? 'bg-[#C4C9FF] text-brand-purple' : 'bg-[#F2F2F5] text-[#6B7280]'}`}>
          {counts.intake}
        </span>
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <SearchInput onValueChange={onSearch} className="w-56" />

      {/* Filter button */}
      <button className="inline-flex items-center gap-1.5 px-3.5 py-[7px] text-sm font-medium text-[#374151] border border-[#E5E7EB] rounded-lg bg-white hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple">
        <SlidersHorizontal size={15} />
        Filter
      </button>
    </div>
  )
}
