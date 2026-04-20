import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { GROUP_TABS } from '../../data/mockForms'

const VISIBLE_COUNT = 5

interface FormGroupTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function FormGroupTabs({ activeTab, onTabChange }: FormGroupTabsProps) {
  const [showAll, setShowAll] = useState(false)
  const visibleTabs = showAll ? GROUP_TABS : GROUP_TABS.slice(0, VISIBLE_COUNT)

  return (
    <div className="flex items-center gap-2 px-6 py-3 border-b border-[#F1F1F4] flex-wrap">
      {visibleTabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple
            ${activeTab === tab
              ? 'border-brand-purple text-brand-purple bg-[#F5F4FF] font-medium'
              : 'border-[#E5E7EB] text-[#111827] bg-white hover:bg-gray-50'
            }`}
        >
          {tab}
        </button>
      ))}

      {!showAll && GROUP_TABS.length > VISIBLE_COUNT && (
        <button
          onClick={() => setShowAll(true)}
          className="inline-flex items-center gap-1 px-3 py-2 text-sm text-[#6B7280] hover:text-[#111827] transition-colors focus:outline-none"
        >
          Show More
          <ChevronDown size={14} />
        </button>
      )}
      {showAll && (
        <button
          onClick={() => setShowAll(false)}
          className="inline-flex items-center gap-1 px-3 py-2 text-sm text-[#6B7280] hover:text-[#111827] transition-colors focus:outline-none"
        >
          Show Less
          <ChevronDown size={14} className="rotate-180" />
        </button>
      )}
    </div>
  )
}
