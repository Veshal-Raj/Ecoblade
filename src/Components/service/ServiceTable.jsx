import { useEffect } from 'react';
import tableimg from '../../assets/tableImg.png';
import favicon from '../../assets/star_black_24dp 1.svg';
import { LuMoreHorizontal } from 'react-icons/lu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress, Pagination } from '@mui/material';
import { AiOutlineEye } from 'react-icons/ai';
import { BiBlock } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ImSearch } from 'react-icons/im';
import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import AddService from './AddService';
import axios from 'axios';

const ServiceTable = () => {
  const [dropdown, setDropdown] = useState({ status: false, index: '' });
  const [categories, setCategories] = useState([]);

  const [showSaveService, setShowSaveService] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginationData, setPaginationData] = useState({
    total: 0,
    perPage: 10,
    currentPage: 1,
    totalPages: 1,
  });

  const [searchQuery, setSearchQuery] = useState(''); // Step 2
  const [filteredServices, setFilteredServices] = useState([]); // Step 3
  const [statusChangingStates, setStatusChangingStates] = useState({});

  const [totalData, setTotalData] = useState(0);
  const [filteredData, setfilteredData] = useState(0);

  const [postsPerPage, setPostPerPage] = useState(10);
  const [currentpage, setCurrentPage] = useState(1);

  const lastPostIndex = currentpage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const currentPosts = filteredServices.slice(firstPostIndex, lastPostIndex);
  const npage = Math.ceil(filteredServices.length / postsPerPage);


  useEffect(() => {
    setLoading(true);

    const apiUrl =
      `https://qdn2l2ng-5050.inc1.devtunnels.ms/app/admin/viewServiceList?page=${currentpage}&limit=${postsPerPage}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setServices(response.data.servicesList.services);
        setTotalData(response.data.servicesList.total)
        
        console.log(
          'response.data.servicesList.services',
          response.data.servicesList.services
        );
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  }, [currentpage, postsPerPage]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = services.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredServices(filtered);
      setfilteredData(filtered.length);
    } else {
      setFilteredServices(services);
      setfilteredData(totalData);
    }
  }, [searchQuery, services]);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4AB500',
      },
    },
  });
  const navigate = useNavigate();

  const handle_Add_Service = () => {
    setShowSaveService(true);
  };
  useEffect(() => {
    const apiUrl = '/app/admin/getCategoriesList';

    axios
      .get(apiUrl)
      .then((response) => {
        setCategories(response.data.response);
      })
      .catch((error) => {
        console.error('Error fetching categories: ', error);
      });
  }, []);

  const handleToggleStatus = async (service) => {
    // Set status changing state for the specific service to true
    setStatusChangingStates((prevStatusChangingStates) => ({
      ...prevStatusChangingStates,
      [service.serviceId]: true,
    }));

    const updatedServices = [...services];
    const serviceIndex = updatedServices.findIndex(
      (s) => s.serviceId === service.serviceId
    );

    if (serviceIndex !== -1) {
      const serviceToUpdate = updatedServices[serviceIndex];
      const newStatus = !serviceToUpdate.isEnabled;
      serviceToUpdate.isEnabled = newStatus;

      const payload = {
        serviceId: serviceToUpdate.serviceId,
        isEnabled: newStatus,
      };

      try {
        const response = await axios.post(
          'https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/updateStatus',
          payload
        );

        if (response.status === 200) {
          setServices(updatedServices);
        } else {
          console.error('API request failed');
        }
      } catch (error) {
        console.error('API request error:', error);
      } finally {
        setStatusChangingStates((prevStatusChangingStates) => ({
          ...prevStatusChangingStates,
          [service.serviceId]: false,
        }));
      }
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const filtered = services.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices(services);
    }
  }, [searchQuery, services]);
  return (
    <div>
      {showSaveService ? (
        <>
          <AddService setShowSaveService={setShowSaveService} />
        </>
      ) : (
        <div className="h-full w-full rounded-md  ">
          <h1 className="text-2xl font-semibold  xl:hidden pb-6 ">Service</h1>

          <div className=" relative h-[60px]   border-b w-full flex  justify-between items-center csm:px-7  shadow-sm bg-white rounded-tl-[10px] rounded-tr-[10px] ">
            <input
              type="text"
              className="md:w-[300px] w-40 h-9 text-xs px-9 bg-[#FCFCFC] border focus:outline-none rounded-[10px] border-[#E0E0E0] "
              placeholder="Search by name"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute text-[#BDBDBD]  csm:left-10 left-2 top-[1.35rem]">
              <ImSearch size={18} />
            </span>
            <button
              className="csm:w-32 w-24 rounded-xl csm:h-10 h-8 bg-[#4ab500] flex justify-center items-center gap-1"
              onClick={handle_Add_Service}
            >
              <BiPlus className="text-white csm:text-base text-[12px]" />
              <p className="csm:text-[11px] text-[10px] text-white">
                Add Service
              </p>
            </button>
          </div>
          <div className="">
            <div className="relative overflow-x-auto  bg-white   scrollbar-thumb-[#c7d6df] scrollbar-thin scrollbar-track-gray-100 h-[calc(100vh-220px)] no-scrollbar shadow-sm rounded-bl-[10px] rounded-br-[10px] ">
              {loading ? ( // Display CircularProgress while loading
                <div className="w-full h-full flex items-center justify-center">
                  <CircularProgress color="primary" />
                </div>
              ) : (
                <table className="w-full text-sm text-left text-gray-500  ">
                  <thead className="text-xs text-[#828282] uppercase bg-gray-50   h-[60px] ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Service
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-3 ">
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3  flex items-center justify-center h-full pt-6"
                      >
                        Category
                      </th>
                      <th scope="col" className="px-8  xl:pl-20  py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service, index) => (
                      <tr
                        key={service.serviceId}
                        className="bg-white border-b   "
                      >
                        <td
                          scope="row"
                          className="px-6 py-4 font-semibold flex  items-center  gap-3 text-[#333333] whitespace-nowrap "
                        >
                          <div className="relative">
                            <img
                              src={service.images[0]}
                              className="w-[50px] h-[50px] rounded-[4.86px] "
                              alt=""
                            />
                          </div>
                          <div className=" flex flex-col ">
                            <p>{service.name}</p>
                          </div>
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap "
                        >
                          45min
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap "
                        >
                          $
                          {service.price.amountPerSqFt ||
                            service.price.amountPerUnit}
                        </td>
                        <td
                          scope="row"
                          className="px-6 text-center py-4 font-semibold text-[#333333] whitespace-nowrap "
                        >
                          {service.category.name}
                        </td>
                        <td
                          scope="row"
                          className=" text-center py-4 font-semibold text-[#333333] whitespace-nowrap "
                        >
                          <button
                            className={`w-[90px] h-7 border rounded-[11px] font-light text-xs ${
                              service.isEnabled
                                ? 'border-green-600 bg-[#e9fff2] text-green-700'
                                : 'border-red-600 bg-[#ffeded] text-red-700'
                            }`}
                            onClick={() => handleToggleStatus(service)}
                            disabled={statusChangingStates[service.serviceId]} // Disable the button when the status is changing
                          >
                            {statusChangingStates[service.serviceId] ? (
                              <>
                                <svg
                                  aria-hidden="true"
                                  class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                  />
                                </svg>
                              </>
                            ) : service.isEnabled ? (
                              'Enable'
                            ) : (
                              'Disable'
                            )}
                          </button>
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-semibold text-[#333333] whitespace-nowrap  "
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
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="w-full  h-14 flex items-center justify-between">
              <div className="text-xs font-normal text-[#49B400]">
                {/* Showing {npage} to {currentPosts.length} of {services.length} */}
                {/* Showing {lastPostIndex}  of {services.length-5} */}
                Showing {firstPostIndex + 1} to {firstPostIndex+ postsPerPage} of {filteredData}
                {/* {services.length} */}
              </div>
              <div>
              <ThemeProvider theme={theme}>
                <Pagination
                  count={Math.ceil(filteredData / postsPerPage)}  // Use Math.ceil to ensure accurate page count
                  page={currentpage}
                  onChange={(event, value) => setCurrentPage(value)}
                  color="primary"
                  size="large"
                  npage={npage}
                />
              </ThemeProvider>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceTable;
