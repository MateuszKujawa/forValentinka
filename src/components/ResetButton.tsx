interface ResetButtonProps {
  onReset: () => void
}

export default function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onReset}
      aria-label="Od początku"
      title="Od początku"
      className="fixed top-[max(1rem,env(safe-area-inset-top))] left-4 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white/80 backdrop-blur-xl transition-colors hover:text-white active:scale-95"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M4 11.5 12 4l8 7.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 10v8.5a1 1 0 0 0 1 1h3.5v-5h3v5H17a1 1 0 0 0 1-1V10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
