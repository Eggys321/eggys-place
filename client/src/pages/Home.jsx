import React from 'react'
import Hero from '../features/home/Hero'
import Menu from '../features/home/Menu'
import UseTitle from '../Hooks/UseTitle'

const Home = () => {
  UseTitle("Welcome to Eggys place")
  return (
    <>
    <main>
      <Hero/>
      <Menu/>
    </main>
    </>
  )

}

export default Home