import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeProvider } from '@emotion/react';
import { CircularProgress, Pagination } from '@mui/material';
import { BiPlus } from 'react-icons/bi';
import { ImSearch } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import tableimg from '../../assets/tableImg.png';
import { districtCategories_List } from '../../utils/data';
import { MdCloudUpload } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { toast } from 'react-toastify';

const AddService = ({ setShowSaveService }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [addData, setAddData] = useState(null);

  const [addCategory, setAddCategory] = useState('');
  const [addServiceName, setAddServiceName] = useState('');
  const [addDuration, setAddDuration] = useState('');
  const [addPrice, setAddPrice] = useState('');
  const [addPrice2, setAddPrice2] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);

  const bookingId = localStorage.getItem('bookingId');
  const requestData = {
    bookingObjId: bookingId,
  };

  // console.log(
  //   '🚀 ~ file: AddService.jsx:37 ~ AddService ~ selectedCategoryId:',
  //   selectedCategoryId
  // );

  useEffect(() => {
    const apiUrl =
      'https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/getCategoriesList';
    axios
      .get(apiUrl)
      .then((response) => {
        setCategories(response.data.response);
        console.log(
          '🚀 ~ file: AddService.jsx:43 ~ .then ~ response:',
          response
        );
      })
      .catch((error) => {
        console.error('Error fetching categories: ', error);
      });
  }, []);

  useEffect(() => {
    // Fetch services based on currentPage and itemsPerPage
    const apiUrl = `https://your-services-api-endpoint?page=${currentPage}&perPage=${itemsPerPage}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setServices(response.data.servicesList.services);
      })
      .catch((error) => {
        console.error('Error fetching services: ', error);
      });
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // add service
  const selectedCategory = categories?.find((c) => c.name === addCategory);
  console.log(
    '🚀 ~ file: AddService.jsx:82 ~ AddService ~ selectedCategory:',
    selectedCategory
  );
  const handleAddService = async () => {
    setLoading(true);
    const serviceData = () => {
      const formData = new FormData();

      formData.append('categoryId', selectedCategory.id);
      formData.append('name', addServiceName);
      formData.append('description', addDescription);
      formData.append('images', selectedImage1);
      formData.append('images', selectedImage2);

      if (addCategory === 'Lawn Services' || addCategory === 'Fertilization') {
        formData.append('price.amountPerSqFt', +addPrice);
      } else if (
        addCategory === 'Power Washing' ||
        addCategory === 'Ranking Leaves'
      ) {
        formData.append('price.amountPerSqFt', +addPrice);
      } else if (
        addCategory === 'Trimming & Pruning' ||
        addCategory === 'Muluch Services'
      ) {
        formData.append('amountPerShrub', +addPrice);
        formData.append('amountPerTree', +addPrice2);
      }

      return formData;
    };

    try {
      const response = await axios.post(
        'https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/addServices',
        serviceData()
      );
      setAddData(response.data.response, 'akr');
      console.log('getData', addData);
      toast.success('Service added successfully');
      setShowSaveService(false);
    } catch (error) {
      toast.error('Service already exist');
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  //selected image
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Assuming you only allow a single image to be selected
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage1(file);
    }
  };

  const handleImageUpload2 = (event) => {
    const file = event.target.files[0]; // Assuming you only allow a single image to be selected
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage2(file);
    }
  };

  const priceSection = () => {
    if (
      addCategory === 'Lawn Services' ||
      addCategory === 'Ranking Leaves' ||
      addCategory === 'Fertilization'
    ) {
      return (
        <div className="flex flex-col w-full">
          <p className="font-semibold text-[#505051]">Price per sq ft</p>
          <input
            className="py-3.5 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
            type="number"
            placeholder="price per sq ft"
            value={addPrice}
            onChange={(e) => setAddPrice(e.target.value)}
          />
        </div>
      );
    } else if (addCategory === 'Power Washing') {
      return (
        <div className="flex flex-col w-full">
          <p className="font-semibold text-[#505051]">Price</p>
          <input
            className="py-3.5 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
            type="number"
            placeholder="price"
            value={addPrice}
            onChange={(e) => setAddPrice(e.target.value)}
          />
        </div>
      );
    } else if (
      addCategory === 'Trimming & Pruning' ||
      addCategory === 'Muluch Services'
    ) {
      return (
        <div className="flex flex-col w-full">
          <p className="font-semibold text-[#505051]">Price per shrub</p>
          <input
            className="py-3.5 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
            type="number"
            placeholder="price"
            value={addPrice}
            onChange={(e) => setAddPrice(e.target.value)}
          />
        </div>
      );
    }
  };
  const otherSection = () => {
    if (
      addCategory === 'Trimming & Pruning' ||
      addCategory === 'Muluch Services'
    ) {
      return (
        <div className="flex flex-col w-full">
          <p className="font-semibold text-[#505051]">Price per tree</p>
          <input
            className="py-3.5 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
            type="number"
            placeholder="price"
            value={addPrice2}
            onChange={(e) => setAddPrice2(e.target.value)}
          />
        </div>
      );
    }
  };

  console.log('category', addCategory);

  return (
    <>
      <div className="xl:mx-10 relative">
        <div className=" relative h-[69px]   border-b-2 w-full flex  justify-between items-center csm:px-7  shadow-sm bg-white  ">
          <h1 className="text-xl font-semibold ">Service Information</h1>
        </div>
        {loading && (
          <div className="h-full w-full z-10 flex items-center justify-center absolute top-0 bottom-0 left-0 right-0 ">
            <CircularProgress color="primary" />
          </div>
        )}
        <div className="relative overflow-x-auto  bg-white   scrollbar-thumb-[#c7d6df] no-scrollbar scrollbar-thin scrollbar-track-gray-100 h-[calc(100vh-220px)] no-scrollbar shadow-sm rounded-bl-[10px] rounded-br-[10px] ">
          <div className=" overflow-x-auo  bg-white px-10   ">
            <section className="flex sxl:flex-row flex-col justify-between gap-7 pt-9 ">
              <div className="flex sm:flex-row flex-col  justify-between items-center w-full gap-6">
                <div className="flex flex-col w-full ">
                  <p className="font-semibold text-[#505051]">Category</p>

                  <select
                    className="py-3.5 border lg:w60 rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700"
                    value={addCategory}
                    onChange={(e) => setAddCategory(e.target.value)}
                  >
                    <option value="other" className="text-sm">
                      Select
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.name}
                        disabled={!category.hasMultipleServices}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col w-full">
                  <p className="font-semibold text-[#505051]">Service Name</p>
                  <input
                    className="py-3.5 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-3 text-gray-700 "
                    type="text"
                    placeholder="service name"
                    value={addServiceName}
                    onChange={(e) => setAddServiceName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex  justify-between items-center w-full gap-6 sm:flex-row flex-col">
                {priceSection()}

                {otherSection()}
              </div>
            </section>
            <div className="flex flex-col w-full pt-8">
              <p className="font-semibold text-[#505051]">Description</p>
              <textarea
                className="py-4 border   rounded-md border-[#CCCCCC] bg-white relative p mt-2 outline-none pl-5 text-gray-700 "
                type="text"
                placeholder="Type something..."
                value={addDescription}
                onChange={(e) => setAddDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full pt-8">
              <p className="font-semibold text-[#000000] text-lg">
                Service Images{' '}
                <span className="text-xs text-[#b5b5b8]">
                  ( 6 images only )
                </span>
              </p>
              <div className="flex items-center md:gap-10 gap-3">
                <label className="md:w-36 md:h-36 w-28 h-28 rounded-xl border-dashed border-2 border-gray-500 flex flex-col items-center justify-center cursor-pointer mt-5">
                  {!selectedImage1 ? (
                    <>
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <AiOutlinePlus className=" text-xl hover:text-gray-700 " />
                      </div>
                      <input
                        type="file"
                        multiple
                        name="upload image"
                        accept="image/*"
                        className="w-0 h-0"
                        onChange={handleImageUpload}
                      />
                    </>
                  ) : (
                    <>
                      {selectedImage1 && (
                        <img
                          src={URL.createObjectURL(selectedImage1)}
                          alt="Selected Image"
                          className="w-36 h-36 rounded-xl"
                        />
                      )}
                    </>
                  )}
                </label>

                <label className="md:w-36 md:h-36 w-28 h-28 rounded-xl border-dashed border-2 border-gray-500 flex flex-col items-center justify-center cursor-pointer mt-5">
                  {!selectedImage2 ? (
                    <>
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <AiOutlinePlus className=" text-xl hover:text-gray-700 " />
                      </div>
                      <input
                        type="file"
                        multiple
                        name="upload image"
                        accept="image/*"
                        className="w-0 h-0"
                        onChange={handleImageUpload2}
                      />
                    </>
                  ) : (
                    <>
                      {selectedImage2 && (
                        <img
                          src={URL.createObjectURL(selectedImage2)}
                          alt="Selected Image"
                          className="w-36 h-36 rounded-xl"
                        />
                      )}
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
          <hr className="h-px mt-16 mb-5 mx-10 bg-gray-400 border-1 "></hr>
          <div className="flex justify-end px-10 pb-7">
            <button
              className="csm:w-36 w-28 rounded-lg csm:h-12 h-8 bg-[#4ab500] flex justify-center items-center gap-1"
              onClick={handleAddService}
            >
              <p className="text-base font-semibold text-white">Add Service</p>
            </button>
          </div>
        </div>
      </div>
      {!loading && (
        <>
          <div className="flex flex-col w-full pt-8">
            {/* <p className="font-semibold text-[#505051]">Services List</p> */}
            <ul>
              {services.map((service) => (
                <li key={service.serviceId}>
                  {service.name}: {service.description}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center mt-3">
            <Pagination
              count={Math.ceil(services.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
};

export default AddService;
