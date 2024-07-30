import React from 'react';

const History = () => {
  
  return (
    <>
    <div className='flex items-center justify-center '>
          <div className='rounded-3xl border-2 h-[270px] bg-white w-[620px] pl-3'>
            <div className='flex justify-between p-4'>
              <p className='text-3xl font-bold pt-6'>History</p>

              <div className='flex items-center justify-end mr-3 h-[180px] overflow-y-scroll rounded-3xl  mt-14'>
                  <div className='bg-gray-300 w-[500px] h-auto rounded-3xl object-contain'>
                            <div className='m-10 pt-8'>
                            <div className="flex justify-between items-center">
                            <div className="font-bold">Food</div>
                            <div className="text-right">₹ 200</div>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">20 March 2024</div>
                            <hr className="my-2" />
                            <div className="flex justify-between items-center">
                            <div className="font-bold">Movie</div>
                            <div className="text-right">₹ 200</div>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">20 March 2024</div>
                            <hr className="my-2" />
                            <div className="flex justify-between items-center">
                            <div className="font-bold">Travelling</div>
                            <div className="text-right">₹ 200</div>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">20 March 2024</div>
                        </div>
                     </div>
                  </div>
            </div>
            
            
            </div>                
          </div>

    </>
  );
};

export default History;