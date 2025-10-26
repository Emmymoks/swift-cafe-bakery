import React from 'react'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { evaluate } from 'mathjs'
import { useCart } from '../context/CartContext'

export default function ItemCard({ item }) {
  const priceWithTax = useMemo(() => {
    return evaluate(`${item.price} * 1.085`).toFixed(2)
  }, [item.price])

  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(item, 1)
  }

  return (
    <motion.article
      className="item-card"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <img src={item.image} alt={item.name} />
      <div className="item-body">
        <h4>{item.name}</h4>
        <p className="desc">{item.description}</p>
        <div className="meta">
          <span className="price">${item.price.toFixed(2)}</span>
          <span className="tax">inc. tax: ${priceWithTax}</span>
        </div>
        <button className="btn small ghost transparent" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </motion.article>
  )
}
