import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import UploadProfilePicture from "../components/UploadProfilePicture.jsx";

export default function UserSettings() {
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    email: "",
    username: "",
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string(),
    newPassword: Yup.string(),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Passwords must match"
    ),
    email: Yup.string().email("Invalid email address"),
    username: Yup.string(),
  });

  const onSubmit = async (values) => {
    console.log("Form Values:", values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#01AB52]">
      <div className="bg-white p-8 rounded-md shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-4">User Settings</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currentPassword}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
            />
            {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <div className="text-red-600 text-sm">
                {formik.errors.currentPassword}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="text-red-600 text-sm">
                {formik.errors.newPassword}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmNewPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmNewPassword}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
            />
            {formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword ? (
              <div className="text-red-600 text-sm">
                {formik.errors.confirmNewPassword}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-400"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-600 text-sm">
                {formik.errors.username}
              </div>
            ) : null}
          </div>

          <UploadProfilePicture />

          <button
            type="submit"
            className="w-full bg-[#01AB52] text-white font-medium text-lg py-2 rounded-md hover:bg-[#018947] focus:outline-none focus:ring focus:ring-[#018947]"
          >
            Save
          </button>
        </form>
      </div>
    </section>
  );
}
