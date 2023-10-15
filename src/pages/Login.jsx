import React from "react";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as yup from "yup";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

function Login() {
  document.title = "FamilyMart - Login";
  const navigate = useNavigate();

  const loginUser = async (username, password) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/auth/login",
        {
          username,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const userData = response.data;
        const token = userData.data.token;

        Cookies.set("token", token, { expires: 1 });
        localStorage.setItem("token", token);

        if (userData.data.role === "admin") {
          navigate("/admin");
        } else if (userData.data.role === "cashier") {
          navigate("/cashier");
        }
      }
    } catch (error) {
      window.alert("Login failed!");
      console.error("Error:", error);
    }
  };
  const loginSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username can't be empty")
      .min(6, "Minimum characters is 6"),
    password: yup.string().required("Password can't be empty"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      const { username, password } = values;
      loginUser(username, password);
    },
  });

  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/31/FamilyMart_Logo_%282016-%29.svg"
              alt=""
              className="h-[90px] w-[180px]"
            />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex">
                <BsPersonCircle className="h-[30px] w-[30px] mr-10" />
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Sign in
                </h1>
              </div>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                      formik.touched.username && formik.errors.username
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="Your username"
                    required
                    {...formik.getFieldProps("username")}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div className="text-red-500">{formik.errors.username}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="••••••••"
                    required
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500">{formik.errors.password}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full text-[#FAFAFA] bg-[#01AB52] hover:bg-[#01AB52] hover:bg-opacity-[80%] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-1"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
