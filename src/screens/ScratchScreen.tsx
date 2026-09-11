import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const REVEAL_THRESHOLD = 0.55
const BRUSH_RADIUS = 26
const SAMPLE_STEP = 8

interface ScratchScreenProps {
  onContinue: () => void
}

export default function ScratchScreen({ onContinue }: ScratchScreenProps) {
  const { t } = useTranslation()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isScratchingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)
  const lastWidthRef = useRef(0)
  const [revealed, setRevealed] = useState(false)

  const setupCanvas = useCallback((width: number, height: number) => {
    const canvas = canvasRef.current
    if (!canvas || width === 0 || height === 0) return
    // Only rebuild on an actual width change — Safari on iOS fires a resize
    // when the address bar shows/hides while scratching, which only changes
    // height and would otherwise wipe the player's progress.
    if (Math.abs(width - lastWidthRef.current) < 1) return
    lastWidthRef.current = width
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#ff8fc7')
    gradient.addColorStop(1, '#ff5fa2')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
    ctx.font = `600 ${Math.max(16, width * 0.045)}px Quicksand, sans-serif`
    ctx.fillStyle = 'rgba(255,255,255,0.9)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(t('scratch.hint'), width / 2, height / 2)
    ctx.globalCompositeOperation = 'destination-out'
  }, [t])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    // setupCanvas (and so this effect) also re-runs when the language
    // changes, since `t` gets a new identity — force the next observer
    // callback to actually redraw (with the new translated hint text)
    // instead of being skipped by the same-width guard below.
    lastWidthRef.current = 0
    // ResizeObserver's contentRect is the element's untransformed layout
    // box, unlike getBoundingClientRect() which includes the parent screen's
    // enter transition (scale/blur) — measuring mid-transition previously
    // locked the canvas to a slightly-too-small size, leaving a gap on the
    // right/bottom edges once the transition settled.
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      setupCanvas(entry.contentRect.width, entry.contentRect.height)
    })
    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [setupCanvas])

  const getRelativePoint = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    return { x: event.clientX - rect.left, y: event.clientY - rect.top }
  }

  const scratchAt = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.beginPath()
    ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2)
    ctx.fill()
  }

  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const { width, height } = canvas
    let cleared = 0
    let total = 0
    const data = ctx.getImageData(0, 0, width, height).data
    for (let y = 0; y < height; y += SAMPLE_STEP) {
      for (let x = 0; x < width; x += SAMPLE_STEP) {
        const alpha = data[(y * width + x) * 4 + 3]
        if (alpha < 40) cleared++
        total++
      }
    }
    if (total > 0 && cleared / total > REVEAL_THRESHOLD) {
      setRevealed(true)
    }
  }, [])

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    isScratchingRef.current = true
    const point = getRelativePoint(event)
    lastPointRef.current = point
    scratchAt(point.x, point.y)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current) return
    const point = getRelativePoint(event)
    const last = lastPointRef.current ?? point
    const dist = Math.hypot(point.x - last.x, point.y - last.y)
    const steps = Math.max(1, Math.floor(dist / (BRUSH_RADIUS / 2)))
    for (let i = 1; i <= steps; i++) {
      const ratio = i / steps
      scratchAt(last.x + (point.x - last.x) * ratio, last.y + (point.y - last.y) * ratio)
    }
    lastPointRef.current = point
  }

  const handlePointerUp = () => {
    if (!isScratchingRef.current) return
    isScratchingRef.current = false
    checkProgress()
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-10">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-lg font-medium text-white drop-shadow-sm sm:text-xl"
      >
        {t('scratch.title')}
      </motion.p>

      <div className="w-full max-w-md overflow-hidden rounded-[28px] border border-white/40 shadow-[0_8px_32px_rgba(80,30,90,0.25)] sm:max-w-lg">
        <div ref={wrapperRef} className="relative aspect-[2/1] w-full">
          <div className="absolute inset-0 flex items-center justify-center bg-white/90">
            <p className="font-script px-4 text-center text-3xl text-pink-600 sm:text-4xl">
              {t('scratch.message')}
            </p>
          </div>
          <AnimatePresence>
            {!revealed && (
              <motion.canvas
                ref={canvasRef}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className="absolute inset-0 h-full w-full touch-none select-none"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="h-12">
        <AnimatePresence>
          {revealed && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onClick={onContinue}
              className="rounded-2xl bg-white/90 px-8 py-3 font-semibold text-pink-600 shadow-md transition-transform active:scale-95"
            >
              {t('scratch.continue')}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
