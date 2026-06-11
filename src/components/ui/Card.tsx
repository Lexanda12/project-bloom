import { clsx } from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl bg-bloom-surface border border-bloom-border p-5',
        className
      )}
    >
      {children}
    </div>
  )
}
