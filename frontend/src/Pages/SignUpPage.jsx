import React from 'react'
import bgContainer from '../assets/bgContainer.png';
import LoginImage from '../assets/LoginImage.png';
import upArrow from '../assets/upArrow.png';


function SignUpPage() {
  return (
    <>

<div className="flex items-center justify-center top-0 p-52 h-screen object-cover">
      <div className="bg-white rounded-lg flex overflow-hidden items-center justify-center ">
        <div className="relative w-[75%] h-full m-10">
          <img src={bgContainer} alt="Background" className="object-cover w-full h-full" />
          <div className="absolute inset-0 flex  justify-left">
            <img src={LoginImage} alt="Login" className=" w-[500px] h-full" />
          </div>
          <div className='absolute bottom-3 right-0'>
            <img src={upArrow} alt=""  className='h-[100px] w-[100px]'/>
          </div>

        <div className="w-[370px] absolute right-40 top-20 ">
          <h2 className="text-5xl font-bold text-center mb-8">Sign Up</h2>
          <form>
              <input  
                type="text"
                placeholder="User Name"
                className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
              />
              <input 
                type="email"
                placeholder="Email"
                className="w-full mt-5 p-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
              />
              <input 
                type="text"
                placeholder="Phone Number"
                className="w-full p-3 border mt-5 border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
              />
              <input 
                type="password"
                placeholder="Password"
                className="w-full p-3 border mt-5 border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
              />
              <input 
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 border mt-5 border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
              />
            <div className='flex items-center justify-center'>
                <button className=" w-[250px] p-3 mt-5 text-white bg-yellow-500 rounded-2xl hover:bg-yellow-600 focus:outline-none">
                Sign Up
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

    </>
  )
}

export default SignUpPage