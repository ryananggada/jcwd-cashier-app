import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import api from "../api";
import Dashboard from "../components/Dashboard";

function EditProduct() {
  const { productId } = useParams();

  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.get("/categories");
      const { data } = response;
      setCategories(data.data);
    };

    const fetchProduct = async () => {
      const response = await api.get(`/products/single/${productId}`);
      const { data } = response;

      setProduct(data.data);
    };

    fetchCategories();
    fetchProduct();
  }, [productId]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageUrl(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProduct = async (
    name,
    price,
    categoryId,
    description,
    isActive
  ) => {
    try {
      const response = await api.put(
        `/products/${productId}`,
        {
          name,
          price,
          categoryId,
          description,
          isActive,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const productData = response.data;
      console.log(productData);
      window.alert("Editing product success!");
    } catch (error) {
      window.alert("Something went wrong:", error);
      console.log(error);
    }
  };

  const productSchema = Yup.object().shape({
    name: Yup
      .string()
      .required("Name cannot be empty")
      .min(3, "Minimum length is 3"),
    price: Yup
      .number()
      .positive("Price cannot be negative or zero")
      .required("Price cannot be empty"),
    categoryId: Yup.number().integer(),
    description: Yup
      .string()
      .required("Descrption cannot be empty")
      .min(3, "Minimum length is 3"),
    isActive: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      name: product.name,
      price: parseInt(product.price, 10),
      categoryId: product.categoryId,
      description: product.description,
      isActive: product.isActive,
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      const { name, price, categoryId, description, isActive } = values;
      handleEditProduct(
        name,
        parseInt(price, 10),
        categoryId,
        imageUrl,
        description,
        isActive
      );
    },
  });

  return (
    <Dashboard>
      <section>
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Edit product</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Type product name"
                  required
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500">{formik.errors.name}</div>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Price
                </label>
                <input
                  type="number"
                  step="1000"
                  name="price"
                  id="price"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${
                    formik.touched.price && formik.errors.price
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="Price"
                  required
                  {...formik.getFieldProps("price")}
                />
                {formik.touched.price && formik.errors.price && (
                  <div className="text-red-500">{formik.errors.price}</div>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Category
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-500 block w-full p-2.5"
                  {...formik.getFieldProps("categoryId")}
                >
                  {categories.map((cate) => (
                    <option key={cate.id} value={cate.id}>
                      {cate.name}
                    </option>
                  ))}
                </select>
                {formik.touched.category && formik.errors.category && (
                  <div className="text-red-500">{formik.errors.category}</div>
                )}
              </div>
              <div className="sm:col-span-2 mb-6">
                <label
                  htmlFor=""
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Upload Product Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {uploadedImage !== null ? (
                        <img
                          src={uploadedImage}
                          alt="Selected"
                          className="w-10/12 sm:w-full max-h-52"
                        />
                      ) : (
                        <>
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            GIF, PNG, or JPG, (MAX. 1MB)
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 ${
                  formik.touched.description && formik.errors.description
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Description goes here"
                required
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500">{formik.errors.description}</div>
              )}
            </div>
            <div className="w-full">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 required"
                {...formik.getFieldProps("categoryId")}
              />
              <label
                for="remember"
                class="ml-2 text-sm font-medium text-gray-900"
              >
                Active
              </label>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            >
              Add product
            </button>
          </form>
        </div>
      </section>
    </Dashboard>
  );
}

export default EditProduct;
