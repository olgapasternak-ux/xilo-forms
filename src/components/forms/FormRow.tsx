import { useState } from 'react'
import { Form } from '../../types'
import { Checkbox } from '../ui/Checkbox'
import { FormTypeBadge } from './FormTypeBadge'
import { GroupTag } from './GroupTag'
import { UserBadge } from './UserBadge'
import { FormIconDisplay } from './FormIcon'
import { FormActionsMenu } from './FormActionsMenu'
import { Button } from '../ui/Button'

const MAX_VISIBLE_GROUPS = 2

interface FormRowProps {
  form: Form
  selected: boolean
  onSelect: (id: string, checked: boolean) => void
  onOpenShareModal: (form: Form) => void
}

export function FormRow({ form, selected, onSelect, onOpenShareModal }: FormRowProps) {
  const [hovered, setHovered] = useState(false)

  const visibleGroups = form.groups.slice(0, MAX_VISIBLE_GROUPS)
  const overflowCount = form.groups.length - MAX_VISIBLE_GROUPS

  return (
    <tr
      className={`border-b border-[#F1F1F4] transition-colors ${hovered ? 'bg-[#FAFAFA]' : 'bg-white'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Checkbox */}
      <td className="pl-4 pr-2 py-0 w-10">
        <Checkbox
          checked={selected}
          onChange={(e) => onSelect(form.id, e.target.checked)}
          aria-label={`Select ${form.name}`}
        />
      </td>

      {/* Form name + inline actions */}
      <td className="px-4 py-0 min-w-[280px]">
        <div className="flex items-center gap-2.5 h-[72px]">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F2F2F5] flex-shrink-0">
            <FormIconDisplay icon={form.icon} size={16} />
          </div>
          <span className="text-sm font-medium text-[#111827] truncate flex-1">{form.name}</span>
          <div className={`flex items-center gap-1.5 ml-auto transition-opacity flex-shrink-0 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
            <Button size="sm" variant="outline">Open</Button>
            <Button size="sm" variant="outline">Copy</Button>
            <FormActionsMenu
              form={form}
              onShare={onOpenShareModal}
              onCreateLink={onOpenShareModal}
            />
          </div>
        </div>
      </td>

      {/* Form Type */}
      <td className="px-4 py-0 border-l border-[#EEEEF2] w-[160px]">
        <div className="h-[72px] flex items-center">
          <FormTypeBadge type={form.type} />
        </div>
      </td>

      {/* Group */}
      <td className="px-4 py-0 border-l border-[#EEEEF2] min-w-[200px]">
        <div className="h-[72px] flex items-center gap-1.5 flex-wrap">
          {form.groups.length === 0 ? (
            <span className="text-[#9CA3AF] text-sm">-</span>
          ) : (
            <>
              {visibleGroups.map((g) => (
                <GroupTag key={g} name={g} />
              ))}
              {overflowCount > 0 && (
                <GroupTag name={`+${overflowCount}`} overflow />
              )}
            </>
          )}
        </div>
      </td>

      {/* Created by */}
      <td className="px-4 py-0 border-l border-[#EEEEF2] w-[160px]">
        <div className="h-[72px] flex items-center">
          <UserBadge name={form.createdBy} />
        </div>
      </td>

      {/* Last updated */}
      <td className="px-4 py-0 border-l border-[#EEEEF2] w-[120px]">
        <div className="h-[72px] flex items-center">
          <span className="text-sm text-[#6B7280]">{form.updatedAt}</span>
        </div>
      </td>

    </tr>
  )
}
