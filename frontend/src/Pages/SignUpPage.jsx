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
    fetch("http://localhost:8000/api/users/signup/", {
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
        <div className="w-[370px] absolute right-40 top-20 ">
          <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>
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

    </>
  )
}

export default SignUpPage