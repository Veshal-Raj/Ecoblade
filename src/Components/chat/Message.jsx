import React, { useContext } from 'react'
import Input from './Input'
import { BiArrowBack } from 'react-icons/bi';
import { MessageContext } from '../../context/MessageContext';

const Message = () => {
    const {showChat, setShowChat} = useContext(MessageContext)

    const handleBack = () => {
        setShowChat(false)
    }

    return (
        <>
      
        <div className="flex flex-col flex-auto h-full ">
            <div
                className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full "
            >
                 <div className='pl-3 slg:hidden' onClick={handleBack}>
                    <BiArrowBack size={25} />
                </div>
                <div className="flex flex-col h-full overflow-x-auto mb-4 no-scrollbar">
                    <div className="flex flex-col h-full">
                        <div className="grid grid-cols-12 gap-y-2">
                            <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                <div className="flex flex-row items-center">

                                    <div
                                        className="relative ml-3 text-sm bg-[#FAFFF6] py-2 px-4 shadow rounded-xl"
                                    >
                                        <div>Hey How are you today?</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                <div className="flex flex-row items-center">

                                    <div
                                        className="relative ml-3 text-sm bg-[#FAFFF6] py-2 px-4 shadow rounded-xl"
                                    >
                                        <div>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                            elit. Vel ipsa commodi illum saepe numquam maxime
                                            asperiores voluptate sit, minima perspiciatis.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                <div className="flex items-center justify-start flex-row-reverse">

                                    <div
                                        className="relative mr-3 text-sm bg-[#4AB500] text-white py-2 px-4 shadow rounded-xl"
                                    >
                                        <div>I'm ok what about you?</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                <div className="flex items-center justify-start flex-row-reverse">

                                    <div
                                        className="relative mr-3 text-sm bg-[#4AB500] text-white py-2 px-4 shadow rounded-xl"
                                    >
                                        <div>
                                            Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                <div className="flex flex-row items-center">

                                    <div
                                        className="relative ml-3 text-sm bg-[#FAFFF6] py-2 px-4 shadow rounded-xl"
                                    >
                                        <div>Lorem ipsum dolor sit amet !</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                <div className="flex items-center justify-start flex-row-reverse">

                                    <div
                                        className="relative mr-3 text-sm bg-[#4AB500] text-white py-2 px-4 shadow rounded-xl"
                                    >
                                        <div>
                                            Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                                        </div>
                                        <div
                                            className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500"
                                        >
                                            Seen
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                <div className="flex flex-row items-center">

                                    <div
                                        className="relative ml-3 text-sm bg-[#FAFFF6] py-2 px-4 shadow rounded-xl"
                                    >
                                        <div>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Perspiciatis, in.khhjk
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        </>
        
    )
}

export default Message