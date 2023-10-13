import React from "react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../api.js";

export default function UserSetting() {
  const formik = useFormik({
    initialValues: {
      profilePicture: null,
    },
    validationSchema: Yup.object({
      profilePicture: Yup.mixed()
        .test("fileSize", "File is too large", (value) => {
          return value && value.size <= 1024 * 1024;
        })
        .test("fileType", "Invalid file type", (value) => {
          return (
            value &&
            ["image/gif", "image/png", "image/jpeg"].includes(value.type)
          );
        }),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        if (values.profilePicture) {
          formData.append("profilePicture", values.profilePicture);
          const response = await api.post("/auth/updateprofile", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          console.log("Upload response:", response.data);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      formik.setFieldValue("profilePicture", acceptedFiles[0]);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1>Settings</h1>
      <div {...getRootProps()} class="flex items-center justify-center w-[15%]">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              GIF, PNG, or JPG, (MAX. 1MB)
            </p>
          </div>
          <input
            {...getInputProps()}
            id="dropzone-file"
            type="file"
            class="hidden"
            accept="iamge/gif, image/png, image/jpeg"
            multiple={false}
          />
        </label>
      </div>

      {formik.errors.profilePicture && formik.touched.profilePicture && (
        <div className="text-red-500">{formik.errors.profilePicture}</div>
      )}

      <button
        type="submit"
        class="bg-primary-600 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
      >
        Submit
      </button>
    </form>
  );
}
