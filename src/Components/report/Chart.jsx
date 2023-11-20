import React from 'react'
import pending_icon from "../../assets/report/pending_icon.svg"
import order_icon from "../../assets/report/order_icon.svg"
import support_icon from "../../assets/report/support_icon.svg"
import customers_icon from "../../assets/report/customers_icon.svg"
import dashboard_graph from "../../assets/report/dashboard_graph.png"
import Chart_graph from "../../assets/report/Chart_graph.svg"

const Chart = () => {
    return (
        <div className='pt-7 '>
            <div className='flex xxl:flex-row flex-col xxl:gap-0 gap-7 '>
                <div className='flex flex-col gap-7 w-full'>
                    <div className='flex gap-7 w-full'>
                        <div className='xl:w-56 w-full h-[166px] rounded-lg border-2 p-5'>
                            <div className='flex justify-between items-center'>
                                <h4 className='text-sm font-semibold text-[#545454]'>New
                                    <p> Customers</p> </h4>

                                <div className='w-12 h-12 bg-[#fdf6e2] rounded-full flex justify-center items-center'>
                                    <img className='w-4.5' src={pending_icon} alt="" />
                                </div>
                            </div>
                            <p className='text-[22px] pt-1 text-black font-semibold'>52</p>
                        </div>

                        <div className='xl:w-56 w-full h-[166px] rounded-lg border-2 p-5'>
                            <div className='flex justify-between items-center'>
                                <h4 className='text-sm font-semibold text-[#545454]'>New
                                    <p> Appointments</p> </h4>

                                <div className='w-12 h-12 bg-[#fef5ed] rounded-full flex justify-center items-center'>
                                    <img className='w-4.5' src={order_icon} alt="" />
                                </div>
                            </div>
                            <p className='text-[22px] pt-1 text-black font-semibold'>778</p>
                        </div>
                    </div>
                    <div className='flex gap-7 w-full'>
                        <div className='xl:w-56 w-full h-[166px] rounded-lg border-2 p-5'>
                            <div className='flex justify-between items-center'>
                                <h4 className='text-sm font-semibold text-[#545454]'>Net Sales</h4>

                                <div className='w-12 h-12 bg-[#f5edfc] rounded-full flex justify-center items-center'>
                                    <img className='w-4.5' src={support_icon} alt="" />
                                </div>
                            </div>
                            <p className='text-[22px] pt-1 text-black font-semibold'>2,125</p>
                        </div>
                        <div className='xl:w-56 w-full h-[166px] rounded-lg border-2 p-5'>
                            <div className='flex justify-between items-center'>
                                <h4 className='text-sm font-semibold text-[#545454]'>Refunds</h4>

                                <div className='w-12 h-12 bg-[#fdf6e2] rounded-full flex justify-center items-center'>
                                    <img className='w-4.5' src={customers_icon} alt="" />
                                </div>
                            </div>
                            <p className='text-[22px] pt-1 text-black font-semibold'>102</p>
                        </div>
                    </div>
                    <div className='flex gap-7 w-full'>
                        <div className='xl:w-56 w-full h-[166px] rounded-lg border-2 p-5'>
                            <div className='flex justify-between items-center'>
                                <h4 className='text-sm font-semibold text-[#545454]'>Service  <p> Cancellations</p> </h4>

                                <div className='w-12 h-12 bg-[#f5edfc] rounded-full flex justify-center items-center'>
                                    <img className='w-4.5' src={support_icon} alt="" />
                                </div>
                            </div>
                            <p className='text-[22px] pt-1 text-black font-semibold'>2,125</p>
                        </div>
                        <div className='xl:w-56 w-full h-[166px] rounded-lg border-2 p-5'>
                            <div className='flex justify-between items-center'>
                                <h4 className='text-sm font-semibold text-[#545454]'>Completed <p>Services</p></h4>

                                <div className='w-12 h-12 bg-[#fce4e4] rounded-full flex justify-center items-center'>
                                    <img className='w-4.5' src={customers_icon} alt="" />
                                </div>
                            </div>
                            <p className='text-[22px] pt-1 text-black font-semibold'>102</p>
                        </div>
                    </div>
                </div>



                <div className='flex sm:flex-row flex-col gap-7 w-full p-5'>
                    <div className='rounded-lg border-2 2xl:w-[327px] w-full h-72 p-5 overflow-hidden'>
                        <div className='flex flex-col justify-between items-center overflow-hidden'>
                            <h4 className='text-base font-semibold text-[#000000]'>New Customers</h4>
                            <img className='w-4.5 pt-14' src={dashboard_graph} alt="" />
                        </div>
                    </div>
                    <div className='rounded-lg border-2 2xl:w-[327px] w-full h-72 p-5  overflow-hidden'>
                        <div className='flex flex-col justify-between items-center'>
                            <h4 className='text-base font-semibold text-[#000000]'>User Segmentation</h4>
                            <img className='w-4.5 pt-5' src={Chart_graph} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chart