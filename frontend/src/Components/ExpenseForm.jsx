import React from 'react';
import Container1 from '../assets/container1.png'

const ExpenseForm = () => {
  
 return (
    <>
      <div className="bg-transparent flex  items-center justify-center  ">
        <div className="relative w-[60%] h-full m-10">
          <img src={Container1} alt="Background" className=" rounded-2xl h-[670px] w-[800px] mb-10 " />
          <div className="absolute bottom-20 right-14 ">
          <form>
            <div className="bg-transparent rounded-md p-4 w-[420px]">

            <div className="mb-2">
                <label for="amount" className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
                <input type="number" id="amount" className="shadow appearance-none border rounded-2xl h-[50px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>    

            <div className="mb-2">
                <label for="date" className="block text-gray-700 text-sm font-bold pr-6 mb-2">Date</label>
                <input type="date" id="date" className="shadow appearance-none border rounded-2xl h-[50px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div className="mb-2">
                <label for="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input type="text" id="title" className="shadow appearance-none border rounded-2xl h-[50px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div className="mb-2">
                <label for="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea id="description" className="shadow appearance-none border rounded-2xl  w-full h-[120px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>

            <div className="flex justify-center">
                <button class=" text-gray font-bold py-2 w-4 rounded focus:outline-none focus:shadow-outline" type="button">-</button>
                <button class=" text-gray font-bold py-2 rounded focus:outline-none focus:shadow-outline" type="button">-</button>
                </div>
            <div className="flex space-x-4 items-center justify-center">
                <button className="bg-white rounded-2xl hover:bg-gray-400 text-lg border-yellow-400 h-[50px] w-[150px] border-4 text-yellow-400 font-bold py-2 px-4 focus:outline-none focus:shadow-outline" type="button">Split</button>
                <button className="bg-yellow-400  hover:bg-yellow-500 text-lg text-white font-bold py-2 px-4 h-[50px] w-[150px] rounded-2xl focus:outline-none focus:shadow-outline" type="button">Add Expense</button>
                </div>
            </div>
                </form>
          </div>
          
          </div>
        </div>
    
    </>
  );
};

export default ExpenseForm;