import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { GiCardboardBox } from "react-icons/gi";
import { VscGraphLine } from "react-icons/vsc";
import { BsFillPersonFill } from "react-icons/bs";
import { FiArrowLeftCircle } from "react-icons/fi";
import UserAvatar from "./Avatar";

const App = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <FiArrowLeftCircle
          className={`absolute cursor-pointer -right-3 top-9 w-7 ${
            !open && "rotate-180 "
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/31/FamilyMart_Logo_%282016-%29.svg"
            alt="logo"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg] h-[60px] w-[130px] ml-[25px]"
            }`}
          />
        </div>
        <ul className="pt-6">
          <li
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-[#01AB52] text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
          >
            <MdDashboard className="h-[30px] w-[30px]" />
            <span
              className={`${
                !open && "hidden"
              } origin-left duration-200  p-2 rounded-md hover:text-white`}
            >
              Dashboard
            </span>
          </li>
          <li
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-[#01AB52] text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
          >
            <VscGraphLine className="h-[30px] w-[30px]" />
            <span
              className={`${
                !open && "hidden"
              } origin-left duration-200  p-2 rounded-md hover:text-white`}
            >
              Report
            </span>
          </li>
          <li
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-[#01AB52] text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
          >
            <GiCardboardBox className="h-[30px] w-[30px]" />
            <span
              className={`${
                !open && "hidden"
              } origin-left duration-200 p-2 rounded-md hover:text-white`}
            >
              Product
            </span>
          </li>
          <li
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-[#01AB52] text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
          >
            <BsFillPersonFill className="h-[30px] w-[30px]" />
            <span
              className={`${
                !open && "hidden"
              } origin-left duration-200 p-2 rounded-md hover:text-white`}
            >
              Cashier
            </span>
          </li>
        </ul>
        <UserAvatar />
      </div>
    </div>
  );
};

export default App;
