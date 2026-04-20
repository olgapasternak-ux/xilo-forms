interface UserBadgeProps {
  name: string
}

export function UserBadge({ name }: UserBadgeProps) {
  return (
    <span className="text-[13px] font-medium text-brand-purple">
      {name}
    </span>
  )
}
