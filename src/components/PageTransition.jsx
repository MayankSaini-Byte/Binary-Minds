import { forwardRef } from 'react'
import { m as motion } from 'framer-motion'

const pageVariants = {
  initial: { opacity: 0, y: 15, filter: 'blur(10px)' },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { 
    opacity: 0, 
    y: -15, 
    filter: 'blur(10px)',
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
  }
}

const PageTransition = forwardRef(({ children, className }, ref) => {
  return (
    <motion.main
      ref={ref}
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.main>
  )
})

PageTransition.displayName = 'PageTransition'
export default PageTransition
