import { Link, useLocation } from 'react-router-dom'
import { m as motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

const SITE = {
  name: import.meta.env.VITE_SITE_NAME || 'Binary Minds',
  logoPath: import.meta.env.VITE_SITE_LOGO || '/logo.png',
}

export default function Navbar() {
  const location = useLocation()
  const [imgError, setImgError] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [isOpen, setIsOpen] = useState(false)
  
  const menuRef = useRef(null)
  const itemsRef = useRef([])

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/minds', label: 'Minds' },
    { to: '/events', label: 'Events' },
    { to: '/blitz', label: 'Blitz' },
  ]

  useEffect(() => {
    // Close menu when route changes
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.mobile-menu-toggle')) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        return
      }
      
      const focusable = itemsRef.current.filter(Boolean)
      if (focusable.length === 0) return
      
      const index = focusable.findIndex(el => el === document.activeElement)
      
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const next = (index + 1) % focusable.length
        focusable[next]?.focus()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prev = index - 1 < 0 ? focusable.length - 1 : index - 1
        focusable[prev]?.focus()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100, x: 0 }}
      animate={{ y: 0, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav-logo">
        <a href="https://kaziranga.iitmbs.org/" target="_blank" rel="noopener noreferrer" className="cursor-target" style={{ display: 'flex', alignItems: 'center' }}>
          {!imgError ? (
            <img
              src={SITE.logoPath}
              alt={`${SITE.name} logo`}
              className="nav-logo-img"
              onError={() => setImgError(true)}
              style={{ borderRadius: '0', border: 'none', background: 'transparent', objectFit: 'contain', boxShadow: 'none' }}
            />
          ) : (
            <div className="nav-logo-icon">BM</div>
          )}
        </a>
        <div style={{ width: '1px', height: '20px', background: 'rgba(255, 255, 255, 0.2)', margin: '0 0.25rem' }} />
        <Link to="/" className="cursor-target" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <span className="nav-logo-text">{SITE.name}</span>
        </Link>
      </div>

      {!isMobile ? (
        <div className="nav-links">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-link cursor-target${location.pathname === item.to ? ' active' : ''}`}
            >
              {item.label}
            </Link>
          ))}

          <motion.button
            className="nav-join-btn cursor-target"
            onClick={() => window.open('https://forms.gle/9o3EBp7mH5Hq6BpGA', '_blank')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="nav-join-text">Join Now</span>
          </motion.button>
        </div>
      ) : (
        <>
          <button 
            className={`mobile-menu-toggle ${isOpen ? 'open' : ''}`} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                className="mobile-dropdown-menu"
                ref={menuRef}
                role="navigation"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="mobile-dropdown-inner">
                  {navItems.map((item, idx) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      ref={el => itemsRef.current[idx] = el}
                      className={`mobile-nav-link ${location.pathname === item.to ? 'active' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <button
                    ref={el => itemsRef.current[navItems.length] = el}
                    className="mobile-nav-join-btn"
                    onClick={() => {
                      window.open('https://forms.gle/9o3EBp7mH5Hq6BpGA', '_blank')
                      setIsOpen(false)
                    }}
                  >
                    Join Now
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.nav>
  )
}
