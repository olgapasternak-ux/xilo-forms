import { useState } from 'react'
import { FileText, Folder, User, Calendar } from 'lucide-react'
import { Form } from '../../types'
import { Checkbox } from '../ui/Checkbox'
import { FormRow } from './FormRow'

interface FormsTableProps {
  forms: Form[]
  onOpenShareModal: (form: Form) => void
}

export function FormsTable({ forms, onOpenShareModal }: FormsTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const allSelected = forms.length > 0 && selectedIds.size === forms.length
  const someSelected = selectedIds.size > 0 && !allSelected

  function toggleAll(checked: boolean) {
    setSelectedIds(checked ? new Set(forms.map((f) => f.id)) : new Set())
  }

  function toggleOne(id: string, checked: boolean) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse min-w-[900px]">
        <thead>
          <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <th className="pl-4 pr-2 py-3 w-10">
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onChange={(e) => toggleAll(e.target.checked)}
                aria-label="Select all forms"
              />
            </th>
            <th className="px-4 py-3 text-left">
              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#6B7280]">
                <FileText size={14} />
                Forms
              </span>
            </th>
            <th className="px-4 py-3 text-left border-l border-[#EEEEF2] w-[160px]">
              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#6B7280]">
                <FileText size={14} />
                Form Type
              </span>
            </th>
            <th className="px-4 py-3 text-left border-l border-[#EEEEF2] min-w-[200px]">
              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#6B7280]">
                <Folder size={14} />
                Group
              </span>
            </th>
            <th className="px-4 py-3 text-left border-l border-[#EEEEF2] w-[160px]">
              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#6B7280]">
                <User size={14} />
                Created by
              </span>
            </th>
            <th className="px-4 py-3 text-left border-l border-[#EEEEF2] w-[120px]">
              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#6B7280]">
                <Calendar size={14} />
                Last Updated
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {forms.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-16 text-center text-[#9CA3AF] text-sm">
                No forms found.
              </td>
            </tr>
          ) : (
            forms.map((form) => (
              <FormRow
                key={form.id}
                form={form}
                selected={selectedIds.has(form.id)}
                onSelect={toggleOne}
                onOpenShareModal={onOpenShareModal}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
