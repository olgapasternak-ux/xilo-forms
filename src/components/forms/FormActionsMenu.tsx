import { useState, useRef, useEffect } from 'react'
import { MoreHorizontal, PenSquare, Share2, Link, Copy, Trash2, ChevronRight } from 'lucide-react'
import { DropdownMenu, DropdownItem, DropdownDivider } from '../ui/DropdownMenu'
import { Form } from '../../types'

interface FormActionsMenuProps {
  form: Form
  onEdit?: (form: Form) => void
  onShare?: (form: Form) => void
  onCreateLink?: (form: Form) => void
  onDelete?: (form: Form) => void
}

export function FormActionsMenu({ form, onEdit, onShare, onCreateLink, onDelete }: FormActionsMenuProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative">
      <button
        aria-label="More actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v) }}
        className="w-8 h-8 flex items-center justify-center rounded-md border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-gray-50 hover:text-[#111827] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
      >
        <MoreHorizontal size={16} />
      </button>

      <DropdownMenu open={open} onClose={() => setOpen(false)} anchor="right">
        <DropdownItem
          icon={<PenSquare size={16} />}
          onClick={() => { onEdit?.(form); setOpen(false) }}
        >
          Edit Form
        </DropdownItem>
        <DropdownItem
          icon={<Share2 size={16} />}
          onClick={() => { onShare?.(form); setOpen(false) }}
        >
          Share Form
        </DropdownItem>
        <DropdownItem
          icon={<Link size={16} />}
          onClick={() => { onCreateLink?.(form); setOpen(false) }}
        >
          Create Link
        </DropdownItem>
        <DropdownItem
          icon={<Copy size={16} />}
          rightIcon={<ChevronRight size={14} />}
        >
          Duplicate As
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem
          icon={<Trash2 size={16} />}
          destructive
          onClick={() => { onDelete?.(form); setOpen(false) }}
        >
          Delete Form
        </DropdownItem>
      </DropdownMenu>
    </div>
  )
}
