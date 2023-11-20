import { CircularProgress, ThemeProvider, createTheme } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { LuMoreHorizontal } from 'react-icons/lu';
import { motion } from 'framer-motion';
import { AiOutlineEye } from 'react-icons/ai';
import { BiBlock } from 'react-icons/bi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppointmentContext } from '../../context/AppointmentContext';
import Pagination from '../paginatoin/Pagination';

const ClientUpcoming = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { appointmentBookingObjId, setAppointmentBookingObjId } =
    useContext(AppointmentContext);
  const navigate = useNavigate();

  //pagination
  const [postsPerPage, setPostPerPage] = useState(10);
  const [currentpage, setCurrentPage] = useState(1);
  console.log('currentPage', currentpage);

  const lastPostIndex = currentpage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data?.slice(firstPostIndex, lastPostIndex);
  const npage = Math.ceil(data?.length / postsPerPage);

  useEffect(() => {
    setLoading(true);
    // const ClientId = localStorage.getItem("clientId")
    const ClientId = '65434681a2729c3886e5494a';
    const requestData = {
      userId: '6555a602ef43e42a98134fd5',
    };

    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    console.log('requestData', requestData);
    const fetchDataById = async () => {
      try {
        const response = await axios.post(
          'https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/upcomingClientsByUserId',
          requestData,
          { headers: headers }
        );
        setData(response?.data?.appointments?.appointments);
        console.log(response.data.response);
        setLoading(false);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchDataById();
  }, []);

  //upcoming service
  const handleUpcomingService = (bookingObjectId) => {
    navigate('/clients/upcoming-service');
    setAppointmentBookingObjId(bookingObjectId);
    localStorage.setItem('client_upcoming_bookingObjectId', bookingObjectId);
    console.log('jhjhjhjjhj', bookingObjectId);
  };

  console.log('data..', data);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4AB500',
      },
    },
  });

  return (
    <>
      <div className="relative overflow-x-auto bg-white scrollbar-thumb-[#c7d6df] scrollbar-thin scrollbar-track-gray-100 xl:h-[calc(100vh-220px)] h-[calc(100vh-240px)] no-scrollbar shadow-sm rounded-bl-[10px] rounded-br-[10px]">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-[#828282] uppercase bg-gray-50 h-[60px]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Booking ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Service
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Scheduled For
                </th>
                <th scope="col" className="px-6 py-3">
                  Scheduled Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {data &&
                data.map((appointment, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap"
                    >
                      #{appointment.bookingId}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold flex items-center gap-3 text-[#333333] whitespace-nowrap"
                    >
                      <div className="relative">
                        <img
                          src={appointment.serviceImage}
                          className="w-[50px] h-[50px] rounded-[4.86px]"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col">
                        <p>{appointment.serviceName}</p>
                        <div className="flex gap-1">
                          <img
                            // src={favicon}
                            alt=""
                          />{' '}
                          <span className="text-[#828282] text-xs">
                            {appointment.review}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap"
                    >
                      {appointment.customerName}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap"
                    >
                      ${appointment.price}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap"
                    >
                      {new Date(appointment.scheduledOn).toLocaleDateString()}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap"
                    >
                      {new Date(appointment.bookingOn).toLocaleDateString()}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap"
                    >
                      <AiOutlineEye
                        className="ml-3 text-black cursor-pointer"
                        size={20}
                        onClick={() =>
                          handleUpcomingService(appointment.bookingObjId)
                        }
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="w-full h-14 flex items-center justify-between">
        <div className="text-xs font-normal text-[#49B400]">
          Showing {firstPostIndex + 1} to {currentPosts?.length} of{' '}
          {data?.length}
          {/* Showing {firstPostIndex + 1} to {lastPostIndex-1} of {data.length}  */}
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Pagination
              totalPosts={data?.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentpage}
              lastPostIndex={lastPostIndex}
              npage={npage}
            />
          </ThemeProvider>
        </div>
      </div>
    </>
  );
};

export default ClientUpcoming;
