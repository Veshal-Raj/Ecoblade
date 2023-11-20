import React from 'react'
import { GoPaperclip } from 'react-icons/go';
import Vector from "../../assets/vector.png"

const Input = () => {
  return (
    <div className='flex items-center justify-between -mt-6'>
      <div className=' w-[100%]'>
        <input
          className="relative bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-3xl shadow-md outline-none  block w-[calc(100%-20px)] p-3 placeholder:text-sm "
          type="text"
          id="first_name"
          placeholder="Type a message"
          required />
      </div>

      <div className='rounded-full w-11 h-10 bg-[#4AB500] flex items-center justify-center'>
         <img className='w-4 ' src={Vector} alt="" />
      </div>
    </div>
  )
}

export default Input