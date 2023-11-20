import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../Components/Sidebar'
import Wrapper from '../Components/Wrapper'
import Appointments from '../Components/Appointments'
import AppointmentsUpcoming from '../Components/Appointments/AppointmentsUpcoming'
import AppointmentsCompleted from '../Components/Appointments/AppointmentsCompleted'
import AppoinmentHome from '../Components/Appointments/AppoinmentHome'
const Home = () => {
    const [status, setStatus] = useState('pending')
    return (
        <Wrapper title={"Appointments"}>
            <div>
            <h1 className='text-2xl font-semibold  xl:hidden pb-6 '>Appointments</h1>
                <AppoinmentHome />
            </div>
        </Wrapper>

    )
}

export default Home
