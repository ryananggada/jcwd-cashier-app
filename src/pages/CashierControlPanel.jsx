import React, { useState, useEffect } from "react";
import api from "../api";

export default function CashierControlPanel() {
  const [cashiers, setCashiers] = useState([]);
  const [newCashier, setNewCashier] = useState({
    username: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    api
      .get("/admin/cashiers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setCashiers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching cashiers", error);
      });
  }, []);

  const fetchCashiers = () => {
    api
      .get("/admin/cashiers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setCashiers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching cashiers", error);
      });
  };

  const handleCreateCashier = () => {
    api
      .post("/admin/new_cashier", newCashier, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setCashiers((prevCashiers) => [...prevCashiers, response.data.data]);
        setNewCashier({ username: "", password: "", name: "" });
      })
      .catch((error) => {
        console.error("Error creating cashier", error);
      });
  };

  const handleDeleteCashier = (username) => {
    api
      .delete(`/admin/delete_cashier/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setCashiers((prevCashiers) =>
          prevCashiers.filter((cashier) => cashier.username !== username)
        );
      })
      .catch((error) => {
        console.error("Error deleting cashier", error);
      });
  };

  const handleToggleCashierStatus = (username, isActive) => {
    api
      .patch(`/admin/cashier_toggler/${username}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setCashiers((prevCashiers) =>
          prevCashiers.map((cashier) =>
            cashier.username === username
              ? { ...cashier, isActive: !isActive }
              : cashier
          )
        );
      })
      .catch((error) => {
        console.error("Error toggling cashier status", error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-[#01AB52] mb-4">
        Cashier Control Panel (Admin Only)
      </h1>

      {/* Create New Cashier */}
      <div className="mb-6 p-4 bg-white rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Create New Cashier</h2>
        <input
          required
          className="w-full px-3 py-2 mb-2 rounded-md border border-[#01AB52] focus:outline-none focus:ring focus:ring-[#01AB52]"
          type="text"
          placeholder="Username"
          value={newCashier.username}
          onChange={(e) =>
            setNewCashier({ ...newCashier, username: e.target.value })
          }
        />
        <input
          required
          className="w-full px-3 py-2 mb-2 rounded-md border border-[#01AB52] focus:outline-none focus:ring focus:ring-[#01AB52]"
          type="password"
          placeholder="Password"
          value={newCashier.password}
          onChange={(e) =>
            setNewCashier({ ...newCashier, password: e.target.value })
          }
        />
        <input
          required
          className="w-full px-3 py-2 mb-2 rounded-md border border-[#01AB52] focus:outline-none focus:ring focus:ring-[#01AB52]"
          type="text"
          placeholder="Name"
          value={newCashier.name}
          onChange={(e) =>
            setNewCashier({ ...newCashier, name: e.target.value })
          }
        />
        <button
          className="w-full py-2 bg-[#01AB52] text-white rounded-md hover:bg-[#018947] focus:outline-none focus:ring focus:ring-[#018947]"
          onClick={handleCreateCashier}
        >
          Create
        </button>
      </div>

      {/* List of Cashiers */}
      <table className="w-full border">
        <thead>
          <tr className="bg-[#01AB52] text-white">
            <th className="border px-4 py-2 w-1/4">Username</th>
            <th className="border px-4 py-2 w-1/4">Name</th>
            <th className="border px-4 py-2 w-1/4">Active</th>
            <th className="border px-4 py-2 w-1/4">Action</th>
          </tr>
        </thead>
        <tbody>
          {cashiers.map((cashier) => (
            <tr key={cashier.username} className="text-center">
              <td className="border px-4 py-2 w-1/4 break-words">
                {cashier.username}
              </td>
              <td className="border px-4 py-2 w-1/4 break-words">
                {cashier.name}
              </td>
              <td className="border px-4 py-2 w-1/4 break-words">
                {cashier.isActive ? "Active" : "Non-active"}
              </td>
              <td className="border px-4 py-2  flex flex-row">
                <button
                  className="bg-[#01AB52] hover:bg-opacity-80 text-white font-bold px-6 rounded-md mr-2"
                  onClick={() =>
                    handleToggleCashierStatus(
                      cashier.username,
                      cashier.isActive
                    )
                  }
                >
                  Toggle Status
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold px-6 rounded-md"
                  onClick={() => handleDeleteCashier(cashier.username)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="w-full py-2 mt-6 bg-[#01AB52] text-white rounded-md hover:bg-[#018947] focus:outline-none focus:ring focus:ring-[#018947]"
        onClick={fetchCashiers}
      >
        Refresh List
      </button>
    </div>
  );
}
