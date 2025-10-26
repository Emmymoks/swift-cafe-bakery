import React from 'react'

// Modern floating background with luxury café SVG icons
export default function FloatingBackground() {
  const items = [
    { id: 1, type: 'coffee', left: '8%', top: '15%', size: 80, delay: '0s', dur: '14s' },
    { id: 2, type: 'croissant', left: '22%', top: '70%', size: 90, delay: '2s', dur: '18s' },
    { id: 3, type: 'bean', left: '42%', top: '25%', size: 60, delay: '1s', dur: '15s' },
    { id: 4, type: 'cupcake', left: '68%', top: '16%', size: 72, delay: '3s', dur: '19s' },
    { id: 5, type: 'bread', left: '85%', top: '60%', size: 76, delay: '4s', dur: '16s' },
    { id: 6, type: 'whisk', left: '12%', top: '80%', size: 64, delay: '5s', dur: '17s' },
    { id: 7, type: 'donut', left: '55%', top: '75%', size: 86, delay: '1.5s', dur: '20s' },
    { id: 8, type: 'tea', left: '35%', top: '55%', size: 70, delay: '2.5s', dur: '16s' },
    { id: 9, type: 'leaf', left: '74%', top: '35%', size: 60, delay: '0.5s', dur: '18s' },
    { id: 10, type: 'muffin', left: '18%', top: '40%', size: 68, delay: '1s', dur: '14s' },
    { id: 11, type: 'croissant', left: '88%', top: '20%', size: 80, delay: '3.2s', dur: '22s' },
    { id: 12, type: 'coffee', left: '50%', top: '10%', size: 75, delay: '1.8s', dur: '21s' },
  ]

  const Icon = ({ type }) => {
    switch (type) {
      case 'coffee':
        return (
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 8h14v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" fill="currentColor" />
            <path d="M19 8h1a3 3 0 1 1 0 6h-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        )
      case 'croissant':
        return (
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 12a9 9 0 0 1 18 0c0 5-4 9-9 9s-9-4-9-9z" fill="currentColor" />
            <path d="M7 12c1-3 9-3 10 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        )
      case 'bean':
        return (
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M9 4c-3 2-4 6-2 9s6 4 9 2 4-6 2-9-6-4-9-2z" fill="currentColor" />
          </svg>
        )
      case 'cupcake':
        return (
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 14h14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4z" fill="currentColor" />
            <path d="M4 12c0-2 2-3 4-3s3 1 4 1 2-1 4-1 4 1 4 3" stroke="currentColor" strokeWidth="1" />
          </svg>
        )
      case 'bread':
        return (
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 13c0 3-4 6-8 6s-8-3-8-6 3-6 8-6 8 3 8 6z" fill="currentColor" />
          </svg>
        )
      case 'whisk':
        return (
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 19l5-5m0 0a5 5 0 0 0 7-7 5 5 0 0 0-7 7z" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        )
      case 'donut':
        return (
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" fill="currentColor" />
            <circle cx="12" cy="12" r="3" fill="#0f0f10" />
          </svg>
        )
      case 'tea':
        return (
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 10h14v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-6z" fill="currentColor" />
            <path d="M17 10h3a3 3 0 0 1 0 6h-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        )
      case 'leaf':
        return (
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 13c2-5 8-8 16-8-2 5-8 8-16 8z" fill="currentColor" />
            <path d="M4 13c4-2 8-4 12-4" stroke="currentColor" strokeWidth="1" />
          </svg>
        )
      case 'muffin':
        return (
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 14h14v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3z" fill="currentColor" />
            <path d="M8 14c-.5-2 1-4 4-4s4 2 4 4" stroke="currentColor" strokeWidth="1" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="floating-bg" aria-hidden="true">
      {items.map((item) => (
        <div
          key={item.id}
          className={`float-item ${item.type}`}
          style={{
            left: item.left,
            top: item.top,
            width: item.size + 'px',
            height: item.size + 'px',
            '--d': item.dur,
            '--delay': item.delay,
          }}
        >
          <div className="icon-wrap">
            <Icon type={item.type} />
          </div>
        </div>
      ))}
    </div>
  )
}
