import {
  Menu,
  Users,
  Image,
  FileText,
  ClipboardCheck,
  AlignLeft,
  Clock,
  ImageIcon,
  Layers,
  Settings,
} from 'lucide-react'

interface NavItem {
  icon: React.ReactNode
  label: string
  active?: boolean
}

const topNavItems: NavItem[] = [
  { icon: <Users size={20} />, label: 'Users' },
  { icon: <Image size={20} />, label: 'Gallery' },
  { icon: <FileText size={20} />, label: 'Documents' },
  { icon: <ClipboardCheck size={20} />, label: 'Forms', active: true },
  { icon: <AlignLeft size={20} />, label: 'Lists' },
  { icon: <Clock size={20} />, label: 'History' },
  { icon: <ImageIcon size={20} />, label: 'Images' },
  { icon: <Layers size={20} />, label: 'Layers' },
]

export function Sidebar() {
  return (
    <aside className="flex flex-col items-center w-[72px] min-h-screen bg-[#F7F7F9] border-r border-[#EEEEF2] py-3 flex-shrink-0">
      <button
        aria-label="Toggle menu"
        className="w-10 h-10 flex items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#EEEEF2] transition-colors mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
      >
        <Menu size={20} />
      </button>

      <nav className="flex flex-col items-center gap-1 flex-1" aria-label="Main navigation">
        {topNavItems.map((item) => (
          <button
            key={item.label}
            aria-label={item.label}
            aria-current={item.active ? 'page' : undefined}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple
              ${
                item.active
                  ? 'bg-[#EEEEF2] text-[#111827] relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[3px] before:bg-brand-purple before:rounded-r-full'
                  : 'text-[#9CA3AF] hover:bg-[#EEEEF2] hover:text-[#374151]'
              }`}
          >
            {item.icon}
          </button>
        ))}
      </nav>

      <button
        aria-label="Settings"
        className="w-10 h-10 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:bg-[#EEEEF2] hover:text-[#374151] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
      >
        <Settings size={20} />
      </button>
    </aside>
  )
}
