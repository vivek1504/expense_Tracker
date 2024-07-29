import React from 'react'
import arrow from '../assets/arrow.png';
import arrow1 from '../assets/arrow1.png';
import arrow2 from '../assets/arrow2.png';




function ExpenseCard() {
  return (
    <>
     
    

    <div className='flex items-center justify-center '>
          <div className='rounded-2xl bg-gray-200 h-[200px] w-[300px] pl-3'>
            <div className='flex justify-between items-center p-2'>
              <p className='text-xl font-semibold '>Total Expenses</p>
              <img className='flex items-end z-50 justify-end h-[50px] w-[50px]' src={arrow} alt="" />
            </div>
            
            <div className='flex items-center justify-center  pb-2'>
                  <div className='bg-white w-[250px] h-[120px] rounded-2xl'>
                        <p className='flex pt-10 justify-center text-4xl font-bold'>₹ 200.00</p>
                  </div>
            </div>
                
          </div>

          <div className='rounded-2xl bg-gray-200 h-[200px] w-[300px] mr-4 ml-4'>
            <div className='flex justify-between items-center p-2'>
              <p className='text-xl font-semibold '>Total Expenses</p>
              <img className='flex items-end z-50 justify-end h-[50px] w-[50px]' src={arrow1} alt="" />
            </div>
            
            <div className='flex items-center justify-center  pb-2'>
                  <div className='bg-white w-[250px] h-[120px] rounded-2xl'>
                        <p className='flex pt-10 justify-center text-4xl font-bold'>₹ 200.00</p>
                  </div>
            </div>
                
          </div>

          <div className='rounded-2xl bg-gray-200 h-[200px] w-[300px]'>
            <div className='flex justify-between items-center p-2'>
              <p className='text-xl font-semibold '>Total Expenses</p>
              <img className='flex items-end z-50 justify-end h-[50px] w-[50px]' src={arrow2} alt="" />
            </div>
            
            <div className='flex items-center justify-center  pb-2'>
                  <div className='bg-white w-[250px] h-[120px] rounded-2xl'>
                        <p className='flex pt-10 justify-center text-4xl font-bold'>₹ 200.00</p>
                  </div>
            </div>
                
          </div>
        </div>

    </>
  )
}

export default ExpenseCard