import React, { useState, useEffect } from "react";
import CashierSidebar from "../components/CashierSidebar";
import UserSetting from "./UserSettings";
import { format } from "date-fns";

export default function CashierMenu() {
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  document.title = "Cashier Menu";

  return (
    <section className="flex flex-row bg-gray-100">
      <CashierSidebar onMenuItemClick={handleMenuItemClick} />
      <div className="">
        <div className="ml-[40px] mt-[20px]">
          <span className="text-lg font-bold text-black mr-[30px]">
            {format(currentTime, "HH:mm")}
          </span>
          <span className="text-lg text-black">
            {format(currentTime, "dd MMMM yyyy")}
          </span>
        </div>
        <div className="ml-[40px] mt-[10px]">
          {activeMenuItem === "Setting" ? <UserSetting /> : null}
        </div>
      </div>
    </section>
  );
}
