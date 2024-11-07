interface Props {
  when: boolean
  children: React.ReactNode
}

export function Show({ children, when }: Props) {
  return when ? <>{children}</> : null
}
