import React from "react";
import { MdDashboard, MdLogout } from "react-icons/md";
import { GiCardboardBox } from "react-icons/gi";
import { VscGraphLine } from "react-icons/vsc";
import { BsFillPersonFill } from "react-icons/bs";
import { GoGear } from "react-icons/go";
import image1 from "../assets/familymartwhite svg.svg";
import UserAvatar from "./Avatar";

const AdminSideBar = ({ onMenuItemClick }) => {
  const logoutHandler = () => {
    localStorage.removeItem("token");

    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    window.location.href = "/";
  };

  return (
    <div className="flex bg-[#01AB52]">
      <div className="w-72 bg-dark-purple h-screen p-5 pt-8 flex flex-col justify-between">
        <div>
          <div className="flex gap-x-4 items-center">
            <img
              src={image1}
              alt="logo"
              className="cursor-pointer h-[60px] w-[130px] ml-[25px]"
            />
          </div>
          <div className="mt-8">
            <ul>
              <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-white hover:bg-opacity-10 hover:rounded-lg">
                <MdDashboard className="h-[30px] w-[30px]" />
                <span className="p-2 rounded-md">Dashboard</span>
              </li>
              <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-white hover:bg-opacity-10 hover:rounded-lg">
                <VscGraphLine className="h-[30px] w-[30px]" />
                <span className="p-2 rounded-md">Report</span>
              </li>
              <li className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-white hover:bg-opacity-10 hover:rounded-lg">
                <GiCardboardBox className="h-[30px] w-[30px]" />
                <span className="p-2 rounded-md">Product</span>
              </li>
              <li
                className="flex rounded-md p-2 cursor-pointer hover.bg-light-white text-white text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-white hover:bg-opacity-10 hover:rounded-lg"
                onClick={() => onMenuItemClick("Cashier")}
              >
                <BsFillPersonFill className="h-[30px] w-[30px]" />
                <span className="p-2 rounded-md">Cashier</span>
              </li>
              <li
                onClick={() => onMenuItemClick("Setting")}
                className="flex rounded-md p-2 cursor-pointer hover.bg-light-white text-white text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-white hover:bg-opacity-10 hover:rounded-lg"
              >
                <GoGear className="h-[30px] w-[30px]" />
                <span className="p-2 rounded-md">Setting</span>
              </li>
              <li
                onClick={logoutHandler}
                className="flex rounded-md p-2 cursor-pointer hover.bg-light-white text-white text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-white hover:bg-opacity-10 hover:rounded-lg"
              >
                <MdLogout className="h-[30px] w-[30px]" />
                <span className="p-2 rounded-md">Logout</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <UserAvatar />
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
