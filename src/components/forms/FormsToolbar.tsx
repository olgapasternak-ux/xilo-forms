import { useState } from 'react'
import { FolderPlus, Mail, Plus, ChevronDown, FileText, UserCircle } from 'lucide-react'
import { Button } from '../ui/Button'
import { DropdownMenu, DropdownItem } from '../ui/DropdownMenu'

interface FormsToolbarProps {
  onNewForm?: (type: 'Intake Form' | 'Customer Form') => void
  onCreateGroup?: () => void
}

export function FormsToolbar({ onNewForm, onCreateGroup }: FormsToolbarProps) {
  const [newFormOpen, setNewFormOpen] = useState(false)

  return (
    <div className="flex items-center justify-end gap-2.5 px-6 py-4">
      <Button
        variant="outline"
        leftIcon={<FolderPlus size={15} />}
        onClick={onCreateGroup}
      >
        Create Form Group
      </Button>

      <Button
        variant="outline"
        leftIcon={<Mail size={15} />}
        disabled
        className="text-[#9CA3AF]"
      >
        Share Forms
      </Button>

      <div className="relative">
        <Button
          variant="primary"
          className="gap-0 pl-4 pr-2"
          onClick={() => setNewFormOpen((v) => !v)}
        >
          <span className="flex items-center gap-1.5 pr-2">
            <Plus size={15} />
            New Form
          </span>
          <span className="w-px h-5 bg-white/30 mx-1" />
          <ChevronDown size={15} className="ml-1" />
        </Button>

        <DropdownMenu
          open={newFormOpen}
          onClose={() => setNewFormOpen(false)}
          anchor="right"
          className="top-full"
        >
          <DropdownItem
            icon={<FileText size={15} />}
            onClick={() => { onNewForm?.('Intake Form'); setNewFormOpen(false) }}
          >
            Intake Form
          </DropdownItem>
          <DropdownItem
            icon={<UserCircle size={15} />}
            onClick={() => { onNewForm?.('Customer Form'); setNewFormOpen(false) }}
          >
            Customer Form
          </DropdownItem>
        </DropdownMenu>
      </div>
    </div>
  )
}
