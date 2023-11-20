import React, { useEffect, useState } from 'react'
import Wrapper from '../Wrapper'
import { BsChatLeftText } from 'react-icons/bs'
import axios from 'axios'
import { AiOutlinePlus, AiTwotoneStar } from 'react-icons/ai'

const ClientCompletedService = () => {
    const [getData, setGetData] = useState(null)

    const bookingId = localStorage.getItem("Complete-bookingId")
    const requestData = {
        bookingObjId: bookingId,
    };

    useEffect(() => {

        const fetchDataById = async () => {
            try {
                const responce = await axios.get("https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/completedAppointmentListById", requestData);
                setGetData(responce.data.response)
            } catch (error) {
                console.log("error", error);
            }
        }
        fetchDataById()
    }, [])

    console.log("getData", getData);

    return (
        <div className='h-full overflow-hidden'>
            <Wrapper title={"Completed Service"}>
            <div className='overflow-y-scroll h-screen pb-10'>
                    <div className="relative overflow-x-auto bg-white scrollbar-thumb-[#c7d6df] scrollbar-thin scrollbar-track-gray-100 xl:h-[calc(100vh-230px)] h-[calc(100vh-100px)] xl:pb-0 pb-5 no-scrollbar shadow-sm rounded-bl-[10px] rounded-br-[10px]">
                        <div className=' border-b py-4 px-10 flex justify-between items-center'>
                            <p className='ext-[#333333] font-semibold text-base '>Information</p>

                        </div>
                        <div className='p-10 xl:flex justify-between xl:gap-7'>
                            <div className="flex flex-col w-full">
                                <p className="font-semibold text-[#505051]">Customer Name</p>
                                <input
                                    className="py-3 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
                                    type="text"
                                    value={getData?.customerName}
                                    placeholder="Title here"
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <p className="font-semibold text-[#505051]">Service Name</p>
                                <input
                                    className="py-3 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
                                    type="text"
                                    value={getData?.serviceName}
                                    placeholder="Title here"
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <p className="font-semibold text-[#505051]">Booked On</p>
                                <input
                                    className="py-3 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
                                    type="text"
                                    // value={getData?.bookedOn}
                                    value={new Date(getData?.bookedOn).toLocaleString()}
                                    placeholder="Title here"
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <p className="font-semibold text-[#505051]">Completed On</p>
                                <input
                                    className="py-3 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
                                    type="text"
                                    value={new Date(getData?.scheduledOn).toLocaleString()}
                                    placeholder="Title here"
                                />
                            </div>
                        </div>


                        {/* second */}
                        <div className='px-10 xl:flex justify-between xl:gap-7'>
                            <div className="flex flex-col w-full">
                                <p className="font-semibold text-[#505051]">Category</p>
                                <input
                                    className="py-3 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
                                    type="text"
                                    value={getData?.category}
                                    placeholder="Title here"
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <p className="font-semibold text-[#505051]">Total Lot Size</p>
                                <input
                                    className="py-3 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
                                    type="text"
                                    value={getData?.totalSize}
                                    placeholder="Title here"
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <p className="font-semibold text-[#505051]">Sq Ft Size</p>
                                <input
                                    className="py-3 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
                                    type="text"
                                    value={getData?.lotSize}
                                    placeholder="Title here"
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <p className="font-semibold text-[#505051]">Price</p>
                                <input
                                    className="py-3 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
                                    type="text"
                                    value={getData?.price}
                                    placeholder="Title here"
                                />
                            </div>
                        </div>
                        <div className='px-10 pt-7'>
                            <p className='text-[#595858] font-semibold text-sm '>Additional Info</p>
                            <textarea className='w-full border rounded-lg h-20 text-sm p-4 '
                                value={getData?.additionalInfo}
                                placeholder='Type Something...' >

                            </textarea>
                        </div>
                        <hr className="h-px mx-10 my-6 bg-grsay-500 border-0 " />
                    </div>

                    {/* second part */}
                    <div className='pt-10 flex lg:flex-row flex-col gap-10 pb-20'>
                        <div className='w-[100%] lg:w-[50%] border border-gray-300 rounded-lg p- flex flex-col gap-10 items-cente justify-center bg-[#ffffff] '>
                            <div className=' border-b py-4 px-10 flex justify-between items-center'>
                                <p className='ext-[#333333] font-semibold text-base '>Employee Feedback</p>
                            </div>

                            <div className='px-10  -mt-2 '>
                                <p className='text-[#595858] font-semibold text-sm '>Service Description</p>
                                <textarea className='w-full border rounded-lg h-20 text-sm p-4 '
                                    value={getData?.employeeReview?.description}
                                    placeholder='Type Something...' >

                                </textarea>
                            </div>

                            <div className="flex flex-col w-full pt-8 p-10">
                                <p className="font-semibold text-[#000000] text-sm ">
                                    Service Imagees{" "}
                                    <span className="text-xs text-[#b5b5b8]">
                                        ( 6 images only )
                                    </span>
                                </p>
                                <div className="flex items-center md:gap-10 gap-3 flex-wrap mt-5">
                                    <label className="md:w-32 md:h-32 w-24 h-24 rounded-xl border-dashed border-2 border-gray-500 flex flex-col items-center justify-center cursor-pointer">
                                        <div className="w-full h-full flex flex-col items-center justify-center">
                                            <AiOutlinePlus className=" text-xl hover:text-gray-700 " />
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            name="upload image"
                                            accept="image/*"
                                            className="w-0 h-0"
                                        // onChange={uploadImage}
                                        />
                                    </label>

                                    <label className="md:w-32 md:h-32 w-24 h-24 rounded-xl border-dashed border-2 border-gray-500 flex flex-col items-center justify-center cursor-pointer ">
                                        <div className="w-full h-full flex flex-col items-center justify-center">
                                            <AiOutlinePlus className=" text-xl hover:text-gray-700 " />
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            name="upload image"
                                            accept="image/*"
                                            className="w-0 h-0"
                                        // onChange={uploadImage}
                                        />
                                    </label>

                                    <label className="md:w-32 md:h-32 w-24 h-24 rounded-xl border-dashed border-2 border-gray-500 flex flex-col items-center justify-center cursor-pointer mt-">
                                        <div className="w-full h-full flex flex-col items-center justify-center">
                                            <AiOutlinePlus className=" text-xl hover:text-gray-700 " />
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            name="upload image"
                                            accept="image/*"
                                            className="w-0 h-0"
                                        // onChange={uploadImage}
                                        />
                                    </label>

                                    <label className="md:w-32 md:h-32 w-24 h-24 rounded-xl border-dashed border-2 border-gray-500 flex flex-col items-center justify-center cursor-pointer ">
                                        <div className="w-full h-full flex flex-col items-center justify-center">
                                            <AiOutlinePlus className=" text-xl hover:text-gray-700 " />
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            name="upload image"
                                            accept="image/*"
                                            className="w-0 h-0"
                                        // onChange={uploadImage}
                                        />
                                    </label>

                                    <label className="md:w-32 md:h-32 w-24 h-24 rounded-xl border-dashed border-2 border-gray-500 flex flex-col items-center justify-center cursor-pointer ">
                                        <div className="w-full h-full flex flex-col items-center justify-center">
                                            <AiOutlinePlus className=" text-xl hover:text-gray-700 " />
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            name="upload image"
                                            accept="image/*"
                                            className="w-0 h-0"
                                        // onChange={uploadImage}
                                        />
                                    </label>

                                    <label className="md:w-32 md:h-32 w-24 h-24 rounded-xl border-dashed border-2 border-gray-500 flex flex-col items-center justify-center cursor-pointer ">
                                        <div className="w-full h-full flex flex-col items-center justify-center">
                                            <AiOutlinePlus className=" text-xl hover:text-gray-700 " />
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            name="upload image"
                                            accept="image/*"
                                            className="w-0 h-0"
                                        // onChange={uploadImage}
                                        />
                                    </label>

                                </div>

                            </div>

                        </div>

                        <div className='w-[100%] lg:w-[50%] h-full border border-gray-300 rounded-lg pb-10 flex flex-col gap-10 items-cente justify-center bg-[#ffffff] '>
                            <div className=' border-b py-4 px-10 flex justify-between items-center'>
                                <p className='ext-[#333333] font-semibold text-base '>Customer Feedback</p>
                            </div>

                            <div className='px-10  -mt-2 '>
                                <p className='text-[#595858] font-semibold text-sm '>Description</p>
                                <textarea className='w-full border rounded-lg h-20 text-sm p-4 '
                                    value={getData?.cutomerReview?.comments}
                                    placeholder='Type Something...' >

                                </textarea>
                                <div className='mt-7'>
                                    <p className='text-[#595858] font-semibold text-sm '>Customer Rating</p>
                                    {/* {Array.from({ length: getData?.cutomerReview?.ratings}, (_, index) => (
                                                <AiTwotoneStar key={index} size={20} />
                                            ))} */}
                                    <div className='flex gap-1'>
                                        <AiTwotoneStar className='text-yellow-500 mt-2' size={20} />
                                        <AiTwotoneStar className='text-yellow-500 mt-2' size={20} />
                                        <AiTwotoneStar className='text-yellow-500 mt-2' size={20} />
                                        <AiTwotoneStar className='text-yellow-500 mt-2' size={20} />
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </Wrapper>
        </div>
    )
}

export default ClientCompletedService