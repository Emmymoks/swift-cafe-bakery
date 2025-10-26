import React from 'react'
import Hero from '../components/Hero'
import Featured from './_Featured'
import ReviewsCarousel from '../components/ReviewsCarousel'

export default function Home(){
  return (
    <div>
      <Hero />
      <Featured />
      <ReviewsCarousel />
    </div>
  )
}
