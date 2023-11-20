import React, { useState } from 'react'
import ProfilePhoto from './ProfilePhoto'
import profileimg from '../assets/profileImg.svg'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaRegUser } from 'react-icons/fa6'
import { MdOutlineLogout } from 'react-icons/md'

const NavProfile = ({ children, title }) => {
    const navigate = useNavigate()
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const handleNavigate = () => {
       navigate("/settings")
    }

    const handleSignout = () => {
        localStorage.clear()
        navigate("/")
    }

    const showBackButton = location.pathname === '/home/upcoming-service/:bookingObjId' ||
    location.pathname.startsWith('/home/upcoming-service/') || location.pathname === '/home/completed-service/:bookingObjId' ||
    location.pathname.startsWith('/home/completed-service/');

    const showBackButtonforclient = location.pathname === '/clients/:userId' ||
    location.pathname.startsWith('/clients/')
    return (
        <>
  <div className='w-[83% w-full lg:px-10 md:px-5'>
    <div className='w-[98% h-20 flex justify-between items-center mx-auto w-full '>
      {location.pathname === "/home/upcoming-service" ? (
        <div className='text-black' onClick={() => navigate(-1)}>
          <HiOutlineArrowNarrowLeft />
        </div>
      ) : location.pathname === "/home/completed-service" ? (
        <div className='text-black' onClick={() => navigate(-1)}>
          <HiOutlineArrowNarrowLeft />
        </div>
      ) : location.pathname === "/clients/upcoming-service" ? (
        <div className='text-black' onClick={() => navigate(-1)}>
          <HiOutlineArrowNarrowLeft />
        </div>
      ) : showBackButton ? (
        <div className='text-black' onClick={() => navigate(-1)}>
          <HiOutlineArrowNarrowLeft />
        </div>
      ) : showBackButtonforclient ? (
        <div className='text-black' onClick={() => navigate(-1)}>
          <HiOutlineArrowNarrowLeft />
        </div>
      ) : (
        <></>
      )}

      <div className='px-4 xl:block hidden '>
        <p className='text-[#333333] font-semibold text-[22px] w-52'>{title} </p>
      </div>
      <div className='flex justify-end w-full pr-3'>
        {/* ... Your profile photo and dropdown code ... */}
      </div>
    </div>
    <div className='p-3 w-full h-[88.8%]'>{children}</div>
  </div>
</>

    )
}

export default NavProfile
