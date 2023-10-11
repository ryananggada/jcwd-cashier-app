import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminControlPanel() {
  const navigate = useNavigate();
  const buttonRouter = (route) => {
    navigate(route);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Control Panel
        </h1>
      </div>
      <div>
        <button onClick={() => buttonRouter("/create-cashier")}>
          Create Cashier
        </button>
      </div>
    </>
  );
}
