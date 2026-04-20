import { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { TopHeader } from './TopHeader'

interface PageLayoutProps {
  children: ReactNode
  title: string
  userName: string
  orgName: string
}

export function PageLayout({ children, title, userName, orgName }: PageLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-white font-sans">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopHeader title={title} userName={userName} orgName={orgName} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
