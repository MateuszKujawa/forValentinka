export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffc2e0] via-[#ff8fc7] to-[#e896d8]" />
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#ffd6ea] via-[#ff5fa8] to-[#f0a3e8] will-change-[opacity]"
        style={{ animation: 'bg-shift 16s ease-in-out infinite' }}
      />
      <div
        className="absolute -top-1/4 -left-1/4 h-[70vmax] w-[70vmax] rounded-full bg-[#ff9ecb]/70 blur-3xl will-change-transform"
        style={{ animation: 'blob-float-1 15s ease-in-out infinite' }}
      />
      <div
        className="absolute top-1/3 -right-1/4 h-[60vmax] w-[60vmax] rounded-full bg-[#ff7fc2]/55 blur-3xl will-change-transform"
        style={{ animation: 'blob-float-2 19s ease-in-out infinite' }}
      />
      <div
        className="absolute -bottom-1/4 left-1/4 h-[55vmax] w-[55vmax] rounded-full bg-[#ffb3d9]/45 blur-3xl will-change-transform"
        style={{ animation: 'blob-float-3 23s ease-in-out infinite' }}
      />
      <div
        className="absolute -bottom-1/3 -right-1/3 h-[50vmax] w-[50vmax] rounded-full bg-[#ff4f9e]/35 blur-3xl will-change-transform"
        style={{ animation: 'blob-float-4 20s ease-in-out infinite' }}
      />
    </div>
  )
}
