import React from 'react'
import arrow from '../assets/arrow.png';
import arrow1 from '../assets/arrow1.png';
import arrow2 from '../assets/arrow2.png';




function ExpenseCard() {
  return (
    <>
     
    <div className='flex items-center justify-center w-[60px] '>
          <div className='rounded-2xl bg-gray-200 h-[160px] w-[200px] pl-3'>
            <div className='flex justify-between items-center p-2'>
              <p className='text-xl font-semibold '>Total Expenses</p>
              <img className='flex items-end z-50 justify-end h-[40px] w-[40px]' src={arrow} alt="" />
            </div>
            
            <div className='flex items-center justify-center m-4'>
                  <div className='bg-white w-[220px] h-[80px] rounded-2xl'>
                        <p className='flex pt-5 justify-center text-4xl font-bold'>₹ 200.00</p>
                  </div>
            </div>
                
          </div>

          <div className='rounded-2xl bg-gray-200 h-[160px] w-[200px] pl-3 ml-4 mr-4'>
            <div className='flex justify-between items-center p-2'>
              <p className='text-xl font-semibold '>Total Balance</p>
              <img className='flex items-end z-50 justify-end h-[40px] w-[40px]' src={arrow1} alt="" />
            </div>
            
            <div className='flex items-center justify-center m-4'>
                  <div className='bg-white w-[220px] h-[80px] rounded-2xl'>
                        <p className='flex pt-5 justify-center text-4xl font-bold'>₹ 200.00</p>
                  </div>
            </div>
                
          </div>

          <div className='rounded-2xl bg-gray-200 h-[160px] w-[200px] pl-3'>
            <div className='flex justify-between items-center p-2'>
              <p className='text-xl font-semibold '>Pending</p>
              <img className='flex items-end z-50 justify-end h-[40px] w-[40px]' src={arrow2} alt="" />
            </div>
            
            <div className='flex items-center justify-center m-4'>
                  <div className='bg-white w-[220px] h-[80px] rounded-2xl'>
                        <p className='flex pt-5 justify-center text-4xl font-bold'>₹ 200.00</p>
                  </div>
            </div>
                
          </div>



          
                
        </div>

    </>
  )
}

export default ExpenseCard