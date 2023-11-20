import { MdSpaceDashboard, MdAreaChart } from "react-icons/md";
import { FaTruck } from "react-icons/fa6";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";

export const SidebarData = [
  {
    title: "Appointments",
    icon: <MdSpaceDashboard size={25} />,
    path: "/home",
  },
  {
    title: "Clients",
    icon: <MdAreaChart size={20} />,
    path: "/clients",
  },
  {
    title: "Services",
    icon: <FaTruck size={20} />,
    path: "/services",
  },
  {
    title: "Chat",
    icon: <BsFillChatLeftDotsFill size={20} />,
    path: "/chat",
  },
  {
    title: "Reports",
    icon: <RiAdminFill size={20} />,
    path: "/reports",
  },
  {
    title: "Help Center",
    icon: <FiSettings size={20} />,
    path: "/help-center",
  },
  {
    title: "Settings",
    icon: <IoMdSettings size={20} />,
    path: "/settings",
  },
];
