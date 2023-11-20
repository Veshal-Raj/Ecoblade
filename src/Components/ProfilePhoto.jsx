import React from 'react'

const ProfilePhoto = ({ image, size }) => {
    return (
        <>
            <img
                className={`inline-block ${size ? size : "h-12 w-12"}  rounded-full ring-2 ring-[#ffff]`}
                src={image}
                alt=""
            />
        </>
    )
}

export default ProfilePhoto

