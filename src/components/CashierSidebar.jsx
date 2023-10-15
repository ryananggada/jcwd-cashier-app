import React from "react";
import { MdDashboard, MdLogout } from "react-icons/md";
import { GoGear } from "react-icons/go";
import { MdOutlineInventory2 } from "react-icons/md";
import { PiCalculatorThin } from "react-icons/pi";
import { GrPowerCycle } from "react-icons/gr";
import UserAvatar from "./Avatar";

const CashierSideBar = ({ onMenuItemClick }) => {
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
    <div className="flex bg-white shadow-md">
      <div className="w-72 h-screen p-5 pt-8 flex flex-col justify-between border-r ">
        <div>
          <div className="flex gap-x-4 items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/31/FamilyMart_Logo_%282016-%29.svg"
              alt="logo"
              className="cursor-pointer h-[70px] w-[160px] ml-[25px]"
            />
          </div>
          <div className="mt-8">
            <ul>
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-[#01AB52] text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
              >
                <MdDashboard className="h-[30px] w-[30px]" />
                <span className="p-2 rounded-md text-">Dashboard</span>
              </li>
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-[#01AB52] text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
              >
                <PiCalculatorThin className="h-[30px] w-[30px]" />
                <span className="p-2 rounded-md">Transaction</span>
              </li>
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-[#01AB52] text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
              >
                <MdOutlineInventory2 className="h-[30px] w-[30px]" />
                <span className="p-2 rounded-md">Inventory</span>
              </li>
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-[#01AB52] text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
                onClick={() => onMenuItemClick("Cashier")}
              >
                <GrPowerCycle className="h-[30px] w-[30px]" />
                <span className="p-2 rounded-md">Shift</span>
              </li>
              <li
                onClick={() => onMenuItemClick("Setting")}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-[#01AB52] text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
              >
                <GoGear className="h-[30px] w-[30px]" />
                <span className="p-2 rounded-md">Setting</span>
              </li>
              <li
                onClick={logoutHandler}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-[#01AB52] text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
              >
                <MdLogout className="h-[30px] w-[30px]" />
                <span className="p-2 rounded-md">Logout</span>
              </li>
            </ul>
          </div>
        </div>
        <UserAvatar />
      </div>
    </div>
  );
};

//   return (
//     <div className="flex">
//       <div className="w-72 h-screen p-5 pt-8 flex flex-col justify-between">
//         <div className="flex items-center">
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/3/31/FamilyMart_Logo_%282016-%29.svg"
//             alt="logo"
//             className={`cursor-pointer h-[80px] w-[160px] ml-[25px]`}
//           />
//         </div>
//         <div className="mt-8">
//           <ul className="pt-6">
//             <li
//               className={`flex rounded-md p-2 cursor-pointer hover:bg-[#01AB52] text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
//             >
//               <MdDashboard className="h-[30px] w-[30px]" />
//               <span
//                 className={`origin-left duration-200 p-2 rounded-md hover:text-white`}
//               >
//                 Dashboard
//               </span>
//             </li>
//             <li
//               className={`flex rounded-md p-2 cursor-pointer hover:bg-[#01AB52] text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
//             >
//               <PiCalculatorThin className="h-[30px] w-[30px]" />
//               <span
//                 className={`origin-left duration-200 p-2 rounded-md hover-text-white`}
//               >
//                 Transaction
//               </span>
//             </li>
//             <li
//               className={`flex rounded-md p-2 cursor-pointer hover:bg-[#01AB52] text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
//             >
//               <MdOutlineInventory2 className="h-[30px] w-[30px]" />
//               <span
//                 className={`origin-left duration-200 p-2 rounded-md hover-text-white`}
//               >
//                 Inventory
//               </span>
//             </li>
//             <li
//               className={`flex rounded-md p-2 cursor-pointer hover:bg-[#01AB52] text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
//             >
//               <GrPowerCycle className="h-[30px] w-[30px] hover:text-white" />
//               <span
//                 className={`origin-left duration-200 p-2 rounded-md hover-text-white`}
//               >
//                 Shift
//               </span>
//             </li>
//             <li
//               className={`flex rounded-md p-2 cursor-pointer hover:bg-[#01AB52] text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
//               onClick={() => onMenuItemClick("Setting")}
//             >
//               <GoGear className="h-[30px] w-[30px]" />
//               <span
//                 className={`origin-left duration-200 p-2 rounded-md hover-text-white`}
//               >
//                 Setting
//               </span>
//             </li>
//             <li
//               className={`flex rounded-md p-2 cursor-pointer hover:bg-[#01AB52] text-gray-600 text-sm items-center gap-x-4 mt-2 bg-light-white hover:text-white hover:bg-opacity-[90%] hover:rounded-lg`}
//               onClick={logoutHandler}
//             >
//               <MdLogout className="h-[30px] w-[30px]" />
//               <span
//                 className={`origin-left duration-200 p-2 rounded-md hover-text-white`}
//               >
//                 Logout
//               </span>
//             </li>
//           </ul>
//         </div>
//         <UserAvatar />
//       </div>
//     </div>
//   );
// };

export default CashierSideBar;
