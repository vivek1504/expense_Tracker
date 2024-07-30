import React, { useState } from 'react';
import Container1 from '../assets/container1.png';


const SplitOptions = () => {
  const [activeTab, setActiveTab] = useState('Equal');
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>

<div className="bg-transparent flex  items-center justify-center  ">
        <div className="relative w-[60%] h-full m-10">
          <img src={Container1} alt="Background" className=" rounded-2xl h-[670px] w-[800px] mb-10 " />
          <div className="absolute bottom-20 right-16 ">
          <form>
            <div className="bg-transparent rounded-md p-4 w-[400px]">

        <div className="flex justify-center rounded-full h-[80px] w-[400px] px-2 items-center mb-6 bg-white">
        {['Equal', 'Exact', 'Percentage'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`flex-1 text-center text-2xl py-2 rounded-full h-[60px] bg-white ${
              activeTab === tab
                ? 'bg-yellow-400 text-white'
                : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 h-[300px] rounded-3xl shadow-md">
        {activeTab === 'Equal' && (
          <div>
            {['User 1', 'User 2', 'User 3'].map((user, index) => (
              <div key={index} className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={`https://i.pravatar.cc/40?img=${index + 1}`}
                    alt={user}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 mx-4 border-gray-500 border-2 rounded-full flex items-center bg-gray-300">
                  <span className="text-gray-500 text-4xl pl-8">₹</span>
                  <input
                    type="text"
                    className="border-none h-[60px] pl-8 rounded-full text-2xl w-full focus:outline-none ml-2"
                    value="100.00"
                    readOnly
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button className="bg-yellow-400 text-3xl text-white py-2 px-8 rounded-3xl w-[180px] h-[60px]">Split</button>
          </div>
       </div>
     </form>
    </div>
  </div>
</div>
    </>
  );
};

export default SplitOptions;
