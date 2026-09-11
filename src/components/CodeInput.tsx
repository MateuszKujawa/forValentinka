import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react'

interface CodeInputProps {
  length: number
  onComplete: (code: string) => void
  error?: boolean
  resetSignal?: number
}

export default function CodeInput({ length, onComplete, error, resetSignal }: CodeInputProps) {
  const [digits, setDigits] = useState<string[]>(() => Array(length).fill(''))
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    setDigits(Array(length).fill(''))
    inputsRef.current[0]?.focus()
  }, [resetSignal, length])

  useEffect(() => {
    if (digits.length > 0 && digits.every((digit) => digit !== '')) {
      onComplete(digits.join(''))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits])

  function handleChange(index: number, rawValue: string) {
    const value = rawValue.replace(/\D/g, '')
    setDigits((prev) => {
      const next = [...prev]
      next[index] = value ? value[value.length - 1] : ''
      return next
    })
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
      setDigits((prev) => {
        const next = [...prev]
        next[index - 1] = ''
        return next
      })
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return
    const next = Array(length).fill('')
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i]
    setDigits(next)
    inputsRef.current[Math.min(pasted.length, length - 1)]?.focus()
  }

  return (
    <div className="flex justify-center gap-1.5 sm:gap-2">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          autoComplete="off"
          value={digit}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          aria-label={`Cyfra ${index + 1}`}
          className={`h-11 w-8 rounded-xl border bg-white/25 text-center text-lg font-semibold text-[#5b1140] caret-[#5b1140] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_4px_10px_rgba(122,20,70,0.15)] backdrop-blur-md backdrop-saturate-150 outline-none transition-colors focus:border-white/80 focus:bg-white/40 sm:h-12 sm:w-10 sm:text-xl ${
            error ? 'border-red-400' : 'border-white/40'
          } ${index === 2 || index === 4 ? 'ml-3 sm:ml-4' : ''}`}
        />
      ))}
    </div>
  )
}
