import React, { useContext, useEffect, useState } from 'react';
import Wrapper from '../Wrapper';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { BsChatLeftText } from 'react-icons/bs';
import { AppointmentContext } from '../../context/AppointmentContext';
import axios from 'axios';
import { color, motion } from 'framer-motion';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpcomingService = () => {
  const { bookingObjId } = useParams();

  const navigate = useNavigate();
  const [getData, setGatData] = useState(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [description, setDescription] = useState('');
  const { appointmentBookingObjId, setAppointmentBookingObjId } =
    useContext(AppointmentContext);
  // const [selectedFile, setSelectedFile] = useState(null);
  const [selectedLabels, setSelectedLabels] = useState(Array(6).fill(null)); // Array to store selected labels
  console.log(
    '🚀 ~ file: UpcomingService.jsx:21 ~ UpcomingService ~ selectedLabels:',
    selectedLabels
  );

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];

    // Update the selectedLabels array with the label data
    setSelectedLabels((prevLabels) => {
      const newLabels = [...prevLabels];
      newLabels[index] = file;
      return newLabels;
    });
  };

  function formatDate(isoString) {
    const date = new Date(isoString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    return date.toLocaleString('en-US', options);
  }

  const requestData = {
    bookingObjId: bookingObjId,
  };

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const responce = await axios.post(
          'https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/upcomingAppointmentsById',
          requestData
        );
        console.log(requestData, 'urls');
        setGatData(responce.data.response);
        console.log(responce.data.response, 'data fetch in upcomig');
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchDataById();
  }, []);

  const handleCompleteService = () => [setShowCompleteModal(true)];

  const handleSubmit = async () => {
    // Create an instance of FormData
    const formData = new FormData();

    // Append non-file fields to FormData
    formData.append('bookingId', bookingObjId);
    formData.append('status', 'completed');
    formData.append('description', description);

    // Assuming selectedLabels is an array of file objects
    selectedLabels.forEach((file) => {
      formData.append('serviceImages', file);
    });
    try {
      const response = await axios.post(
        'https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/completeService',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data);
      toast.success(response.data.message);
      navigate('/home');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleNaviaget = () => {
    navigate('/chat');
  };

  return (
    <>
      <div className=" ">
        <Wrapper title={'Upcoming Service'}>
          <div className="relative overflow-x-auto bg-white scrollbar-thumb-[#c7d6df] scrollbar-thin scrollbar-track-gray-100 xl:h-[calc(100vh-180px)] h-[calc(100vh-100px)] xl:pb-0 pb-5 no-scrollbar shadow-sm rounded-bl-[10px] rounded-br-[10px]">
            
            <div className=" border-b py-4 px-10 flex justify-between items-center">
              <p className="ext-[#333333] font-semibold text-base ">
                Information 
              </p>
              <button
                onClick={handleNaviaget}
                className="border-2 border-[#4ab500] rounded-lg px-4 py-2 text-[10px] flex  items-center gap-2 text-[#4ab500] font-semibold"
              >
                <BsChatLeftText size={15} style={{ color: '#4ab500' }} /> Chat
                Now
              </button>
            </div>
            <div className="p-10 xl:flex justify-between xl:gap-7">
              <div className="flex flex-col w-full">
                <p className="font-semibold text-[#505051]">Customer Name</p>
                <input
                  className="py-3 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
                  type="text"
                  value={getData?.customerName}
                  placeholder="customer name"
                />
              </div>
              <div className="flex flex-col w-full">
                <p className="font-semibold text-[#505051]">Service Name</p>
                <input
                  className="py-3 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
                  type="text"
                  value={getData?.serviceName}
                  placeholder="service name"
                />
              </div>

              <div className="flex flex-col w-full">
                <p className="font-semibold text-[#505051]">Booked On</p>
                <input
                  className="py-3 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
                  type="text"
                  value={formatDate(getData?.bookingOn)}
                  placeholder="booked on"
                />
              </div>

              <div className="flex flex-col w-full">
                <p className="font-semibold text-[#505051]">Completed On</p>
                <input
                  className="py-3 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
                  type="text"
                  value={formatDate(getData?.scheduledOn)}
                  placeholder="completed on"
                />
              </div>
            </div>

            {/* second */}
            <div className="px-10 xl:flex justify-between xl:gap-7">
              <div className="flex flex-col w-full">
                <p className="font-semibold text-[#505051]">Category</p>
                <input
                  className="py-3 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
                  type="text"
                  value={getData?.category}
                  placeholder="category"
                />
              </div>
              <div className="flex flex-col w-full">
                <p className="font-semibold text-[#505051]">Total Lot Size</p>
                <input
                  className="py-3 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
                  type="text"
                  value={getData?.totalSize}
                  placeholder=""
                />
              </div>

              <div className="flex flex-col w-full">
                <p className="font-semibold text-[#505051]">Sq Ft Size</p>
                <input
                  className="py-3 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
                  type="text"
                  value={getData?.lotSize}
                  placeholder=""
                />
              </div>

              <div className="flex flex-col w-full">
                <p className="font-semibold text-[#505051]">Price</p>
                <input
                  className="py-3 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
                  type="text"
                  value={getData?.price}
                  placeholder="price"
                />
              </div>
            </div>

            <div className="px-10 pt-7">
              <p className="text-[#595858] font-semibold text-sm ">
                Additional Info
              </p>
              <textarea
                className="w-full border rounded-lg h-20 text-sm p-4 "
                value={getData?.description}
                placeholder="Type Something..."
              ></textarea>
            </div>

            <hr className="h-px mx-10 my-6 bg-gray-500 border-0 " />

            <div className="px-10 flex justify-end items-center">
              <button
                className="csm:w-48 w-28 rounded-lg csm:h-12 h-8 bg-[#4ab500] flex justify-center items-center gap-1"
                onClick={handleCompleteService}
              >
                <p className="sm:text-base text-xs font-semibold text-white">
                  Complete Service
                </p>
              </button>
            </div>
          </div>
        </Wrapper>
      </div>

      {/* Modal */}
      {showCompleteModal ? (
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
              <div className="relative w-full max-w-xl  py-4 p-2 mx-auto bg-white rounded-md shadow-lg ">
                <div
                  className="absolute right-8 top-5 text-lg text-gray-400 cursor-pointer"
                  onClick={() => setShowCompleteModal(false)}
                >
                  <AiOutlineClose />
                </div>
                <div className="mt-2 sm:flex flex-col">
                  <div className="mt- text-cente sm:ml-4 sm:text-left">
                    <h4 className="text-lg font-bold ">Complete Service</h4>
                    <hr className="h-px my-6 bg-gray-300 border-0 " />

                    <div className="  -mt-2 md:pr-3.5">
                      <p className="text-[#595858] font-semibold text-sm">
                        Service Description
                      </p>
                      <textarea
                        className="w-full border rounded-lg h-20 text-sm p-4 mt-2 "
                        // value={getData?.employeeReview?.description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Type Something..."
                      ></textarea>
                    </div>

                    <div className="flex flex-col w-full pt-8 p-">
                      <p className="font-semibold text-[#000000] text-sm ">
                        Service Images{' '}
                        <span className="text-xs text-[#b5b5b8]">
                          ( 6 images only )
                        </span>
                      </p>
                      <div className="flex items-center md:gap-10 gap-3 flex-wrap mt-5 md:justify-between md:pr-5">
                        {selectedLabels.map((label, index) => (
                          <label
                            key={index}
                            className="md:w-32 md:h-32 w-24 h-24 rounded-xl border-dashed border-2 border-gray-500 flex flex-col items-center justify-center cursor-pointer"
                          >
                            <div className="w-full h-full flex flex-col items-center justify-center">
                              {label ? (
                                <img
                                  src={URL.createObjectURL(label)}
                                  alt={`Selected Image ${index}`}
                                  className="w-full h-full object-cover rounded-xl"
                                />
                              ) : (
                                <AiOutlinePlus className=" text-xl hover:text-gray-700" />
                              )}
                            </div>
                            <input
                              type="file"
                              multiple
                              name="upload image"
                              accept="image/*"
                              className="w-0 h-0"
                              onChange={(event) =>
                                handleImageChange(event, index)
                              }
                            />
                          </label>
                        ))}
                      </div>
                      <hr className="h-px my-8 bg-gray-200 border-0 " />
                    </div>
                  </div>

                  <div className="gap-2  sm:flex justify-between  px-5 ">
                    <button
                      className="px-6 py-2 uppercase text-sm font-semibold  text-[#4ab500] bg-[#f6f6f6] rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                      onClick={() => set(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-6 py-2 uppercase text-sm font-semibold text-white bg-[#4ab500] rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                      onClick={handleSubmit}
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
    </>
  );
};

export default UpcomingService;