import React, { useState, useEffect } from "react";
import Wrapper from "../Components/Wrapper";
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const HelpCenter = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/helpCenterDetails`
      )
      .then((response) => {
        const support = response.data.response.support;
        setFormData({
          name: support.name,
          email: support.email,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    if (isEditing) {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsClicked(true);

  };

  const handleSave = () => {
    setIsLoading(true);

    const updatePayload = {
      id: "6523ddae819c2d4625411d63",
      support: {
        name: formData.name,
        email: formData.email,
      },
    };

    axios
      .post(
        "https://yyig5rvvfp.us-east-1.awsapprunner.com/app/admin/updateHelpCenterDeatils",
        updatePayload
      )
      .then((response) => {
        toast.success(response.data.message);
        setIsEditing(false);
      })
      .catch((error) => {
        toast.error("Error updating data");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Wrapper title={"Help Center"}>
      <h1 className="text-2xl font-semibold  xl:hidden pb-6 ">Help Center</h1>

      <div className="w-full h-full bg-white grid lg:grid-cols-2 grid-cols-1">
        <div className=" h-96  p-3 px-8 flex flex-col justify-around">
          <div className=" flex flex-col lg:flex-row lg:justify-between">
            <div className="">
              <p className="text-[22px] font-semibold text-[#333333]">
                Contact Information
              </p>
              <p className="font-medium text-sm text-[#4F4F4F]">
                <span>Last Modified on :</span>
                <span>25 July, 2023 8:12 PM</span>
              </p>
            </div>
            <div className={`w-[48px] h-[48px] border-[#E0E0E0] border rounded-[10px] flex items-center justify-center ${isClicked ? "text-green-500" : ""}`} onClick={handleEdit}>
              <span>
                <MdOutlineModeEditOutline
                  size={20}
                  className={`text-[#BDBDBD] ${
                    isEditing ? "pointer-events-none" : ""
                  }`}
                />
              </span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5  grid-cols-1  ">
            <div className="w-full mb-2">
              <label
                htmlFor="name"
                className="text-[#9CA3AF] text-xs  font-medium"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full h-[54px] border  rounded-[10px] border-[#F5F5F5] bg-[#F6F6F6] focus:outline-none px-4 placeholder:text-xs "
                placeholder="Enter your name"
                disabled={!isEditing}
              />
            </div>
            <div className="w-full mb-2">
              <label
                htmlFor="email"
                className="text-[#9CA3AF] text-xs  font-medium"
              >
                Email{" "}
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full h-[54px] border  rounded-[10px] border-[#F5F5F5] bg-[#F6F6F6] focus:outline-none px-4 placeholder:text-xs "
                placeholder="Your Email"
                disabled={!isEditing}
              />
            </div>
          </div>
          <hr className=" bg-[#9CA3AF]" />
          <div className="w-full sm:justify-end flex">
            <button
              onClick={handleSave}
              className="px-5 py-3 rounded-[10px] font-semibold bg-[#49B400] text-white"
              disabled={!isEditing || isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Wrapper>
  );
};

export default HelpCenter;