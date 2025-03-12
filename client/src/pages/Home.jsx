import React from 'react'
import Hero from '../features/home/Hero'
import Menu from '../features/home/Menu'

const Home = ({handleAddToCart}) => {
  return (
    <>
    <main>
      <Hero/>
      <Menu handleAddToCart={handleAddToCart}/>
    </main>
    </>
  )
  
}

export default Home