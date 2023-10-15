import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import CashierControlPanel from "./CashierControlPanel";
import UserSetting from "./UserSettings";

export default function AdminMenu() {
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <section className="flex flex-row">
      <AdminSidebar onMenuItemClick={handleMenuItemClick} />
      <div className="ml-[40px] mt-[40px]">
        {activeMenuItem === "Cashier" ? <CashierControlPanel /> : null}
        {activeMenuItem === "Setting" ? <UserSetting /> : null}
      </div>
    </section>
  );
}
