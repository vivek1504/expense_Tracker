import React from 'react';
import bgContainer from '../assets/bgContainer.png'; 
import LoginImage from '../assets/LoginImage.png';
import upArrow from '../assets/upArrow.png';
import SignUpPage from '../Pages/SignUpPage';
function HeroSection() {
  return (
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
          <SignUpPage />
        </div>
        
      </div>
    </div>
  );
}

export default HeroSection;
