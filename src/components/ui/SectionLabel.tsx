interface SectionLabelProps {
  text: string
  className?: string
}

export function SectionLabel({ text, className = '' }: SectionLabelProps) {
  return (
    <span className={`text-label text-gold block ${className}`}>
      {text}
    </span>
  )
}
