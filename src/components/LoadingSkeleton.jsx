import React from 'react'

export default function LoadingSkeleton() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#0D0D0D',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999
    }}>
      <style>{`
        @keyframes pulseBar {
          0% { opacity: 0.3; transform: scaleX(0.9); }
          50% { opacity: 1; transform: scaleX(1.1); }
          100% { opacity: 0.3; transform: scaleX(0.9); }
        }
        .neon-bar-skeleton {
          width: 150px;
          height: 4px;
          background-color: #00FF88;
          border-radius: 4px;
          box-shadow: 0 0 20px #00FF88, 0 0 40px rgba(0, 255, 136, 0.4);
          animation: pulseBar 1.5s ease-in-out infinite;
        }
      `}</style>
      <div className="neon-bar-skeleton" />
    </div>
  )
}
