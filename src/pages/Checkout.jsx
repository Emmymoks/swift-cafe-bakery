import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Checkout() {
  const { items, getSubtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', address: '' })

  const subtotal = getSubtotal()
  const tax = +(subtotal * 0.085).toFixed(2)
  const total = +(subtotal + tax).toFixed(2)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handlePlaceOrder(e) {
    e.preventDefault()
    setLoading(true)
    // fake network delay
    await new Promise((r) => setTimeout(r, 800))
    // In a real app we'd submit to a backend here
    clearCart()
    setLoading(false)
    navigate('/')
    // could show toast; we'll keep simple
  }

  return (
    <div className="container">
      <motion.div className="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h2>Checkout</h2>
        <form onSubmit={handlePlaceOrder} className="checkout-form">
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Address
            <textarea name="address" value={form.address} onChange={handleChange} required />
          </label>

          <div className="checkout-summary">
            <div>Subtotal: ${subtotal.toFixed(2)}</div>
            <div>Tax: ${tax.toFixed(2)}</div>
            <div><strong>Total: ${total.toFixed(2)}</strong></div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn primary" type="submit" disabled={loading || items.length === 0}>
              {loading ? 'Placing...' : 'Place order'}
            </button>
            <button className="btn ghost" type="button" onClick={() => navigate(-1)}>Back</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
