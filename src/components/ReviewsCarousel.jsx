import React, { useEffect, useRef, useState } from 'react'

const reviews = [
  { id: 1, name: 'Amina', text: 'Best coffee in town. Smooth, rich and the staff are lovely!', rating: 5 },
  { id: 2, name: 'Daniel', text: 'Fresh pastries every morning. The croissant was flaky perfection.', rating: 5 },
  { id: 3, name: 'Sofia', text: 'Cozy spot and great service. Highly recommend the almond latte.', rating: 5 },
  { id: 4, name: 'Liam', text: 'Amazing flavors and very friendly baristas. My daily go-to.', rating: 5 },
  { id: 5, name: 'Grace', text: 'Delicious cakes and a lovely atmosphere. Will come back often.', rating: 5 },
  { id: 6, name: 'Omar', text: 'Perfect place to work for a few hours. Great Wi‑Fi and coffee.', rating: 5 },
  { id: 7, name: 'Hannah', text: 'Exceptional taste. The banana bread was moist and flavorful.', rating: 5 },
  { id: 8, name: 'Marco', text: 'A gem of a bakery. Everything tasted homemade and fresh.', rating: 5 },
  { id: 9, name: 'Priya', text: 'Lovely presentation and fast service. The cakes are a delight!', rating: 5 },
  { id: 10, name: 'Noah', text: 'Consistently great quality. Friendly staff and relaxing vibe.', rating: 5 },
]

export default function ReviewsCarousel() {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef(null)
  const containerRef = useRef(null)
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)

  useEffect(() => {
    startAuto()
    return () => stopAuto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  function startAuto() {
    stopAuto()
    timeoutRef.current = setTimeout(() => {
      setIndex(prev => (prev + 1) % reviews.length)
    }, 5000)
  }

  function stopAuto() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  function goPrev() {
    setIndex(prev => (prev - 1 + reviews.length) % reviews.length)
  }

  function goNext() {
    setIndex(prev => (prev + 1) % reviews.length)
  }

  // Touch handlers for swipe support on mobile
  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = null
    stopAuto()
  }

  function onTouchMove(e) {
    touchEndX.current = e.touches[0].clientX
  }

  function onTouchEnd() {
    if (touchStartX.current != null && touchEndX.current != null) {
      const dx = touchEndX.current - touchStartX.current
      if (Math.abs(dx) > 40) {
        if (dx > 0) goPrev()
        else goNext()
      }
    }
    startAuto()
  }

  return (
    <section className="reviews-section container" aria-label="Customer reviews">
      <div className="reviews-inner">
        <h3 className="reviews-title">What our customers say</h3>

        <div
          className="reviews-carousel"
          ref={containerRef}
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {reviews.map((r, i) => (
            <article
              key={r.id}
              className={`review-card ${i === index ? 'active' : ''}`}
              aria-hidden={i === index ? 'false' : 'true'}
              aria-live={i === index ? 'polite' : 'off'}
            >
              <div className="stars" aria-hidden>
                {Array.from({ length: r.rating }).map((_, k) => (
                  <span key={k} className="star">★</span>
                ))}
              </div>
              <p className="review-text">{r.text}</p>
              <p className="review-name"> {r.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
