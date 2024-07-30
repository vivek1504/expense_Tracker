import bgContainer from '../assets/bgContainer.png';
import LoginImage from '../assets/LoginImage.png';
import upArrow from '../assets/upArrow.png';

import React, { useState } from 'react'

function SignUpPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSignUp = (e) => {
    e.preventDefault()
    if (!username || !email || !phone || !password || !confirmPassword) {
      alert("All fields are mandatory")
      return
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        phone,
        password,
        confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error)
        } else {
          alert("Sign Up Successful")
        }
      })
  }
  return (
    <>

<div className="flex items-center justify-center top-0 p-20 h-screen object-cover">
      <div className="bg-white rounded-lg flex overflow-hidden items-center justify-center ">
        <div className="relative w-[75%] h-full m-10">
          <img src={bgContainer} alt="Background" className="object-cover w-full h-full" />
          <div className="absolute inset-0 flex  justify-left overflow-hidden">
            <img src={LoginImage} alt="Login" className=" w-[480px] h-full" />
          </div>
          <div className='absolute bottom-2 right-0'>
            <img src={upArrow} alt=""  className='h-[90px] w-[90px]'/>
          </div>

        <div className="w-[370px] absolute right-[100px] top-20 ">
          <h2 className="text-5xl font-bold text-center mb-8">Sign Up</h2>
          <form>
              <input  
                type="text"
                placeholder="User Name"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
              />
              <input 
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-5 p-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
              />
              <input 
                type="text"
                placeholder="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border mt-5 border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
              />
              <input 
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border mt-5 border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
              />
              <input 
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border mt-5 border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500"
              />
            <div className='flex items-center justify-center'>
                <button onClick={handleSignUp} className=" w-[250px] p-3 mt-5 text-white bg-yellow-500 rounded-2xl hover:bg-yellow-600 focus:outline-none">
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