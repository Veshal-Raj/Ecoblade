import { Route, Routes } from 'react-router-dom';
import './App.css';
// import AC from 'agora-chat'
import SplashScreen from './Components/SplashScreen';
import Login from './Pages/Login';
import VerifyingEmail from './Pages/VerifyingEmail';
import Home from './Pages/Home';
import Clients from './Pages/Clients';
import ClientDetails from './Components/Clients/ClientDetails';
import HelpCenter from './Pages/HelpCenter';
import Settings from './Pages/Settings';
import ChatPage from './Pages/ChatPage';
import Service from './Pages/Service';
import Report from './Pages/Report';
import AddService from './Components/service/AddService';
import { MessageContext } from './context/MessageContext';
import { useState } from 'react';
import UpcomingService from './Components/Appointments/UpcomingService';
import { AppointmentContext } from './context/AppointmentContext';
import CompletedService from './Components/Appointments/CompletedService';
import ClientUpcomingServices from './Components/Clients/ClientUpcomingServices';
import ClientCompletedService from './Components/Clients/ClientCompletedService';

function App() {
  const [showChat, setShowChat] = useState(false);
  const [appointmentBookingObjId, setAppointmentBookingObjId] = useState(null);
  const [completedBookingObjId, setCompletedBookingObjId] = useState(null);

  return (
    <>
      <div className="min-h-screen w-[100vw] bg-[#F9FCFE] ">
        <AppointmentContext.Provider
          value={{
            setAppointmentBookingObjId,
            appointmentBookingObjId,
            completedBookingObjId,
            setCompletedBookingObjId,
          }}
        >
          <MessageContext.Provider value={{ showChat, setShowChat }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/verify-email" element={<VerifyingEmail />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/home/upcoming-service/:bookingObjId"
                element={<UpcomingService />}
              />
              <Route
                path="/home/completed-service/:bookingObjId"
                element={<CompletedService />}
              />
              <Route path="/clients" element={<Clients />} />
              <Route
                path="/clients/upcoming-service"
                element={<ClientUpcomingServices />}
              />
              <Route
                path="/clients/completed-service"
                element={<ClientCompletedService />}
              />
              <Route path="/services" element={<Service />} />
              <Route path="/clients/:userId" element={<ClientDetails />} />

              <Route path="/addservices" element={<AddService />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/reports" element={<Report />} />

              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </MessageContext.Provider>
        </AppointmentContext.Provider>
      </div>
    </>
  );
}

export default App;
