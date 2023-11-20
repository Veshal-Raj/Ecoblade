import React, { useState, useEffect, useContext } from 'react';
import tableimg from '../../assets/tableImg.png';
import favicon from '../../assets/star_black_24dp 1.svg';
import { AiOutlineEye } from 'react-icons/ai';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AppointmentContext } from '../../context/AppointmentContext';
import Pagination from '../paginatoin/Pagination';

const AppointmentsUpcoming = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paginationData, setPaginationData] = useState({
    total: 0,
    perPage: 10,
    currentPage: 1,
    totalPages: 1,
  });

  const [postsPerPage, setPostPerPage] = useState(10);
  const [currentpage, setCurrentPage] = useState(1);

  const lastPostIndex = currentpage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);
  const npage = Math.ceil(data.length / postsPerPage);

  const { appointmentBookingObjId, setAppointmentBookingObjId } =
    useContext(AppointmentContext);

  useEffect(() => {
    setLoading(true);
    const apiUrl =
      'https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/upcommingAppointmentsList/upcoming';

    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data.appointments.appointments);
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4AB500',
      },
    },
  });

  console.log('dataa..', data);

  //upcoming service
  const handleUpcomingService = (bookingId) => {
    navigate(`/home/upcoming-service/${bookingId}`);
    setAppointmentBookingObjId(bookingId);
    localStorage.setItem('upcoming_bookingId', bookingId);
  };

  return (
    <div className="">
      <div className="relative overflow-x-auto bg-white scrollbar-thumb-[#c7d6df] scrollbar-thin scrollbar-track-gray-100 xl:h-[calc(100vh-220px)] h-[calc(100vh-240px)] no-scrollbar shadow-sm rounded-bl-[10px] rounded-br-[10px]">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <>
            {currentPosts.length > 0 ? (
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
                  {currentPosts.map((appointment, index) => (
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
                            <img src={favicon} alt="" />{' '}
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
                        {appointment.customerName
                          .split(' ')
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(' ')}
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
                        {new Date(appointment.bookingOn).toLocaleTimeString()}
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
            ) : (
              <div className="flex items-center justify-center h-40">
                <p className="text-gray-500">No appointments to show</p>
              </div>
            )}
          </>
        )}
      </div>
      <div className="w-full h-14 flex items-center justify-between">
        <div className="text-xs font-normal text-[#49B400]">
          Showing 1 to {currentPosts.length} of {data.length}
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Pagination
              totalPosts={data.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentpage}
              lastPostIndex={lastPostIndex}
              npage={npage}
            />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsUpcoming;
