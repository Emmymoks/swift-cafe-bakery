import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function CartDrawer({ open, onClose }) {
  const { items, updateItem, removeItem, clearCart, getSubtotal } = useCart()
  const navigate = useNavigate()

  const subtotal = getSubtotal()
  const tax = +(subtotal * 0.085).toFixed(2)
  const total = +(subtotal + tax).toFixed(2)

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          className="cart-drawer"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          aria-modal="true"
          role="dialog"
        >
          <div className="cart-header">
            <h4>Your order</h4>
            <button className="btn small ghost transparent" onClick={onClose} aria-label="Close cart">Close</button>
          </div>

          <div className="cart-body">
            {items.length === 0 && <p className="muted">Your cart is empty.</p>}
            {items.map(it => (
              <div key={it.id} className="cart-line">
                <div className="cart-line-left">
                  <img src={it.image} alt={it.name} />
                </div>
                <div className="cart-line-right">
                  <div className="cart-line-title">{it.name}</div>
                  <div className="cart-line-meta">
                    <input
                      aria-label={`Quantity for ${it.name}`}
                      type="number"
                      min="1"
                      value={it.qty}
                      onChange={(e) => updateItem(it.id, Math.max(1, parseInt(e.target.value || '1')))}
                    />
                    <div className="cart-line-price">${(it.price * it.qty).toFixed(2)}</div>
                    <button className="btn ghost small" onClick={() => removeItem(it.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <div className="cart-summary">
              <div>Subtotal</div>
              <div>${subtotal.toFixed(2)}</div>
            </div>
            <div className="cart-summary">
              <div>Tax</div>
              <div>${tax.toFixed(2)}</div>
            </div>
            <div className="cart-total">
              <div>Total</div>
              <div>${total.toFixed(2)}</div>
            </div>

            <div className="cart-actions">
              <button className="btn primary" onClick={() => { onClose(); navigate('/checkout') }}>
                Checkout
              </button>
              <button className="btn ghost" onClick={() => clearCart()}>Clear</button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
