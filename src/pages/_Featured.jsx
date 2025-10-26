import React from 'react'
import ItemCard from '../components/ItemCard'
import items from '../data/items'

export default function Featured(){
  const featured = items.slice(0,4)
  return (
    <section className="featured container fade-in">
      <h3>Chef's Selections</h3>
      <p className="sub">Handpicked luxury items you must try.</p>
      <div className="grid items-grid">
        {featured.map(it => <ItemCard key={it.id} item={it} />)}
      </div>
    </section>
  )
}
