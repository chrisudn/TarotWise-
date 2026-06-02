'use client'

interface PositionLabelProps {
  label: string
  description: string
  isActive?: boolean
}

export default function PositionLabel({ label, description, isActive = true }: PositionLabelProps) {
  return (
    <div className={`text-center transition-opacity ${isActive ? 'opacity-100' : 'opacity-50'}`}>
      <div className="text-lg font-semibold text-primary">{label}</div>
      <div className="text-sm text-muted mt-0.5">{description}</div>
    </div>
  )
}
