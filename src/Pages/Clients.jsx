import React, { useState, useEffect } from 'react';
import Wrapper from '../Components/Wrapper';
import { ImSearch } from 'react-icons/im';
import tableimg from '../assets/tableImg.png';
import favicon from '../assets/star_black_24dp 1.svg';
import { LuMoreHorizontal } from 'react-icons/lu';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AiOutlineEye } from 'react-icons/ai';
import { BiBlock } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import axios from 'axios';
import Pagination from '../Components/paginatoin/Pagination';

function extractInitials(fullName) {
  const nameArray = fullName.split(' ');

  const firstInitial = nameArray[0].charAt(0).toUpperCase();
  const lastInitial = nameArray[nameArray.length - 1].charAt(0).toUpperCase();

  // Return the initials as a string
  return `${firstInitial}${lastInitial}`;
}

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [dropdown, setDropdown] = useState({ status: false, index: '' });
  const [paginationData, setPaginationData] = useState({
    total: 0,
    perPage: 10,
    currentPage: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // Step 2
  const [filteredServices, setFilteredServices] = useState([]);
  const [services, setServices] = useState([]);

  const [postsPerPage, setPostPerPage] = useState(5);
  const [currentpage, setCurrentPage] = useState(1);
  console.log('currentPage', currentpage);

  const lastPostIndex = currentpage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredServices.slice(firstPostIndex, lastPostIndex);
  const npage = Math.ceil(filteredServices.length / postsPerPage);
  const [currentPost, setCurrentPosts] = useState([]);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4AB500',
      },
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/clientsDetails?page=${paginationData.currentPage}&perPage=${paginationData.perPage}`
        );

        const updatedServices = response.data.response.clientsDetails;
        setServices(updatedServices);

        const filtered = updatedServices.filter((service) =>
          service.firstName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setPaginationData((prevPaginationData) => ({
          ...prevPaginationData,
          total: filtered.length,
          totalPages: Math.ceil(filtered.length / prevPaginationData.perPage),
        }));

        const updatedCurrentPosts = filtered.slice(
          firstPostIndex,
          lastPostIndex
        );
        setCurrentPage(1);
        setCurrentPosts(updatedCurrentPosts);
        setFilteredServices(filtered);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [paginationData.currentPage, paginationData.perPage, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = services.filter((service) =>
        service.firstName.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setPaginationData((prevPaginationData) => ({
        ...prevPaginationData,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / prevPaginationData.perPage),
      }));

      const updatedCurrentPosts = filtered.slice(firstPostIndex, lastPostIndex);
      setCurrentPage(1);
      setCurrentPosts(updatedCurrentPosts);
      setFilteredServices(filtered);
    } else {
      setFilteredServices(services);
    }
  }, [searchQuery, services, currentpage, postsPerPage]);

  const handleDetails = (clientId) => {
    navigate(`/clients/${clientId}`);
    localStorage.setItem('clientId', clientId);
  };

  const setCurrentPageAndResetSearch = (page) => {
    setSearchQuery(''); // Reset the search query
    setCurrentPage(page);
  };

  console.log('currentPosts', currentPosts);

  return (
    <Wrapper title={'Clients'}>
      <h1 className="text-2xl font-semibold  xl:hidden pb-6 ">Clients</h1>
      <div className="h-full w-full rounded-md ">
        <div className=" relative h-[60px]  border-b w-full flex items-center px-7 gap- 11 shadow-sm bg-white rounded-tl-[10px] rounded-tr-[10px] ">
          <input
            type="text"
            className="md:w-[300px] w-40 h-9 text-xs px-9 bg-[#FCFCFC] border focus:outline-none rounded-[10px] border-[#E0E0E0] "
            placeholder="Search by name"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute text-[#BDBDBD]  left-10 top-[1.35rem]">
            <ImSearch size={18} />
          </span>
        </div>

        <div className="">
          <div className="relative overflow-x-auto  bg-white   scrollbar-thumb-[#c7d6df] scrollbar-thin scrollbar-track-gray-100 xl:h-[calc(100vh-220px)] h-[calc(100vh-240px)] no-scrollbar shadow-sm rounded-bl-[10px] rounded-br-[10px]">
            {loading ? ( // Display CircularProgress while loading
              <div className="w-full h-full flex items-center justify-center">
                <CircularProgress color="primary" />
              </div>
            ) : (
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-[#828282] uppercase bg-gray-50 h-[60px]">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Names
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Services
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentPosts.map((client, index) => (
                    <tr key={client.id} className="bg-white border-b">
                      <td
                        scope="row"
                        className="px-6 py-4 font-semibold flex items-center gap-3 text-[#333333] whitespace-nowrap"
                      >
                        <div className="relative">
                          {/* <img
                            src={client.img}
                            className="w-[50px] h-[50px] rounded-[4.86px]"
                            alt={client.firstName}
                          /> */}
                          <p
                            style={{
                              border: '1px solid grey',
                              padding: '10px',
                              display: 'inline-block',
                              borderRadius: '5px',
                            }}
                          >
                            {extractInitials(
                              client?.firstName + ' ' + client.lastName
                            )}
                          </p>
                        </div>
                        <div className=" flex flex-col ">
                          <p>
                            {client.firstName} {client.lastName}
                          </p>
                        </div>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap"
                      >
                        {client.email}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap"
                      >
                        {client.phoneNumber.dialCode}{' '}
                        {client.phoneNumber.number}
                      </td>
                      <td
                        scope="row"
                        className="px-6 text-center py-4 font-semibold text-[#333333] whitespace-nowrap"
                      >
                        {client.totalServices}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap"
                      >
                        <div className="relative">
                          <LuMoreHorizontal
                            onClick={() =>
                              setDropdown({
                                status: !dropdown.status,
                                index: index,
                              })
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
                                // onClick={() => navigate("/client-details")}
                                onClick={() => handleDetails(client?.id)}
                                className="flex p-1  items-center justify-center gap-3"
                              >
                                <span>
                                  {' '}
                                  <AiOutlineEye
                                    className=" text-black cursor-pointer"
                                    size={20}
                                  />
                                </span>
                                <span className="font-semibold text-sm text-[#4f4f4f]">
                                  View Details
                                </span>
                              </div>
                              <div className="w-full h-px opacity-100 bg-zinc-100 rounded-md shadow" />
                              {/* <div className=" p-1 flex items-center justify-start gap-3">
                                <span>
                                  {" "}
                                  <BiBlock
                                    className=" text-black cursor-pointer"
                                    size={20}
                                  />
                                </span>
                                <span className="font-semibold text-sm text-[#4f4f4f]">
                                  Block
                                </span>
                              </div> */}
                            </motion.div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="w-full h-14 flex items-center justify-between">
            <div className="text-xs font-normal text-[#49B400]">
              {/* Showing{" "}
              {paginationData.currentPage === 1
                ? 1
                : (paginationData.currentPage - 1) * paginationData.perPage +
                1}{" "}
              to{" "}
              {Math.min(
                paginationData.currentPage * paginationData.perPage,
                paginationData.total
              )}{" "}
              of {paginationData.total} */}
              <div className="text-xs font-normal text-[#49B400]">
                {/* Showing 1 to {currentPosts.length} of {services.length} */}
                Showing {firstPostIndex + 1} to{' '}
                {currentpage === 1
                  ? lastPostIndex
                  : currentpage === 2
                  ? lastPostIndex
                  : ''}{' '}
                of {services.length}
              </div>
            </div>
            <div>
              <ThemeProvider theme={theme}>
                <Pagination
                  totalPosts={filteredServices.length}
                  postsPerPage={postsPerPage}
                  setCurrentPage={setCurrentPageAndResetSearch}
                  currentPage={currentpage}
                  lastPostIndex={lastPostIndex}
                  npage={npage}
                />
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Clients;
