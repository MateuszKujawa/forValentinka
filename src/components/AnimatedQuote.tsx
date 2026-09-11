import { motion } from 'framer-motion'

const LETTER_COLORS = ['#ffffff', '#ffd9f0', '#ff7fc2', '#ffe08a', '#ffffff']

interface AnimatedQuoteProps {
  text: string
}

export default function AnimatedQuote({ text }: AnimatedQuoteProps) {
  return (
    <motion.div
      className="flex items-center justify-center gap-2 px-4"
      animate={{
        filter: [
          'drop-shadow(0 0 0px rgba(255,182,222,0.6))',
          'drop-shadow(0 0 12px rgba(255,182,222,0.95))',
          'drop-shadow(0 0 0px rgba(255,182,222,0.6))',
        ],
      }}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.span
        className="text-xl"
        animate={{ rotate: [0, 25, -15, 0], scale: [1, 1.35, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        ✨
      </motion.span>

      <p className="text-center text-lg font-bold text-white italic">
        &ldquo;
        {text.split('').map((char, index) =>
          char === ' ' ? (
            ' '
          ) : (
            <motion.span
              key={index}
              className="inline-block"
              animate={{
                y: [0, -9, 0],
                color: LETTER_COLORS,
              }}
              transition={{
                y: {
                  duration: 1.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.045,
                },
                color: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.08,
                },
              }}
            >
              {char}
            </motion.span>
          ),
        )}
        &rdquo;
      </p>

      <motion.span
        className="text-xl"
        animate={{ rotate: [0, -25, 15, 0], scale: [1, 1.35, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      >
        ✨
      </motion.span>
    </motion.div>
  )
}
