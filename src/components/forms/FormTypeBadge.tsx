import { FileText, UserCircle } from 'lucide-react'
import { FormType } from '../../types'

interface FormTypeBadgeProps {
  type: FormType
}

export function FormTypeBadge({ type }: FormTypeBadgeProps) {
  if (type === 'Intake Form') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[13px] font-medium bg-[#EEF0FF] text-brand-purple whitespace-nowrap">
        <FileText size={13} />
        Intake Form
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[13px] font-medium bg-[#FFF4D6] text-brand-yellow whitespace-nowrap">
      <UserCircle size={13} />
      Customer Form
    </span>
  )
}
