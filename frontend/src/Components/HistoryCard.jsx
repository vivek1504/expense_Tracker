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
                            <div className='m-10'/>
                            <HistoryComps name='Shopping' amount='200' date='12/12/2021'/>
                            <HistoryComps name='Shopping' amount='200' date='12/12/2021'/>
                            <HistoryComps name='Shopping' amount='200' date='12/12/2021'/>
         
                     </div>
                  </div>
            </div>
            
            
            </div>                
          </div>

    </>
  );
};

const HistoryComps = ({name,amount, date})=>{
  return <div>
      <div className='mx-10'>
          <div className="flex justify-between items-center">
          <div className="font-bold mb-1">{name}</div>
          <div className="text-right font-semibold">₹ {amount}</div>
      </div>
          <div className="text-sm text-gray-500 mt-1">{date}</div>
        </div>
        <hr className='my-2'></hr>
  </div>
}

export default History;