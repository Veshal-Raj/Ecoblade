import React from 'react'
import Sidebar from './Sidebar'
import NavProfile from './NavProfile'

const Wrapper = ({ children, title }) => {
    return (
        <div className=' h-[100vh] w-[100vw] flex '>
            <Sidebar  />
           
            <NavProfile title={title}>
                
                {children}
            </NavProfile>

        </div>
    )
}

export default Wrapper
