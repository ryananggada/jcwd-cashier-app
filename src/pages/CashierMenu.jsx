import React, { useState } from "react";
import CashierSidebar from "../components/CashierSidebar";
import UserSetting from "./UserSettings";

export default function CashierMenu() {
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <section className="flex flex-row">
      <CashierSidebar onMenuItemClick={handleMenuItemClick} />
      <div className="ml-[40px] mt-[40px]">
        {activeMenuItem === "Setting" ? <UserSetting /> : null}
      </div>
    </section>
  );
}
