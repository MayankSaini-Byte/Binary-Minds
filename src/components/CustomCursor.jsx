import { useEffect, useRef } from 'react'
import gsap from '../lib/gsap'

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Set initial position quickly using GSAP setter
    const xSet = gsap.quickSetter(cursor, 'x', 'px')
    const ySet = gsap.quickSetter(cursor, 'y', 'px')

    const mouse = { x: 0, y: 0 }
    const pos = { x: 0, y: 0 }

    // Follower animation
    const followMouse = () => {
      // Ease value: adjust for springiness (0.1 = smooth/slow, 0.5 = snappy)
      const ease = 0.15 
      pos.x += (mouse.x - pos.x) * ease
      pos.y += (mouse.y - pos.y) * ease
      
      xSet(pos.x)
      ySet(pos.y)
      
      requestAnimationFrame(followMouse)
    }
    requestAnimationFrame(followMouse)

    // Update target coordinates on mousemove
    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    // Interactive states (hovering links/buttons)
    const onMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        gsap.to(cursor, { scale: 2.5, backgroundColor: 'rgba(48, 102, 190, 0.1)', border: '1px solid var(--cyan)', duration: 0.3 })
      }
    }

    const onMouseOut = (e) => {
      const target = e.target
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        gsap.to(cursor, { scale: 1, backgroundColor: 'var(--cyan)', border: 'none', duration: 0.3 })
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => gsap.to(cursor, { opacity: 0, duration: 0.3 }))
    document.addEventListener('mouseenter', () => gsap.to(cursor, { opacity: 1, duration: 0.3 }))

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        backgroundColor: 'var(--cyan)',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'difference'
      }}
    />
  )
}
