import React from 'react'
import { motion } from 'framer-motion'

export default function About(){
  return (
    <section className="about container fade-in">
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Our Story</motion.h2>
      <p className="lead">At Swift Cafe and Bakery we craft artisan pastries and curated coffees; With a luxury twist.</p>
      <div className="about-grid">
        <div>
          <h4>Craftsmanship</h4>
          <p>Our bakers use premium ingredients and time-tested techniques to produce flaky croissants, rich tarts and signature sourdoughs.</p>
        </div>
        <div>
          <h4>Philosophy</h4>
          <p>We believe in rapid, premium service. Beautiful presentation, excellent customer care, and an elevated cafe experience.</p>
        </div>
      </div>
    </section>
  )
}
