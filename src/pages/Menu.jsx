import React from 'react'
import ItemCard from '../components/ItemCard'
import items from '../data/items'

export default function Menu(){
  return (
    <section className="menu container fade-in">
      <header className="menu-header">
        <h2>Our Menu</h2>
        <p>Explore our range of coffees, pastries, breads and gourmet treats.</p>
      </header>
      <div className="grid items-grid">
        {items.map(it => <ItemCard key={it.id} item={it} />)}
      </div>
    </section>
  )
}
