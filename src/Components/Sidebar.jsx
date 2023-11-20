import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import { IoIosMenu } from 'react-icons/io'
// import { Link } from 'react-router-dom'
import { SidebarData } from '../data'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GrMenu } from 'react-icons/Gr'



const Sidebar = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(true)
    let location = useLocation();
    // console.log(location);
    const handleNavigate = (path) => {
        navigate(path)
    }

    return (
        <>
         <div className='xl:block hidden'>
             <div className={`min-h-screen  ${open ? "w-[250px] " : "w-24 "} p-3.5  duration-500 shadow-md bg-white  text-6 sticky`}>

            <div className='py-3 flex justify-between items-center '>
                {open && <img src={logo} className={` h-[62.04px] w-[132px] ${!open&& 'translate-x-28 duration-300 opacity-0'} `} alt="" />}
                <IoIosMenu size={26} className='text-[#949292] cursor-pointer' onClick={() => setOpen(!open)} />
            </div>
            <div className=' flex   flex-col mt-1 '>
                {
                    SidebarData.map((item, i) => (
                        <Link to={item.path} key={i}
                            className={`flex items-center  text-sm gap-3.5 font-medium ${open?"p-4":'p-6 py-4  mt-3 text-3xl'} 
                            ${item.path=== location.pathname?"bg-[#49B400] text-white":"bg-white text-[#49B400]"}
                            mt-2  rounded-[10px]`}>
                            <div className=''>
                                {item.icon}
                            </div>
                            <h2
                                style={{
                                    transitionDelay: `${i + 3}00ms`
                                }}
                                className={`whitespace-pre duration-500 text-base font-semibold ${!open && "opacity-0 translate-x-28 overflow-hidden "}`}>{item.title}</h2>

                        </Link>
                    ))
                }

            </div>

        </div>
        </div>

        <div className=' absolute xl:hidden h-12 w-12 rounded-xl bg-gray-100 left-4 top-4 flex justify-center items-center text-gray-100'>
              <GrMenu  size={20}/>
        </div>
        
        </>
       
       
    )
}

export default Sidebar
