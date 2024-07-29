import React from 'react'
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import userImg from '../assets/userImg.png';

function HeroSection() {
  return (
    <>
       <div>
       <nav className="bg-white text-green-800 border-gray-200 px-4  lg:px-6 py-2.5 h-28">
                    <motion.div className=" flex flex-wrap justify-between"
                        initial={{y:-100}}
                        animate={{y: -10}}
                        transition={{delay:0.2 , type: 'spring' , stiffness:120}}
                    >
                        <div>
                          <img
                          initial={{y:-100}}
                          animate={{y: 0}}
                          transition={{delay:0.2 , type: 'spring' , stiffness:120}}
                              src={logo}
                              className="mr-3 h-20 rounded-full"
                              alt="Logo"
                          />
                          <span className='p-4 pt-8  text-2xl font-bold'>Brain Flow</span>
                        </div>
                      
                        <img src={userImg} alt="" className='h-16  pr-4'/>

                    </motion.div>

                    
                  
            </nav>
       </div>
    </>
  )
}

export default HeroSection
