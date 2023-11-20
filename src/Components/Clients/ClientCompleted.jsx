import { CircularProgress, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LuMoreHorizontal } from 'react-icons/lu';
import { motion } from 'framer-motion';
import { AiOutlineEye, AiTwotoneStar } from 'react-icons/ai';
import { BiBlock } from 'react-icons/bi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from '../paginatoin/Pagination';

const ClientCompleted = () => {
  const [data, setData] = useState([]);
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
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    // const ClientId = localStorage.getItem("clientId")
    const ClientId = '65434681a2729c3886e5494a';
    // const requestData = {
    //   userId: ClientId,
    // };
    const requestData = {
      userId: '6555a602ef43e42a98134fd5',
    };
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const fetchDataById = async () => {
      try {
        const response = await axios.post(
          'https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/completedClientsByUserId',
          requestData,
          { headers: headers }
        );
        setData(response.data.response?.appointments);
        console.log('data...', response.data.response?.appointments);
        setLoading(false);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchDataById();
  }, []);

  const formatTimestamp = (timestamp) => {
    const dateObject = new Date(timestamp);

    // Format the date
    const formattedDate = dateObject.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    // Format the time
    const formattedTime = dateObject.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });

    // Combine date and time
    return `${formattedDate} ${formattedTime}`;
  };

  // Define your theme using createTheme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#4AB500',
      },
    },
  });

  //completed service
  const handleUpcomingService = (bookingId) => {
    navigate('/clients/completed-service');
    // setAppointmentBookingObjId(bookingId)
    localStorage.setItem('Complete-bookingId', bookingId);
    // console.log("jhjhjhjjhj", bookingId);
  };

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
                  Completed On
                </th>
                <th scope="col" className="px-6 py-3">
                  Feedback
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {data &&
                data.map((client, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap"
                    >
                      #{client.bookingId}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold flex items-center gap-3 text-[#333333] whitespace-nowrap"
                    >
                      <div className="relative">
                        <img
                          src={client.serviceImage}
                          className="w-[50px] h-[50px] rounded-[4.86px]"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col ">
                        <p className="">{client.serviceName}</p>
                        <div className="flex gap-1">
                          <img
                            // src={favicon}
                            alt=""
                          />{' '}
                          <span className="text-[#828282] text-xs">
                            {client.review}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap"
                    >
                      {client.customerName}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap"
                    >
                      ${client.price}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap"
                    >
                      {/* 023-11-12T07:44:57.197Z */}4
                      {formatTimestamp(client.completedOn)}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap"
                    >
                      <div className="flex gap-2 items-center text-[#FEB600]">
                        {Array.from(
                          { length: client?.cutomerRating },
                          (_, index) => (
                            <AiTwotoneStar key={index} size={20} />
                          )
                        )}
                      </div>
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap  "
                      onClick={() => handleUpcomingService(client.bookingObjId)}
                    >
                      <AiOutlineEye
                        className="ml-3 text-black cursor-pointer"
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
        <div className="text-xs font-normal text-[#49B400]">
          Showing {firstPostIndex + 1} to {currentPosts.length} of {data.length}
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
    </>
  );
};

export default ClientCompleted;
