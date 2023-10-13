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
    <div>
      <h1>Cashier Control Panel (Admin Only)</h1>

      {/* Create New Cashier */}
      <div>
        <h2>Create New Cashier</h2>
        <input
          type="text"
          placeholder="Username"
          value={newCashier.username}
          onChange={(e) =>
            setNewCashier({ ...newCashier, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={newCashier.password}
          onChange={(e) =>
            setNewCashier({ ...newCashier, password: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Name"
          value={newCashier.name}
          onChange={(e) =>
            setNewCashier({ ...newCashier, name: e.target.value })
          }
        />
        <button onClick={handleCreateCashier}>Create</button>
      </div>

      {/* List of Cashiers */}
      <h2>List of Cashiers</h2>
      <button onClick={fetchCashiers}>Show All Cashiers</button>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cashiers.map((cashier) => (
            <tr key={cashier.username}>
              <td>{cashier.username}</td>
              <td>{cashier.name}</td>
              <td>{cashier.isActive ? "Active" : "Non-active"}</td>
              <td>
                <button
                  onClick={() =>
                    handleToggleCashierStatus(
                      cashier.username,
                      cashier.isActive
                    )
                  }
                >
                  Toggle Status
                </button>
                <button onClick={() => handleDeleteCashier(cashier.username)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
