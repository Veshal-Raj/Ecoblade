import React from 'react'
import { FiChevronDown } from 'react-icons/fi'
import Chart from './Chart'
import AppoinmentHome from '../Appointments/AppoinmentHome'

const ReportChart = () => {
    return (
        <>
        <h1 className='text-2xl font-semibold  xl:hidden pb-6 '>Report</h1>
        <div className=' relative   w-full fle  justify-betwee items-center  overflow-y-scroll h-[calc(100%-1px)] no-scrollbar '>
            <div className='flex flex-col w-full '>
                 <p className='font-semibold text-[#505051]'>Time Period</p>
                <div className='flex md:justify-start justify-between items-center w-full md:gap-6 gap-3 sm:flex-row flex-col'>
                    <div className='flex flex-col md:w-[400px] w-full'>
                    
                        <input
                            className='py-3 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 '
                            type="text"
                            placeholder='Startiing Date'
                        />
                    </div>

                    <p className='flex md:items-center  '>To</p>

                    <div className='flex flex-col md:w-[400px] w-full'>
                        <input
                            className='py-3 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 '
                            type="text"
                            placeholder='End Date'
                        />
                    </div>
                </div>
            </div>

            {/* Chart component */}

            <div>
                <Chart />
            </div>
            <div className='pt-14'>
                <AppoinmentHome />
            </div>


        </div>
        </>
        
    )
}

export default ReportChart