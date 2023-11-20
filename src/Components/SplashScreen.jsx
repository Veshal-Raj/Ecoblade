import React from 'react'
import img from '../assets/unsplash_CQkBjIfJjwY.png'
const SplashScreen = ({children}) => {
    return (
        <div className='w-[100%] h-[100%] grid grid-cols-12'>
            <div className='col-span-7 bg-white flex items-center justify-center'>{children}</div>
            <div className='col-span-5 h-[100%] bg-black'>
                <img src={img} className='h-[100vh] w-[100%]' alt="" />
            </div>

        </div>
    )
}

export default SplashScreen
