import React, { useState, useEffect } from 'react';
import { AiTwotoneStar } from 'react-icons/ai';
import tableimg from '../../assets/tableImg.png';
import favicon from '../../assets/star_black_24dp 1.svg';
import { AiOutlineEye } from 'react-icons/ai';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from '../paginatoin/Pagination';
import { CircularProgress } from '@mui/material';

const AppointmentsCompleted = () => {
  const [data, setData] = useState([]);
  const [paginationData, setPaginationData] = useState({
    total: 0,
    perPage: 10,
    currentPage: 1,
    totalPages: 1,
  });
  const [postsPerPage, setPostPerPage] = useState(10);
  const [currentpage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  console.log('currentPage', currentpage);

  const lastPostIndex = currentpage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data?.appointments?.slice(firstPostIndex, lastPostIndex);
  const npage = Math.ceil(data?.appointments?.length / postsPerPage);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        setLoading(true);
        const responce = await axios.get(
          `https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/completedAppointmentList?page=2&perPage=10`
        );
        setData(responce.data.response);
        console.log(
          'Data fetched successfully:',
          typeof responce.data.response.appointments[0]?.cutomerRating
        );
        // console.log();
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataById();
  }, []);

  //completed service
  const handleUpcomingService = (bookingId) => {
    navigate(`/home/completed-service/${bookingId}`);
    console.log('hiii', bookingId);
    // setAppointmentBookingObjId(bookingId)
    localStorage.setItem('Complete-bookingId', bookingId);
    // console.log("jhjhjhjjhj", bookingId);
  };

  // Define your theme using createTheme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#4AB500',
      },
    },
  });
  console.log(data);
  return (
    <div className="">
      <div className="relative overflow-x-auto  bg-white   scrollbar-thumb-[#c7d6df] scrollbar-thin scrollbar-track-gray-100 xl:h-[calc(100vh-220px)] h-[calc(100vh-240px)] no-scrollbar shadow-sm rounded-bl-[10px] rounded-br-[10px]">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-[#828282] uppercase bg-gray-50   h-[60px] ">
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
                  Completed On
                </th>
                <th scope="col" className="px-6 py-3">
                  Feedback
                </th>
                <th scope="col" className="px-6 ml-6 py-3 me-5 mr-40">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPosts &&
                currentPosts.map((completed, index) => (
                  <tr key={index} className="bg-white border-b   ">
                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold  text-[#333333] whitespace-nowrap "
                    >
                      {completed?.bookingId}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold flex  items-center  gap-3 text-[#333333] whitespace-nowrap "
                    >
                      <div className="relative">
                        <img
                          src={completed?.serviceImage}
                          className="w-[50px] h-[50px] rounded-[4.86px] "
                          alt=""
                        />
                      </div>
                      <div className=" flex flex-col ">
                        <p>{completed?.serviceName}</p>
                        <div className="flex gap-1">
                          <img src={favicon} alt="" />{' '}
                          <span className="text-[#828282] text-xs">4.0</span>
                        </div>
                      </div>
                    </td>

                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap "
                    >
                      {completed?.customerName}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap "
                    >
                      {completed?.price}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap "
                    >
                      {completed?.completedOn && (
                        <>
                          <span>
                            {new Date(completed.completedOn).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              }
                            )}
                          </span>
                          <br />
                          <span>
                            {new Date(completed.completedOn).toLocaleTimeString(
                              'en-US',
                              {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                              }
                            )}
                          </span>
                        </>
                      )}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap"
                    >
                      <div className="flex">
                        {[...Array(5)].map((_, index) => (
                          <img
                            key={index}
                            src={favicon}
                            alt=""
                            className="mr-1"
                          />
                        ))}
                      </div>
                    </td>

                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap  "
                      onClick={() =>
                        handleUpcomingService(completed.bookingObjId)
                      }
                    >
                      <AiOutlineEye
                        className="mr-6 text-black cursor-pointer"
                        size={20}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="w-full h-14 flex items-center justify-between">
        {/* <div className="text-xs font-normal text-[#49B400]">
                    Showing{" "}
                    {paginationData.currentPage === 1
                        ? 1
                        : (paginationData.currentPage - 1) * paginationData.perPage +
                        1}{" "}
                    to{" "}
                    {Math.min(
                        paginationData.currentPage * paginationData.perPage,
                        paginationData.total
                    )}{" "}
                    of {paginationData.total}
                </div> */}
        <div className="text-xs font-normal text-[#49B400]">
          Showing 1 to {currentPosts?.length} of {data?.total}
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Pagination
              totalPosts={data?.total}
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

export default AppointmentsCompleted;
