import React from 'react'
import Navbar from './Navbar'
import container from '../assets/container.png'
import ExpenseCard from './ExpenseCard'

function HeroSection() {
  return (
    <>
       <Navbar/>

       <div className='flex items-center justify-center h-screen'>
        <div className=' m-14 p-36'>
          <div className='absolute  left-12'>
          <ExpenseCard />
          </div>
          <img src={container} alt="" />
        </div>
       </div>
    </>
  )
}

export default HeroSection
