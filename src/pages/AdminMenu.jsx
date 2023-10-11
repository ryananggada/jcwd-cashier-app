import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik"; // Import useFormik from Formik
import * as Yup from "yup"; // Import Yup for validation
import api from "../api.js";
import AdminControlPanel from "../components/AdminControlPanel.jsx";

export default function AdminMenu() {
  const validationSchema = Yup.object({
    profilePicture: Yup.mixed().required("Please select a profile picture"),
  });

  const formik = useFormik({
    initialValues: {
      profilePicture: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("profilePicture", values.profilePicture);
      const token = localStorage.getItem("token");

      try {
        const response = await api.post("/auth/updateprofile", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          alert("Profile picture updated successfully!");
        }
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    },
  });

  return (
    <div>
      <p>You are an Admin!</p>

      <form onSubmit={formik.handleSubmit}>
        <input
          type="file"
          name="profilePicture"
          accept="image/jpeg, image/png, image/gif"
          onChange={(event) => {
            formik.setFieldValue(
              "profilePicture",
              event.currentTarget.files[0]
            );
          }}
        />
        {formik.touched.profilePicture && formik.errors.profilePicture ? (
          <div>{formik.errors.profilePicture}</div>
        ) : null}
        <button type="submit">Update Profile Picture</button>
      </form>

      <AdminControlPanel />

      {/* <Link to="/auth/updateprofile">View Profile</Link> */}
    </div>
  );
}
