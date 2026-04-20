import { useState, useMemo } from 'react'
import { mockForms } from '../../data/mockForms'
import { Form, TypeFilter } from '../../types'
import { FormsToolbar } from './FormsToolbar'
import { FormTypeFilters } from './FormTypeFilters'
import { FormGroupTabs } from './FormGroupTabs'
import { FormsTable } from './FormsTable'
import { ShareFormModal } from './ShareFormModal'

export function FormsPage() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [activeGroup, setActiveGroup] = useState('All Form Groups')
  const [searchQuery, setSearchQuery] = useState('')
  const [shareForm, setShareForm] = useState<Form | null>(null)

  const filteredForms = useMemo(() => {
    return mockForms.filter((form) => {
      const matchesType = typeFilter === 'all' || form.type === typeFilter
      const matchesGroup = activeGroup === 'All Form Groups' || form.groups.includes(activeGroup)
      const matchesSearch = !searchQuery || form.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesType && matchesGroup && matchesSearch
    })
  }, [typeFilter, activeGroup, searchQuery])

  const counts = useMemo(() => ({
    all: mockForms.length,
    customer: mockForms.filter((f) => f.type === 'Customer Form').length,
    intake: mockForms.filter((f) => f.type === 'Intake Form').length,
  }), [])

  return (
    <div className="flex flex-col h-full">
      <FormsToolbar />

      <FormTypeFilters
        activeFilter={typeFilter}
        onFilterChange={setTypeFilter}
        counts={counts}
        onSearch={setSearchQuery}
      />

      <FormGroupTabs activeTab={activeGroup} onTabChange={setActiveGroup} />

      <div className="flex-1 overflow-auto">
        <FormsTable forms={filteredForms} onOpenShareModal={setShareForm} />
      </div>

      <ShareFormModal form={shareForm} onClose={() => setShareForm(null)} />
    </div>
  )
}
