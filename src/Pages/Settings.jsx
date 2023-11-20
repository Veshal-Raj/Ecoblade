import React, { useState } from 'react'
import Wrapper from '../Components/Wrapper'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { motion } from 'framer-motion'
const Settings = () => {
    const [open, setOpen] = useState()
    return (
        <Wrapper title={"Settings"}>
            <div className='w-full h-full bg-white rounded-[10px]'>
                <div className=' min-h-[453px]   justify-around  p-3 px-8 flex flex-col '>
                    <div className=' flex flex-col lg:flex-row lg:justify-between '>
                        <div className=''>
                            <p className='text-[22px] font-semibold text-[#333333]'>Basic Details</p>
                            <p className='text-sm text-[#6B7280]'>view & manage your basic profile details for the admin account</p>
                        </div>

                    </div>
                    <div className='grid grid-cols-1  lg:grid-cols-12 gap-10'>
                        <div className='w-[197px] h-[197px] lg:col-span-2 bg-[#F5F5F5] rounded-[10px] relative'>
                            <label className='cursor-pointer block w-full h-full'>
                                <input type="file" className='hidden' />
                                {/* <span className='text-white text-center'>Custom Upload Button</span> */}
                                <div className=' w-[48px] h-[48px]  border bg-[#49B400] rounded-[10px] flex absolute bottom-0 right-0  items-center justify-center'>
                                    <span className=''><MdOutlineModeEditOutline size={20} className='text-white  ' /></span>
                                </div>
                            </label>
                            <p className='text-[#6B7280] text-xs font-semibold text-center mt-1'>Update Picture</p>
                        </div>
                        <div className=' lg:col-span-8  flex  gap-1 flex-col justify-around'>
                            <div className='flex gap-3 lg:flex-row flex-col'>
                                <div className='w-[45%] mb-2 ml-3'>
                                    <label htmlFor="" className='text-[#9CA3AF] text-xs ml-1  font-medium'>First  Name</label>
                                    <input type='text' className='w-full h-[54px] border     rounded-[10px] border-[#F5F5F5] bg-[#F6F6F6] focus:outline-none px-4 placeholder:text-xs ' placeholder='First  Name' />
                                </div>
                                <div className='w-[45%] mb-2'>
                                    <label htmlFor="" className='text-[#9CA3AF] text-xs ml-1   font-medium'>Last Name</label>
                                    <input type='text' className='w-full h-[54px] border  rounded-[10px] border-[#F5F5F5] bg-[#F6F6F6] focus:outline-none px-4 placeholder:text-xs ' placeholder='Last Name' />
                                </div>
                            </div>
                            <div className='flex gap-3 lg:flex-row flex-col'>
                                <div className='w-[45%] mb-2 ml-3'>
                                    <label htmlFor="" className='text-[#9CA3AF] text-xs ml-1   font-medium'>Email</label>
                                    <input type='text' className='w-full h-[54px] border     rounded-[10px] border-[#F5F5F5] bg-[#F6F6F6] focus:outline-none px-4 placeholder:text-xs ' placeholder='Email' />
                                </div>
                                <div className='w-[45%] mb-2 relative'>
                                    <label htmlFor="" className='text-[#9CA3AF] text-xs ml-1   font-medium'>Password</label>
                                    <input type='password' className='w-full h-[54px] border  rounded-[10px] border-[#F5F5F5] bg-[#F6F6F6] focus:outline-none px-4 placeholder:text-xs ' placeholder='xxxxxxxxxx' />
                                    <span onClick={() => setOpen(true)} className='cursor-pointer text-[#49B400] text-sm absolute bottom-4 right-5'>Change</span>
                                </div>
                            </div>


                        </div>

                    </div>
                    <hr className='text-[#9CA3AF]' />
                    <div className='w-full  sm:justify-end flex '>
                        <button className='px-5 py-3 rounded-[10px] font-semibold bg-[#49B400] text-white mt-2'>Save</button>
                    </div>
                </div>
                {
                    open && < motion.div
                        initial={{ opacity: 0.2 }} animate={{ opacity: 1 }}
                        transition={{ duration: 0.75, ease: "easeOut" }}
                        className='z-50'>
                        <div className='fixed  inset-0 flex justify-center items-center bg-[#000000] bg-opacity-80 '>
                            <div className='w-[22.25rem] h-[423px]  bg-[#ffff] rounded  flex flex-col justify-evenly items-center p-3'>
                                <div className='w-full flex justify-between text-xl font-semibold '>
                                    <div><p>Change Password</p></div>
                                    <div ><span onClick={() => setOpen(false)} className='text-[#BDBDBD]'><AiOutlineClose /></span></div>
                                </div>
                                <div className='relative w-full '>
                                    <label htmlFor="" className='text-[#4F4F4F] text-xs ml-1   font-medium'>Current Password</label>
                                    <input type='password' className='w-full h-[42.97px] bg-white rounded-lg border border-neutral-200 focus:outline-none px-4 placeholder:text-xs ' placeholder='xxxxxxxxxx' />
                                    <span className='text-black text-sm absolute bottom-3 right-5'><AiOutlineEyeInvisible size={21} /></span>
                                </div>
                                <div className='relative w-full '>
                                    <label htmlFor="" className='text-[#4F4F4F] text-xs ml-1   font-medium'>New Password</label>
                                    <input type='password' className='w-full h-[42.97px] bg-white rounded-lg border border-neutral-200 focus:outline-none px-4 placeholder:text-xs ' placeholder='xxxxxxxxxx' />
                                    <span className='text-black text-sm absolute bottom-3 right-5'><AiOutlineEyeInvisible size={21} /></span>
                                </div>
                                <div className='relative w-full '>
                                    <label htmlFor="" className='text-[#4F4F4F] text-xs ml-1   font-medium'>Confirm New Password</label>
                                    <input type='password' className='w-full h-[42.97px] bg-white rounded-lg border border-neutral-200 focus:outline-none px-4 placeholder:text-xs ' placeholder='xxxxxxxxxx' />
                                    <span className='text-black text-sm absolute bottom-3 right-5'><AiOutlineEyeInvisible size={21} /></span>
                                </div>
                                <div className='w-full  flex  justify-between'>
                                    <button className='px-5 py-3 rounded-[10px] font-semibold text-[#49B400]   mt-2'>Cancel</button>
                                    <button className='px-5 py-3 rounded-[10px] font-semibold bg-[#49B400] text-white mt-2'>Save</button>
                                </div>


                            </div>
                        </div>
                    </ motion.div>
                }


            </div>

        </Wrapper>
    )
}

export default Settings