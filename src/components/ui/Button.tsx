import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'gold' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
  disabled?: boolean
}

const variants = {
  gold: 'bg-gold text-black-pure hover:bg-gold-light hover:shadow-[0_0_20px_rgba(184,150,90,0.15)]',
  outline: 'border border-gold/40 text-gold hover:bg-gold hover:text-black-pure',
  ghost: 'text-white-muted hover:text-gold',
}

const sizes = {
  sm: 'h-9 px-5 text-[0.65rem]',
  md: 'h-11 px-7 text-[0.7rem]',
  lg: 'h-13 px-9 text-[0.75rem]',
}

export function Button({
  children,
  variant = 'outline',
  size = 'md',
  href,
  type = 'button',
  onClick,
  className,
  disabled,
}: ButtonProps) {
  const classes = cn(
    'btn-sweep inline-flex items-center justify-center font-body font-normal tracking-[0.25em] uppercase transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] disabled:opacity-40 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
