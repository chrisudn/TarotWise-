'use client'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'large'
  className?: string
  disabled?: boolean
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'default',
  className = '',
  disabled = false,
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-light active:bg-primary',
    secondary: 'border-2 border-primary text-primary hover:bg-primary/5 active:bg-primary/10',
    ghost: 'text-primary hover:bg-black/5 active:bg-black/10',
  }

  const sizes = {
    default: 'h-touch px-8 text-lg',
    large: 'h-16 px-10 text-xl',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}
