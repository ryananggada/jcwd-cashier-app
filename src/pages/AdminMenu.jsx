import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../api.js";
import AdminSidebar from "../components/AdminSidebar.jsx";

export default function AdminMenu() {
  return (
    <div className="flex flex-row">
      <AdminSidebar />
      <h1>
        <p>Admin Page</p>
      </h1>
      <div></div>
    </div>
  );
}
