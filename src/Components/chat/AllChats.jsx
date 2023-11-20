import React, { useContext } from 'react'
import { MessageContext } from '../../context/MessageContext'

const AllChats = () => {
  const {showChat, setShowChat} = useContext(MessageContext)
  
  const handleChat = () => {
    setShowChat(true)
    console.log("hbhbhjbjb");
  }

  console.log("showchat,", showChat);

  return (
    <div className='overflow-y-scroll  h-[calc(100%-7rem)] no-scrollbar scroll-smoot'>
      <div className='flex flex-col md:gap-6 gap-2   overflow-y-scroll no-scrollbar pb-1'>
        <div className='  cursor-pointer bg-gradient-to-b lg:py-3 py-3 px-5 shado  bg-[#F3FFEB] transition transform hover:-translate-y-1 '
        >
          <div className='flex justify-between  ' onClick={handleChat}>
            <div className='flex gap-3 justify-center items-center'>
              <img className='rounded-full lg:w-[50px] lg:h-[50px] md:w-10 md:h-10 h-12 w-12 object-cover'
                src="https://images.pexels.com/photos/2586823/pexels-photo-2586823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="" />
              <div className='flex flex-col gap-1  '>
                <h3 className='text-base font-semibold'>
                  Zilan
                </h3>
                <p className='text-[13px] text-[#8A8A8A] font-medium text-ellipsis whitespace-nowrap  font-poppins   overflow-hidden xl:w-28 md:w-10 w-16'>
                  How are you
                </p>
              </div>
            </div>
            <div className=' pt-2'>
              <p className=' text-xs font-medium text-[#8A8A8A]'>
                10:30 PM
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className='flex flex-col md:gap-6 gap-2   overflow-y-scroll no-scrollbar'>
        <div className='  cursor-pointer bg-gradient-to-b lg:py-3 py-3 px-5 shado  hover:bg-[#F3FFEB] transition transform hover:-translate-y-1 '>
          <div className='flex justify-between  '>
            <div className='flex gap-3 justify-center items-center'>
              <img className='rounded-full lg:w-[50px] lg:h-[50px] md:w-10 md:h-10 h-12 w-12 object-cover'
                src="https://images.pexels.com/photos/2586823/pexels-photo-2586823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="" />
              <div className='flex flex-col gap-1  '>
                <h3 className='text-base font-semibold'>
                  Zilan
                </h3>
                <p className='text-[13px] text-[#8A8A8A] font-medium text-ellipsis whitespace-nowrap  font-poppins   overflow-hidden xl:w-28 md:w-10 w-16'>
                  How are you
                </p>
              </div>
            </div>
            <div className=' pt-2'>
              <p className=' text-xs font-medium text-[#8A8A8A]'>
                10:30 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:gap-6 gap-2   overflow-y-scroll no-scrollbar'>
        <div className='  cursor-pointer bg-gradient-to-b lg:py-3 py-3 px-5 shado  hover:bg-[#F3FFEB] transition transform hover:-translate-y-1 '>
          <div className='flex justify-between  '>
            <div className='flex gap-3 justify-center items-center'>
              <img className='rounded-full lg:w-[50px] lg:h-[50px] md:w-10 md:h-10 h-12 w-12 object-cover'
                src="https://images.pexels.com/photos/2586823/pexels-photo-2586823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="" />
              <div className='flex flex-col gap-1  '>
                <h3 className='text-base font-semibold'>
                  Zilan
                </h3>
                <p className='text-[13px] text-[#8A8A8A] font-medium text-ellipsis whitespace-nowrap  font-poppins   overflow-hidden xl:w-28 md:w-10 w-16'>
                  How are you
                </p>
              </div>
            </div>
            <div className=' pt-2'>
              <p className=' text-xs font-medium text-[#8A8A8A]'>
                10:30 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:gap-6 gap-2   overflow-y-scroll no-scrollbar'>
        <div className='  cursor-pointer bg-gradient-to-b lg:py-3 py-3 px-5 shado  hover:bg-[#F3FFEB] transition transform hover:-translate-y-1 '>
          <div className='flex justify-between  '>
            <div className='flex gap-3 justify-center items-center'>
              <img className='rounded-full lg:w-[50px] lg:h-[50px] md:w-10 md:h-10 h-12 w-12 object-cover'
                src="https://images.pexels.com/photos/2586823/pexels-photo-2586823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="" />
              <div className='flex flex-col gap-1  '>
                <h3 className='text-base font-semibold'>
                  Zilan
                </h3>
                <p className='text-[13px] text-[#8A8A8A] font-medium text-ellipsis whitespace-nowrap  font-poppins   overflow-hidden xl:w-28 md:w-10 w-16'>
                  How are you
                </p>
              </div>
            </div>
            <div className=' pt-2'>
              <p className=' text-xs font-medium text-[#8A8A8A]'>
                10:30 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:gap-6 gap-2   overflow-y-scroll no-scrollbar'>
        <div className='  cursor-pointer bg-gradient-to-b lg:py-3 py-3 px-5 shado  hover:bg-[#F3FFEB] transition transform hover:-translate-y-1 '>
          <div className='flex justify-between  '>
            <div className='flex gap-3 justify-center items-center'>
              <img className='rounded-full lg:w-[50px] lg:h-[50px] md:w-10 md:h-10 h-12 w-12 object-cover'
                src="https://images.pexels.com/photos/2586823/pexels-photo-2586823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="" />
              <div className='flex flex-col gap-1  '>
                <h3 className='text-base font-semibold'>
                  Zilan
                </h3>
                <p className='text-[13px] text-[#8A8A8A] font-medium text-ellipsis whitespace-nowrap  font-poppins   overflow-hidden xl:w-28 md:w-10 w-16'>
                  How are you
                </p>
              </div>
            </div>
            <div className=' pt-2'>
              <p className=' text-xs font-medium text-[#8A8A8A]'>
                10:30 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:gap-6 gap-2   overflow-y-scroll no-scrollbar'>
        <div className='  cursor-pointer bg-gradient-to-b lg:py-3 py-3 px-5 shado  hover:bg-[#F3FFEB] transition transform hover:-translate-y-1 '>
          <div className='flex justify-between  '>
            <div className='flex gap-3 justify-center items-center'>
              <img className='rounded-full lg:w-[50px] lg:h-[50px] md:w-10 md:h-10 h-12 w-12 object-cover'
                src="https://images.pexels.com/photos/2586823/pexels-photo-2586823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="" />
              <div className='flex flex-col gap-1  '>
                <h3 className='text-base font-semibold'>
                  Zilan
                </h3>
                <p className='text-[13px] text-[#8A8A8A] font-medium text-ellipsis whitespace-nowrap  font-poppins   overflow-hidden xl:w-28 md:w-10 w-16'>
                  How are you
                </p>
              </div>
            </div>
            <div className=' pt-2'>
              <p className=' text-xs font-medium text-[#8A8A8A]'>
                10:30 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:gap-6 gap-2   overflow-y-scroll no-scrollbar'>
        <div className='  cursor-pointer bg-gradient-to-b lg:py-3 py-3 px-5 shado  hover:bg-[#F3FFEB] transition transform hover:-translate-y-1 '>
          <div className='flex justify-between  '>
            <div className='flex gap-3 justify-center items-center'>
              <img className='rounded-full lg:w-[50px] lg:h-[50px] md:w-10 md:h-10 h-12 w-12 object-cover'
                src="https://images.pexels.com/photos/2586823/pexels-photo-2586823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="" />
              <div className='flex flex-col gap-1  '>
                <h3 className='text-base font-semibold'>
                  Zilan
                </h3>
                <p className='text-[13px] text-[#8A8A8A] font-medium text-ellipsis whitespace-nowrap  font-poppins   overflow-hidden xl:w-28 md:w-10 w-16'>
                  How are you
                </p>
              </div>
            </div>
            <div className=' pt-2'>
              <p className=' text-xs font-medium text-[#8A8A8A]'>
                10:30 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:gap-6 gap-2   overflow-y-scroll no-scrollbar'>
        <div className='  cursor-pointer bg-gradient-to-b lg:py-3 py-3 px-5 shado  hover:bg-[#F3FFEB] transition transform hover:-translate-y-1 '>
          <div className='flex justify-between  '>
            <div className='flex gap-3 justify-center items-center'>
              <img className='rounded-full lg:w-[50px] lg:h-[50px] md:w-10 md:h-10 h-12 w-12 object-cover'
                src="https://images.pexels.com/photos/2586823/pexels-photo-2586823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="" />
              <div className='flex flex-col gap-1  '>
                <h3 className='text-base font-semibold'>
                  Zilan
                </h3>
                <p className='text-[13px] text-[#8A8A8A] font-medium text-ellipsis whitespace-nowrap  font-poppins   overflow-hidden xl:w-28 md:w-10 w-16'>
                  How are you
                </p>
              </div>
            </div>
            <div className=' pt-2'>
              <p className=' text-xs font-medium text-[#8A8A8A]'>
                10:30 PM
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AllChats