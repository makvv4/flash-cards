import type { ChangeEvent } from 'react'

interface NumericInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  min?: number
  className?: string
}

export default function NumericInput({
  id,
  label,
  value,
  onChange,
  min = 0,
  className = '',
}: NumericInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (/^\d*$/.test(val)) {
      onChange(val)
    }
  }

  return (
    <div className="inline-flex flex-col items-start">
      <label htmlFor={id}>
        {label}
        :
      </label>
      <input
        type="text"
        id={id}
        inputMode="numeric"
        pattern="[0-9]*"
        min={min}
        value={value}
        className={`rounded-sm border px-1 ${className}`}
        onChange={handleChange}
      />
    </div>
  )
}
