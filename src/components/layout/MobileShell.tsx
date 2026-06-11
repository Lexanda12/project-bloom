import { clsx } from 'clsx'

interface MobileShellProps {
  children: React.ReactNode
  className?: string
}

export function MobileShell({ children, className }: MobileShellProps) {
  return (
    <div
      className={clsx(
        'min-h-screen bg-bloom-canvas mx-auto max-w-[430px] px-5 pb-20',
        className
      )}
    >
      {children}
    </div>
  )
}
