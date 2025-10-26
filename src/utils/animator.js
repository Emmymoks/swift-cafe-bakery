// Lightweight animator using IntersectionObserver.
// Exports initAnimator() which scans for elements with `.reveal` and `.reveal-stagger`.
// Returns a cleanup function or use destroyAnimator().

let observer = null

function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch (e) {
    return false
  }
}

export function initAnimator(root = document) {
  // if reduced motion is requested, just reveal everything immediately
  if (prefersReducedMotion()) {
    Array.from(root.querySelectorAll('.reveal')).forEach(el => el.classList.add('reveal--visible'))
    Array.from(root.querySelectorAll('.reveal-stagger')).forEach(container => {
      Array.from(container.querySelectorAll('.reveal')).forEach((c, i) => {
        c.style.transitionDelay = `${i * 80}ms`
        c.classList.add('reveal--visible')
      })
    })
    return () => {}
  }

  // disconnect previous observer if any
  if (observer) observer.disconnect()

  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const el = entry.target
        if (entry.isIntersecting) {
          if (el.classList.contains('reveal-stagger')) {
            const items = Array.from(el.querySelectorAll('.reveal'))
            items.forEach((item, idx) => {
              // add small stagger
              item.style.transitionDelay = `${idx * 80}ms`
              item.classList.add('reveal--visible')
            })
            observer.unobserve(el)
          } else {
            el.classList.add('reveal--visible')
            observer.unobserve(el)
          }
        }
      })
    },
    { threshold: 0.12 }
  )

  // observe direct .reveal elements not inside .reveal-stagger
  Array.from(root.querySelectorAll('.reveal-stagger')).forEach(el => observer.observe(el))
  Array.from(root.querySelectorAll('.reveal')).forEach(el => {
    // do not observe reveals that are inside a stagger container (they will be handled by the container)
    if (!el.closest('.reveal-stagger')) observer.observe(el)
  })

  return () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }
}

export function destroyAnimator() {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}
