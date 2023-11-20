import React, { useContext } from 'react'
import ChatSearch from "../../Components/chat/ChatSearch"
import AllChats from "../../Components/chat/AllChats"
import { MessageContext } from '../../context/MessageContext'
import Chat from './Chat'
import Message from './Message'

const ChatSidebar = () => {
  const {showChat, setShowChat} = useContext(MessageContext)

  return (
    <>
      <div className='slg:w-3/6 w-[100vw w-screen  border-r-2 bg-[#FFFFFF] slg:block  hidden'>
        <ChatSearch />
        <AllChats />
      </div>

      <div className=' slg:w-3/6 w-[100vw w-screen  border-r-2 bg-[#FFFFFF] slg:hidden'>
        {
          showChat ?

          <>
           <Message  />
          </>
           :
           <>
            <ChatSearch />
        <AllChats />
           </>
        }
     
      </div>
    </>

  )
}

export default ChatSidebar