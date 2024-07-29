import React from 'react'

function SignUpPage() {
  return (
    <>
        <div className="w-[370px] absolute right-40 top-20 ">
          <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>
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

    </>
  )
}

export default SignUpPage