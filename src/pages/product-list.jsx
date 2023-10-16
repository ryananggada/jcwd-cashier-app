import { useEffect, useState } from "react";
import * as yup from "yup";
import api from "../api";
import { useParams, useSearchParams, redirect } from "react-router-dom";
import { isEmptyArray, useFormik } from "formik";
import { BsSearch } from "react-icons/bs";
// import Dashboard from "../components/Dashboard";

// TO DO: Ubah page indexing dari 0 ke 1
function ProductList() {
  const { page } = useParams();
  const [products, setProducts] = useState([]);
  const [productAmount, setProductAmount] = useState(0);
  const [availablePages, setAvailablePages] = useState(0);
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState([{}]);
  useEffect(() => {
    if (isNaN(page) || page % 1 !== 0) {
      redirect(`/products/0?${searchParams.toString()}`);
    }
  }, [page]);
  useEffect(() => {
    setAvailablePages(Math.ceil(productAmount / 10) - 1);
  }, [productAmount]);
  const pageNavSchema = yup.object().shape({
    to: yup.number().integer().min(0),
  });
  const pageNavForm = useFormik({
    initialValues: {
      to: isNaN(page) ? 0 : page,
    },
    validationSchema: pageNavSchema,
    onSubmit: (values) => {
      redirect(`/products/${values.to}?${searchParams.toString()}`);
    },
  });
  useEffect(() => {
    api
      .get(`/products/${page}?${searchParams.toString()}`)
      .then((res) => {
        setProducts(res.data.data); // TOLONG
        setProductAmount(res.data.amount);
      })
      .catch((err) => {
        window.alert("Failed to load product data");
        console.log(err);
      });
  }, [page, searchParams]);
  useEffect(() => {
    api
      .get("/categories")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        window.alert("Failed to load category data");
        console.log(err);
      });
  }, [page, searchParams]);
  /* 
    const fetchData = async () => {
        try {
            const res = await api.get(`/products/${page}?SortByPrice=${searchParams.get(sortByPrice)}&sortAscend=${searchParams.get(sortAscend)}&category=${searchParams.get(categoryFilter)}&nameFilter=${searchParams.get(nameFilter)}`)
            setProducts(res.data)
            setProductAmount(res.itemAmount)
        } catch(err) {
            window.alert("Failed to load product data")
            console.log(err)
        }
    } 
    */
  /*
    const 
    */

  return (
    // <Dashboard>
    <>
      <div className="pt-10 pb-2 px-4 mx-auto max-w-2xl lg:pt-16">
        <form action="">
          <div className="grid grid-cols-3 sm:grid-cols-2">
            <input
              type="text"
              name="nameFilter"
              placeholder="Product Name"
              className="m-0 py-px rounded-l-full col-span-2 sm:col-span-1"
            />
            <select className="m-0 py-px rounded-r-full" name="category">
              <option className="text-gray-300">Category...</option>
              {categories.map((cate) => (
                <option key={cate.id} value={cate.id}>
                  {cate.name}
                </option>
              ))}
            </select>
          </div>
          Sort by{" "}
          {/*Date of creation <input type="radio" name="sortType" value="createdAt"/> */}
          Name <input type="radio" name="sortType" value="name" />
          Price <input type="radio" name="sortType" value="price" />
          Descending <input type="radio" name="sortAscend" value="0" />
          Ascending
          <input type="radio" name="sortAscend" value="1" />
          <button
            className="items-center p-1 border-2 border-green-300 rounded-full hover:border-green-500 hover:bg-green-100"
            type="submit"
          >
            <BsSearch />
          </button>
        </form>
        <section className="grid gap-1.5 sm:grid-cols-2">
          {isEmptyArray(products)
            ? "No items found."
            : /** Karena sudah disort, tinggal map saja hasil itemnya. */
              products.map((item) => (
                <div
                  className="grid gap-1.5 sm:grid-cols-2 border border-green-400 rounded-sm"
                  key={item.id}
                >
                  <img src={item.image} alt="" className="col-span-2" />
                  <div className="text-xl font-bold">Price: {item.price}</div>
                  <div className="text-lg font-semibold">Name: {item.name}</div>
                  <div>
                    Category:
                    <div className="grid gap-0.5 sm:grid-cols-2">
                      <div>
                        {categories.find((cate) => cate.id === item.categoryId)
                          ? categories.find(
                              (cate) => cate.id === item.categoryId
                            ).name
                          : ""}
                      </div>
                      <div className="text-gray-600">
                        {categories.find((cate) => cate.id === item.categoryId)
                          ? categories.find(
                              (cate) => cate.id === item.categoryId
                            ).description
                          : ""}
                      </div>
                    </div>
                  </div>
                  <div>Description: {item.description}</div>
                  <label>
                    Active:
                    <input
                      type="checkbox"
                      name={`activeId${item.id}`}
                      defaultChecked={item.isActive}
                    />
                  </label>
                </div>
              ))}

          {}
        </section>
      </div>
      <div>
        {" "}
        Page {page} of {availablePages}{" "}
      </div>
      <form onSubmit={pageNavForm.submitForm}>
        <label>
          Go to:
          <input
            type="number"
            name="to"
            value={page}
            className="py-px rounded-full"
            min={0}
            max={availablePages}
            maxLength={Math.max(Math.ceil(Math.log10(availablePages)), 1)}
            size={Math.max(Math.ceil(Math.log10(availablePages) + 1), 2)}
            {...pageNavForm.getFieldProps("to")}
          />
        </label>
      </form>
    </>
    // </Dashboard>)
  );
}

export default ProductList;
