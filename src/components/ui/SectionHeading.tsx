interface SectionHeadingProps {
  text: string
  as?: 'h1' | 'h2' | 'h3'
  size?: 'hero' | 'h1' | 'h2' | 'h3'
  className?: string
}

const sizeClasses = {
  hero: 'text-[clamp(3.5rem,10vw,9rem)] font-semibold leading-[0.95] tracking-[-0.02em]',
  h1: 'text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[1.0] tracking-[-0.02em]',
  h2: 'text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.01em]',
  h3: 'text-[clamp(1.5rem,2.5vw,2rem)] font-medium leading-[1.2]',
}

export function SectionHeading({
  text,
  as: Tag = 'h2',
  size = 'h2',
  className = '',
}: SectionHeadingProps) {
  return (
    <Tag className={`font-display text-white-pure ${sizeClasses[size]} ${className}`}>
      {text}
    </Tag>
  )
}
