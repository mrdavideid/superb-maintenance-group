interface GoldDividerProps {
  className?: string
}

export function GoldDivider({ className = '' }: GoldDividerProps) {
  return <div className={`gold-line w-full ${className}`} />
}
