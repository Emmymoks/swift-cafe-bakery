import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import FloatingBackground from './components/FloatingBackground'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { initAnimator, destroyAnimator } from './utils/animator'
import CartDrawer from './components/CartDrawer'
import { useCart } from './context/CartContext'

function App() {
  const location = useLocation()
  const { cartOpen, closeCart } = useCart()

  useEffect(() => {
    // initialize Lenis smooth scrolling only once
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    // initialize intersection-based reveal animations
    const cleanupAnimator = initAnimator()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // cleanup on unmount
    return () => {
      lenis.destroy()
      // cleanup animator observer
      try {
        cleanupAnimator && cleanupAnimator()
      } catch (e) {
        // noop
      }
    }
  }, [])

  useEffect(() => {
    // scroll to top and play a fresh animation on route change
    window.scrollTo(0, 0)
    gsap.killTweensOf('.fade-in')
    gsap.fromTo(
      '.fade-in',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out' }
    )
    // re-run animator to scan newly mounted route elements
    try {
      initAnimator()
    } catch (e) {
      // noop
    }
  }, [location])

  return (
    <div className="app">
      <FloatingBackground />
      <Nav />
      {/* cart drawer rendered at app level so it overlays pages */}
      <CartDrawer open={cartOpen} onClose={closeCart} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
