interface GroupTagProps {
  name: string
  overflow?: boolean
}

export function GroupTag({ name, overflow = false }: GroupTagProps) {
  if (overflow) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[12px] font-medium bg-[#F2F2F5] text-[#6B7280] whitespace-nowrap">
        {name}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[12px] font-medium bg-[#F2F2F5] text-[#2E2E3A] whitespace-nowrap">
      {name}
    </span>
  )
}
