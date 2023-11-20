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
    location.pathname.startsWith('/home/upcoming-service/');

    const showBackButtonforclient = location.pathname === '/clients/:userId' ||
    location.pathname.startsWith('/clients/')
    return (
        <>
            <div className='w-[83%  w-full  lg:px-10 md:px-5'>
                <div className='w-[98% h-20  flex justify-between items-center mx-auto w-full  ' >
                {/* {showBackButton && (
                        <div className='text-black' onClick={() => navigate(-1)}>
                            <HiOutlineArrowNarrowLeft />
                        </div>
                    )}
                     {showBackButtonforclient && (
                        <div className='text-black' onClick={() => navigate(-1)}>
                            <HiOutlineArrowNarrowLeft />
                        </div>
                    )} */}
                    {
                        location.pathname === "/home/upcoming-service" ? <div className='text-black' onClick={() => navigate(-1)}> <HiOutlineArrowNarrowLeft /></div>
                            : location.pathname === "/home/completed-service" ? <div className='text-black' onClick={() => navigate(-1)}> <HiOutlineArrowNarrowLeft /></div> :
                            location.pathname === "/clients/upcoming-service" ? <div className='text-black' onClick={() => navigate(-1)}> <HiOutlineArrowNarrowLeft /></div> :
                           
                            showBackButton ?  <div className='text-black' onClick={() => navigate(-1)}>
                            <HiOutlineArrowNarrowLeft />
                        </div> :
                        showBackButtonforclient ?
                        <div className='text-black' onClick={() => navigate(-1)}>
                        <HiOutlineArrowNarrowLeft />
                    </div>:
                                <></>
                    }

                    <div className='px-4 xl:block hidden '>
                        <p className='text-[#333333] font-semibold text-[22px] w-52'>{title}</p>
                    </div>
                    <div className='flex justify-end  w-full pr-3'>
                        <div className="flex justify-center ">
                            <div  className="relative">
                                <div
                                    onMouseOver={() => setOpen(true)}
                                    className=""
                                >
                                    <ProfilePhoto size={"w-[50px] h-[50px]"} image={profileimg} />
                                </div>
                                <ul onMouseLeave={() => setOpen(false)}
                                    className={`z-50 absolute right-0 w-48 py-2 mt-2 rounded-lg shadow-xl  bg-white ${open ? "block " : "hidden"
                                        }`}
                                >
                                    <div className='flex flex-col items-center justify-center'>
                                        <ProfilePhoto size={"w-[50px] h-[50px]"} image={profileimg} />
                                        <p className='font-medium text-sm'>Jcob Jones</p>
                                        <p className='text-[10px] text-gray-400'>jacobjones@domain.com</p>
                                    </div>
                                    <hr className='bg-red-500 h-px w-full mt-3' />
                                    <div className='flex flex-col p-3 gap-'>
                                        <div className='flex items-center gap-3 cursor-pointer hover:bg-gray-100 py- rounded-lg p-2 transition-all duration-200 ' onClick={handleNavigate}>
                                            <FaRegUser />
                                            <p className='text-xs'>My Profile</p>
                                        </div>
                                        <div className='flex items-center cursor-pointer gap-3 text-red-700 hover:bg-gray-100 py- rounded-lg p-2' onClick={handleSignout}>
                                            <MdOutlineLogout />
                                            <p className='text-xs'>Logout</p>
                                        </div>
                                    </div>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' p-3 w-full h-[88.8%]' >
                    {children}
                </div>


            </div>

        </>
    )
}

export default NavProfile
