'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { type ReactNode } from 'react'

interface TapScaleProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  className?: string
  scale?: number
}

export default function TapScale({
  children,
  className = '',
  scale = 0.97,
  ...props
}: TapScaleProps) {
  return (
    <motion.div
      whileTap={{ scale }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
