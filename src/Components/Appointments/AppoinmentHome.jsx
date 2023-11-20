import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Appointments from '../Appointments'
import AppointmentsUpcoming from './AppointmentsUpcoming'
import AppointmentsCompleted from './AppointmentsCompleted'

// import Appointments from '../Components/Appointments'
// import AppointmentsUpcoming from '../Components/Appointments/AppointmentsUpcoming'
// import AppointmentsCompleted from '../Components/Appointments/AppointmentsCompleted'

const AppoinmentHome = () => {
  const [status, setStatus] = useState('pending')
  return (
    <>
    
     <div className=' w-full  rounded-md overflow-y-scroll'>
      <div className=' h-[60px]  border-b w-full flex items-center px-7 gap-11 shadow-sm bg-white rounded-tl-[10px] rounded-tr-[10px] '>
        <div onClick={() => setStatus("pending")} className='relative cursor-pointer '>
          <p className={`font-semibold ${status == "pending" ? 'text-[#4AB500] ' : 'text-[#828282]'} `}>Pending</p> {status == "pending" && <div className='absolute -bottom-4 w-[110%] rounded-tl rounded-tr -left-1  h-1 z-10 bg-[#4AB500]'> </div>} </div>
        <div onClick={() => setStatus("upcoming")} className='relative cursor-pointer'><p className={`font-semibold ${status == "upcoming" ? 'text-[#4AB500] ' : 'text-[#828282]'} `}>Upcoming</p> {status == "upcoming" && <div className='absolute -bottom-4 w-[110%] rounded-tl rounded-tr -left-1  h-1 z-10 bg-[#4AB500]'> </div>}</div>
        <div onClick={() => setStatus("completed")} className='relative cursor-pointer'><p className={`font-semibold ${status == "completed" ? 'text-[#4AB500] ' : 'text-[#828282]'} `}>Completed</p>{status == "completed" && <div className='absolute -bottom-4 w-[110%] rounded-tl rounded-tr -left-1  h-1 z-10 bg-[#4AB500]'> </div>} </div>
      </div>
      <div >
        {status == "pending" && <Appointments />}
        {status == "upcoming" && <AppointmentsUpcoming />}
        {status == "completed" && <AppointmentsCompleted />}
      </div>

    </div>
    
    </>
   
  )
}

export default AppoinmentHome