import { clsx } from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'whatsapp' | 'ghost'
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  fullWidth = true,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'min-h-[56px] rounded-2xl font-semibold text-base transition-opacity active:opacity-80',
        fullWidth && 'w-full',
        variant === 'primary' && 'bg-bloom-primary text-white',
        variant === 'whatsapp' && 'bg-bloom-whatsapp text-white',
        variant === 'ghost' && 'bg-transparent text-bloom-primary underline',
        className
      )}
    >
      {children}
    </button>
  )
}
