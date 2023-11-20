import React from 'react'
import Message from "../../Components/chat/Message"
import Input from "./Input"
import { BiArrowBack } from 'react-icons/bi'

const Messages = () => {


    return (
        <div className='py-9 px-6 bg-[#F1F4F7] h-full '>
           
            <Message />
         
            <Input />
        </div>

    )
}

export default Messages