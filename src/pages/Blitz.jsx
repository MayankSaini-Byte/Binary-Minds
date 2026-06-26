import { m as motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

export default function Blitz() {
  return (
    <PageTransition className="page coming-soon-page">
      <div className="coming-soon-container">
        {/* Decorative floating orbs */}
        <motion.div
          className="cs-orb cs-orb-1"
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="cs-orb cs-orb-2"
          animate={{ y: [0, 15, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="cs-orb cs-orb-3"
          animate={{ y: [0, -12, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Animated icon */}
        <motion.div
          className="cs-icon"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 120 }}
        >
          ⚡
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          className="cs-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="eyebrow-dot" />
          Blitz
        </motion.div>

        {/* Title */}
        <motion.h1
          className="cs-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          Coming <span className="cs-gradient">Soon</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="cs-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          Blitz is our flagship rapid-fire coding challenge. Get ready for
          intense timed rounds, algorithm battles, and competitive programming at its finest.
        </motion.p>

        {/* Animated progress bar */}
        <motion.div
          className="cs-progress-track"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <motion.div
            className="cs-progress-bar"
            initial={{ width: '0%' }}
            animate={{ width: '40%' }}
            transition={{ duration: 1.5, delay: 1.3, ease: 'easeOut' }}
          />
        </motion.div>
        <motion.span
          className="cs-progress-label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          40% complete
        </motion.span>

        {/* Pulsing dots */}
        <motion.div
          className="cs-dots"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="cs-dot"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </motion.div>
      </div>
    </PageTransition>
  )
}
