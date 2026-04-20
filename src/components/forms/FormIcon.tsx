import { Car, Home, FileText, Briefcase, Layers } from 'lucide-react'
import { FormIcon as FormIconType } from '../../types'

interface FormIconProps {
  icon: FormIconType
  size?: number
}

export function FormIconDisplay({ icon, size = 18 }: FormIconProps) {
  const cls = 'text-[#6B7280]'
  switch (icon) {
    case 'car':
      return <Car size={size} className={cls} />
    case 'home':
      return <Home size={size} className={cls} />
    case 'auto-home':
      return (
        <span className="relative inline-flex">
          <Car size={size} className={cls} />
        </span>
      )
    case 'business':
      return <Briefcase size={size} className={cls} />
    case 'bundle':
      return <Layers size={size} className={cls} />
    case 'document':
    default:
      return <FileText size={size} className={cls} />
  }
}
