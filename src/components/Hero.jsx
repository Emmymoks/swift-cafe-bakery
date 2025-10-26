import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="hero fade-in">
      <div className="container hero-grid">
        <div className="hero-content">
          <motion.h2
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to Swift Cafe & Bakery
          </motion.h2>
          <p className="hero-sub">
            A luxury experience. Artisanal pastries, specialty coffees, and swift service.
          </p>
          <div className="hero-cta">
            <a className="btn" href="/menu">Explore Menu</a>
            <a className="btn ghost" href="/about">Our Story</a>
          </div>
        </div>
        <div className="hero-visual">
          <motion.img
            src="https://i.pinimg.com/1200x/50/7b/b4/507bb4352c6cb87ae99ecc83698c80c2.jpg"
            alt="Cafe ambiance"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </section>
  )
}
