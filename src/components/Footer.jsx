import React from 'react'

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <h3>Swift Cafe and Bakery</h3>
          <p>Luxury baked goods & specialty coffee</p>
        </div>
        <div>
          <p>© {new Date().getFullYear()} Swift Cafe and Bakery</p>
        </div>
      </div>
    </footer>
  )
}
