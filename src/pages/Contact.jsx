import React from 'react'

export default function Contact(){
  return (
    <section className="contact container fade-in">
      <h2>Contact & Visit</h2>
      <p>Visit our flagship store for an elevated cafe experience.</p>
      <div className="contact-grid">
        <div className="card">
          <h4>Location</h4>
          <p>123 Swift Lane, City Center</p>
        </div>
        <div className="card">
          <h4>Hours</h4>
          <p>Mon–Sun: 7:00 AM – 9:00 PM</p>
        </div>
        <div className="card">
          <h4>Reach Us</h4>
          <p>Email: hello@swiftcafe.example<br/>Phone: +1 (555) 123-4567</p>
        </div>
      </div>
    </section>
  )
}
