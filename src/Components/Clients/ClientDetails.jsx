import React, { useState } from 'react';
import Wrapper from '../Wrapper';
import AppoinmentHome from '../Appointments/AppoinmentHome';
import ClientPending from './ClientPending';
import ClientUpcoming from './ClientUpcoming';
import ClientCompleted from './ClientCompleted';
import { useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import CircularProgress from '@mui/material/CircularProgress';

function extractInitials(fullName) {
  const nameArray = fullName.split(' ');

  const firstInitial = nameArray[0].charAt(0).toUpperCase();
  const lastInitial = nameArray[nameArray.length - 1].charAt(0).toUpperCase();

  // Return the initials as a string
  return `${firstInitial}${lastInitial}`;
}

const ClientDetails = () => {
  const [status, setStatus] = useState('pending');

  const [clientDetails, setClientDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    setLoading(true);
    const clientId = localStorage.getItem('clientId');

    // console.log("clientId", clientId);
    const requestData = {
      userId: clientId,
    };
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/clientDetailsByID',
          requestData
        );
        const data = response.data;
        // console.log(response.data);
        setClientDetails(response.data?.response);
        setLoading(false);
      } catch (error) {
        console.error('error', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('data1', clientDetails);
  }, [clientDetails]);

  //upload profile image
  const handleImageChange = (e) => {
    // Assuming you want to handle image upload and show it in UI
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageData(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const deleteImages = (imageURL) => {
    setImageData(null);
  };

  return (
    <Wrapper title={'Clients'}>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <CircularProgress color="primary" />
        </div>
      ) : (
        <div className=" relative   w-full fle  justify-between items-center  overflow-y-scroll h-[calc(100%-1px)] no-scrollbar ">
          <div className="w-full h-[427px bg-white">
            {/* <div className=' min-h-[453px]   justify-around  p-3 px-8 flex flex-col '> */}
            <div className="   justify-around  p-3 md:px-8 flex flex-col ">
              <div className="grid grid-cols-1  lg:grid-cols-10 gap-10">
                <div className="2xl:w-[197px] w-[175px] 2xl:h-[197px] h-[180px] lg:col-span-2 bg-[#F5F5F5] rounded-[10px] relative">
                  {loading ? (
                    <div className="w-full h-full ">
                      <CircularProgress color="primary" />
                    </div>
                  ) : (
                    <>
                      {!imageData ? (
                        <>
                          <label className="cursor-pointer block w-full h-full">
                            <input
                              type="file"
                              className="w-0 h-0"
                              onChange={handleImageChange}
                            />
                            <span className="flex justify-center items-center h-full text-center text-gray-800">
                              {extractInitials(
                                `${clientDetails.firstName} ${clientDetails.lastName} `
                              )}
                            </span>
                          </label>
                        </>
                      ) : (
                        <>
                          {imageData && (
                            <div>
                              <img
                                className="2xl:w-[197px] w-[175px] 2xl:h-[197px] h-[180px] object-cover"
                                src={imageData}
                                alt="Selected"
                              />
                              <button
                                type="button"
                                className="absolute bottom-3 right-3 p-3 rounded-full bg-green-400 
                              text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out "
                                onClick={deleteImages}
                              >
                                <MdDelete className="text-white" />
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>

                <div className=" lg:col-span-8  flex  gap-1 flex-col justify-around  ">
                  <h1 className="text-2xl font-bold mb-4 pl-4">
                    {clientDetails.firstName} {clientDetails.lastName}
                  </h1>
                  <p className="text-sm text-[#6B7280] pl-3">
                    Added on{' '}
                    {new Date(clientDetails.updatedAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-3 lg:flex-row flex-col">
                    <div className="w-[45%] mb-2 ml-3 md:flex flex-col">
                      <label
                        htmlFor=""
                        className="text-[#9CA3AF] text-xs ml-1  font-medium"
                      >
                        First Name
                      </label>
                      <input
                        value={clientDetails.firstName}
                        type="text"
                        className="lg:w-full h-[54px] border     rounded-[10px] border-[#F5F5F5] bg-[#F6F6F6]  focus:outline-none px-4 placeholder:text-xs "
                        placeholder="First  Name"
                      />
                    </div>
                    <div className="w-[45%] mb-2 pl-3 md:flex flex-col">
                      <label
                        htmlFor=""
                        className="text-[#9CA3AF] text-xs ml-1   font-medium"
                      >
                        Last Name
                      </label>
                      <input
                        value={clientDetails.lastName}
                        type="text"
                        className="lg:w-full h-[54px] border  rounded-[10px] border-[#F5F5F5] bg-[#F6F6F6] focus:outline-none px-4 placeholder:text-xs "
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 lg:flex-row flex-col">
                    <div className="w-[45%] mb-2 pl-3 md:flex flex-col">
                      <label
                        htmlFor=""
                        className="text-[#9CA3AF] text-xs    font-medium"
                      >
                        Email
                      </label>
                      <input
                        value={clientDetails.email}
                        type="text"
                        className="lg:w-full h-[54px] border  rounded-[10px] border-[#F5F5F5] bg-[#F6F6F6] focus:outline-none px-4 placeholder:text-xs "
                        placeholder="Email"
                      />
                    </div>
                    <div className="w-[45%] mb-2 pl-3 md:flex flex-col">
                      <label
                        htmlFor=""
                        className="text-[#9CA3AF] text-xs    font-medium"
                      >
                        Phone Number
                      </label>
                      <input
                        value={`${clientDetails?.phoneNumber?.dialCode} ${clientDetails?.phoneNumber?.number}`}
                        type="text"
                        className="lg:w-full h-[54px] border  rounded-[10px] border-[#F5F5F5] bg-[#F6F6F6] focus:outline-none px-4 placeholder:text-xs "
                        placeholder="+91 6847875875"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 lg:flex-row flex-col">
                    <div className="w-[45%] mb-2 ml-3 md:flex flex-col">
                      <label
                        htmlFor=""
                        className="text-[#9CA3AF] text-xs ml-1   font-medium"
                      >
                        Adress
                      </label>
                      <input
                        value={clientDetails.location?.address}
                        type="text"
                        className="lg:w-full h-[54px] border     rounded-[10px] border-[#F5F5F5] bg-[#F6F6F6] focus:outline-none px-4 placeholder:text-xs "
                        placeholder="Address"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className=" flex flex-col lg:flex-row lg:justify-between ">
              <div className="">
                <p className="text-[22px] font-semibold text-[#333333] mt-4 mb-4">
                  Clients Bookings
                </p>
              </div>
            </div>
            <div className=" w-full  rounded-md overflow-y-scroll">
              <div className=" h-[60px]  border-b w-full flex items-center px-7 gap-11 shadow-sm bg-white rounded-tl-[10px] rounded-tr-[10px] ">
                <div
                  onClick={() => setStatus('pending')}
                  className="relative cursor-pointer "
                >
                  <p
                    className={`font-semibold ${
                      status == 'pending' ? 'text-[#4AB500] ' : 'text-[#828282]'
                    } `}
                  >
                    Pending
                  </p>{' '}
                  {status == 'pending' && (
                    <div className="absolute -bottom-4 w-[130%] rounded-tl rounded-tr -left-1  h-1 z-10 bg-[#4AB500]">
                      {' '}
                    </div>
                  )}{' '}
                </div>
                <div
                  onClick={() => setStatus('upcoming')}
                  className="relative cursor-pointer"
                >
                  <p
                    className={`font-semibold ${
                      status == 'upcoming'
                        ? 'text-[#4AB500] '
                        : 'text-[#828282]'
                    } `}
                  >
                    Upcoming
                  </p>{' '}
                  {status == 'upcoming' && (
                    <div className="absolute -bottom-4 w-[130%] rounded-tl rounded-tr -left-1  h-1 z-10 bg-[#4AB500]">
                      {' '}
                    </div>
                  )}
                </div>
                <div
                  onClick={() => setStatus('completed')}
                  className="relative cursor-pointer"
                >
                  <p
                    className={`font-semibold ${
                      status == 'completed'
                        ? 'text-[#4AB500] '
                        : 'text-[#828282]'
                    } `}
                  >
                    Completed
                  </p>
                  {status == 'completed' && (
                    <div className="absolute -bottom-4 w-[130%] rounded-tl rounded-tr -left-1  h-1 z-10 bg-[#4AB500]">
                      {' '}
                    </div>
                  )}{' '}
                </div>
              </div>
              <div>
                {status == 'pending' && <ClientPending />}
                {status == 'upcoming' && <ClientUpcoming />}
                {status == 'completed' && <ClientCompleted />}
              </div>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default ClientDetails;
