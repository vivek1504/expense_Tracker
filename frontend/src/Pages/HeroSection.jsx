import React from 'react'
import Navbar from '../Components/Navbar'
import container from '../assets/container.png'
import ExpenseCard from '../Components/ExpenseCard'
import ExpenseForm from '../Components/ExpenseForm'
import HistoryCard from '../Components/HistoryCard'
import Download from '../assets/Download.png'
import title from '../assets/title.png'
import SplitOptions from '../Components/SplitOptionCard'
import add from '../assets/add.png'

function HeroSection() {
  return (
    <>
       <Navbar/>

       <div className='flex items-center justify-center h-screen'>
        <div className='relative mt-12 p-36'>
          <div className='absolute mt-3 left-[440px]'>
          <ExpenseCard />
          </div>
          <div className='absolute right-0 mt-0'>
            <SplitOptions />
            {/* <ExpenseForm  /> */}
          </div>
          <div className='absolute left-[150px] mt-[195px] pr-[100px]'>
            <HistoryCard />
          </div>
          <div className='absolute top-[593px] mt-[20px] left-[360px]'>
             <button ><img className='h-[70px] w-[280px] z-50' src={Download} alt="" /></button>
          </div>
          <div className='absolute top-[620px] mt-[20px] left-[145px]'>
             <img className='h-[40px] w-[200px] z-50' src={title} alt="" />
          </div>

          <div className='absolute right-[190px] top-[185px] overflow-hidden'>
            <button  className='flex px-2 w-[250px] rounded-full bg-white h-[65px]'>
            <img className='mb-4 h-[65px] w-[65px]' src={add} alt="" />
            <p className='text-2xl pt-4 text-gray-500 pl-2'>Add Friend</p>
            </button>
          </div>

          <div className='absolute pl-4  top-[700px] '>
          <div className="flex flex-col items-start font-sans ">
            <div className="text-7xl font-bold">Manage your</div>
            <div className="text-7xl font-bold pt-4">Daily All Expenses</div>
          </div>
          </div>

          <div className='absolute right-[510px] top-[200px] overflow-hidden'>
          <div class="flex -space-x-4 rtl:space-x-reverse">
              <img class="w-14 h-14 border-2 border-white rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy_JmafxKbli9Es5QUvL6d-qIdOd5RmExsvA&s" alt="" />
              <img class="w-14 h-14 border-2 border-white rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s" alt="" />
              <img class="w-14 h-14 border-2 border-white rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy_JmafxKbli9Es5QUvL6d-qIdOd5RmExsvA&s" alt="" />
              <img class="w-14 h-14 border-2 border-white rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s" alt="" />
          </div>
          </div>

          <div className='flex items-center justify-center'>
          <img className='w-[100%]' src={container} alt="" />
          </div>
          
        </div>
       </div>
    </>
  )
}

export default HeroSection
