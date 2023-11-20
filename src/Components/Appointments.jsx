import React, { useState, useEffect } from 'react';
import tableimg from '../assets/tableImg.png';
import favicon from '../assets/star_black_24dp 1.svg';
import { LuMoreHorizontal } from 'react-icons/lu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Pagination from '../Components/paginatoin/Pagination';
import { CircularProgress, Pagination } from '@mui/material';

import { motion } from 'framer-motion';
import { AiOutlineEye } from 'react-icons/ai';
import { BiBlock, BiChevronDown, BiLogIn } from 'react-icons/bi';
import axios from 'axios';
import Calendar from 'react-calendar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DateTimePicker from 'react-datetime-picker';
import { utcToZonedTime, format } from 'date-fns-tz';
// import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import { toast, ToastContainer } from 'react-toastify';

const CustomInput = ({ value, onClick }) => {
  return (
    <div className="flex ">
      <input
        placeholder="Select date "
        type="text"
        className="h-10 outline-none w-52 pl-2 text-sm rounded-lg shadow-md bg-[#f6f6f6]"
        value={value}
        onClick={onClick}
        readOnly
      />
      <span className="text-xl absolute top-3 right-2">
        <BiChevronDown />
      </span>
    </div>
  );
};

const Appointments = () => {
  const [dropdown, setDropdown] = useState({ status: false, index: '' });
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showReject, setShowReject] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setUTCDate] = useState(null);
  const [value, setvalue] = useState(new Date());
  const [getbookingId, setGetbookingId] = useState(null);
  const [rejectShowModal, setRejectShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState(null);
  const [service_providerId, setservice_ProviderId] = useState(null);

  //pagination
  const [postsPerPage, setPostPerPage] = useState(10);
  const [currentpage, setCurrentPage] = useState(1);

  const lastPostIndex = currentpage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);
  const npage = Math.ceil(data.length / postsPerPage);

  useEffect(() => {
    setLoading(true);
    const apiUrl =
      'https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/appointmentsList/pending';

    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data.appointments.appointments);
        console.log(
          'm,m,m,m,m,m,m,m,m,m,m',
           response.data.appointments.appointments
        );
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
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
  const handleToggleDropdown = (i, bookingId) => {
    localStorage.setItem('pending_bookingId', bookingId);
    setDropdown((prev) => ({
      status: !prev.status,
      index: i,
    }));
  };

  //Approve Action
  const handleAction = (bookingObjId) => {
    setShowModal(true);

    localStorage.setItem('pending_bookingObjId', bookingObjId);
  };

  // approve pending
  const handleApprove = async () => {
    const bookingObjId = localStorage.getItem('pending_bookingObjId');
    const serviceProviderId = localStorage.getItem('service_providerId');

    const utcDate = utcToZonedTime(selectedDate, 'Etc/UTC');
    const formattedDate = format(utcDate, "yyyy-MM-dd'T'HH:mm:ssXXX", {
      timeZone: 'Etc/UTC',
    }); // Format with time component

    // console.log("selectedDate", selectedDate);
    // console.log('getbookingId', dataObjId  );
    // console.log('service_providerId', providerId  );

    setLoading(true);
    try {
      const responce = await axios.post(
        'https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/approval',
        {
          scheduledOn: selectedDate,
          bookingID: bookingObjId,
          serviceProviderId: serviceProviderId,
        }
      );
      console.log('respoce,.,.,.,.,.,.,.,.,', responce);
      setShowModal(false);
      const notify = () => toast('Successfully Approved');
      notify();
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      const notify = () => toast('Something Went wrong');
      setShowModal(false);
      notify();
      setLoading(false);
    }
  };

  const handleReject = async () => {
    const bookingId = localStorage.getItem('Complete-bookingId');
    const serviceProviderId = localStorage.getItem('service_providerId');
    setRejectShowModal(false);
    // console.log("bookingId", bookingId);
    // console.log("serviceProviderId", serviceProviderId);

    try {
      const responce = await axios.post(
        'https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/rejectService',
        {
          bookingId: bookingId,
          reason: 'service not available',
          payStatus: 'payCancelled',
          serviceProviderId: serviceProviderId,
        }
      );
      console.log(responce.data);
      const notify = () => toast('Successfully Rejected');
      notify();
    } catch (error) {
      console.log('errrr', error);
      const notify = () => toast('Something Went Wrong');
      notify();
    }
  };

  return (
    <>
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
                      Booked On
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
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
                        {new Date(appointment.bookingOn).toLocaleDateString()}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap"
                      >
                        <div className="w-[108] h-7 bg-[#FFF9E6] rounded-[10px] flex items-center justify-center">
                          <p className="text-[#F2C94C] text-xs">
                            {appointment.status}
                          </p>
                        </div>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap"
                      >
                        <div className="relative">
                          <LuMoreHorizontal
                            onClick={() =>
                              handleToggleDropdown(index, appointment.bookingId)
                            }
                            className="ml-3 text-[#BDBDBD] cursor-pointer"
                            size={20}
                          />
                          {dropdown.status && dropdown.index === index && (
                            <motion.div
                              initial={{ opacity: 0.2 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, ease: 'easeOut' }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.8 }}
                              className="inset-0 -left-28 top-3 flex flex-col items-start cursor-pointer justify-center absolute w-[155px] h-[65px] bg-white rounded-[10px] shadow"
                            >
                              <div
                                onClick={() =>
                                  handleAction(
                                    appointment?.bookingObjId,
                                    'approve'
                                  )
                                }
                                className="flex p-1 items-center justify-center gap-3"
                              >
                                <span>
                                  {' '}
                                  <AiOutlineEye
                                    className="text-black cursor-pointer"
                                    size={20}
                                  />
                                </span>
                                <span
                                  className="font-semibold text-sm text-[#4f4f4f] "
                                  // onClick={() => setShowModal(true)}
                                >
                                  Approve
                                </span>
                              </div>
                              <div className="w-full h-px opacity-100 bg-zinc-100 rounded-md shadow" />
                              <div
                                // onClick={() => handleAction(appointment, "reject")}
                                className="p-1 flex items-center justify-start gap-3"
                              >
                                <span>
                                  {' '}
                                  <BiBlock
                                    className="text-black cursor-pointer"
                                    size={20}
                                  />
                                </span>
                                <span
                                  className="font-semibold text-sm text-[#4f4f4f]"
                                  onClick={() => setRejectShowModal(true)}
                                >
                                  Reject
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </div>{' '}
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
          Showing {firstPostIndex + 1} to {currentPosts.length} of {data.length}
        </div>
        <div className="z-50">
          <ThemeProvider theme={theme}>
            {/* <Pagination page={1} count={1} color="primary" shape="rounded" /> */}
            <div
            // onClick={() => setPostPerPage}
            >
              <Pagination
                totalPosts={data.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentpage}
                lastPostIndex={lastPostIndex}
                color='primary'
                size='large'
                npage={npage}
              />
            </div>
          </ThemeProvider>
        </div>
      </div>

      {/* Modal */}
      {showModal ? (
        <>
          <motion.div
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed inset-0 z-10 overflow-y-auto"
          >
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen  px-4 py-8">
              <div className="relative w-full max-w-lg  py-4 p-2 mx-auto bg-white rounded-md shadow-lg ">
                <div className="mt-2 sm:flex flex-col">
                  <div className="mt- text-cente sm:ml-4 sm:text-left">
                    <h4 className="text-lg font-bold ">
                      Approve service Request
                    </h4>
                    <p className="mt-1 text-sm text-[#4B5563] leading-relaxed ">
                      For scheduling the service select the preferred date and
                      time
                    </p>
                    <hr className="h-px my-6 bg-gray-500 border-0 " />

                    {/* <div className="px0 text-xs flex relative"> */}
                    <label className="  ">
                      {/* <DatePicker
                      dateFormat="MM/dd/yyyy; hh:mm"
                        minDate={new Date()}
                        showTimeSelect
                        timeInputLabel={30}
                        // timeFormat="hh:mm"
                        
                        className=" " selected={selectedDate} onChange={(date) => setUTCDate(date)} customInput={<CustomInput />} /> */}

                      <DatePicker
                        dateFormat="MM/dd/yyyy HH:mm"
                        minDate={new Date()}
                        showTimeSelect
                        timeInputLabel="Time"
                        timeFormat="HH:mm"
                        selected={selectedDate}
                        onChange={(date) => setUTCDate(date)}
                        customInput={<CustomInput />}
                        // Set the timeZone to UTC
                        timeZone="Etc/UTC"
                      />
                    </label>
                  </div>

                  <div className="gap-2 mt-3 sm:flex justify-end items-end">
                    <button
                      className="px-6 mt-2 p-2 uppercase text-sm font-semibold  text-[#4ab500] bg-[#f6f6f6] rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-6 mt-2 p-2  uppercase text-sm font-semibold text-white bg-[#4ab500] rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                      onClick={
                        // () =>
                        // setShowModal(false)
                        handleApprove
                      }
                    >
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}

      {rejectShowModal ? (
        <>
          <motion.div
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed inset-0 z-10 overflow-y-auto"
          >
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setRejectShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen  px-4 py-8">
              <div className="relative w-full max-w-xl  py-4 p-2 mx-auto bg-white rounded-md shadow-lg ">
                <div className="mt-2 sm:flex flex-col">
                  <div className="mt- text-cente sm:ml-4 sm:mr-4 sm:text-left">
                    <h4 className="text-lg font-bold ">Reject Service</h4>
                    <div className="pt-8">
                      <label className="mt-1 text-[13px] text-[#BDBDBD] leading-relaxed ">
                        Reason for rejecting
                      </label>
                      <textarea
                        className="border w-full rounded-md text-xs h-16 px-4 pt-2 outline-none"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder=" Type something..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="gap-2 mt-3 sm:flex justify-between">
                    <button
                      className="px-6 mt-2 p-2 uppercase text-sm font-semibold  text-[#4ab500] bg-[#f6f6f6] rounded-md outline-none ring-offset-2  ring-gray-300 focus:ring-2"
                      onClick={() => setRejectShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-6 mt-2 p-2  uppercase text-sm font-semibold text-white bg-[#4ab500] rounded-md outline-none ring-offset-2 ring-gray-300 focus:ring-2"
                      onClick={handleReject}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}

      <ToastContainer />
    </>
  );
};

export default Appointments;
