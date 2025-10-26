import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(e) {
      if (open && menuRef.current && !menuRef.current.contains(e.target))
        setOpen(false)
    }
    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [open])

  return (
    <motion.header
      className="nav"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container nav-inner">
        {/* Brand */}
        <div
          className="brand"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <h1>Swift Cafe and Bakery</h1>
          <p className="motto">Swiftly Serving you delights.</p>
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Order Button */}
        <NavLink to="/menu" className="btn primary desktop-order">
          Order Now
        </NavLink>

        {/* Cart Button (always visible) */}
        <CartButton />

        {/* Mobile Menu Controls */}
        <div className="mobile-controls" ref={menuRef}>
          <button
            className="mobile-toggle"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <motion.svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={false}
              animate={open ? 'open' : 'closed'}
            >
              <motion.path
                variants={{
                  closed: { d: 'M3 6h18', stroke: '#fff' },
                  open: { d: 'M5 5l14 14', stroke: '#fff' },
                }}
                transition={{ duration: 0.25 }}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <motion.path
                variants={{
                  closed: { d: 'M3 12h18', opacity: 1, stroke: '#fff' },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.25 }}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <motion.path
                variants={{
                  closed: { d: 'M3 18h18', stroke: '#fff' },
                  open: { d: 'M5 19L19 5', stroke: '#fff' },
                }}
                transition={{ duration: 0.25 }}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </motion.svg>
          </button>

          {/* Mobile Dropdown */}
          <AnimatePresence>
            {open && (
              <motion.div
                className="mobile-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      isActive ? 'nav-link mobile active' : 'nav-link mobile'
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}

                {/* "Order Now" — only shown in mobile dropdown */}
                <NavLink
                  to="/menu"
                  onClick={() => setOpen(false)}
                  className="btn primary mobile-order"
                >
                  Order Now
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  )
}

/* Cart Button */
function CartButton() {
  const { items, openCart } = useCart()
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <button
      className="btn small ghost transparent cart-btn"
      onClick={() => openCart()}
      aria-label="Open cart"
    >
      Cart{count > 0 ? ` (${count})` : ''}
    </button>
  )
}
