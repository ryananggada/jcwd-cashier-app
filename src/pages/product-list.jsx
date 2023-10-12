import { useEffect, useState } from "react"
import * as yup from "yup"
import api from "../api"
import { useLocation, useParams, useSearchParams, redirect } from "react-router-dom"
import { isEmptyArray, useFormik } from "formik"

// TO DO: Ubah page indexing dari 0 ke 1
function ProductList() {
    const { page } = useParams();
    const location = useLocation();
    const [products, setProducts] = useState([])
    const [productAmount, setProductAmount] = useState(0)
    const [availablePages, setAvailablePages] = useState(0)
    const [searchParams] = useSearchParams();
    const [categories, setCategories] = useState([{}])
    useEffect(() => {
        if (isNaN(page) || (page % 1 !== 0)) {
            redirect(`/products/0?${searchParams.toString()}`)
        }
    }, [ location ])
    useEffect(() => {
        setAvailablePages(Math.ceil(productAmount / 10) - 1)
    }, [ productAmount ])
    const pageNavSchema = yup.object().shape({
        to: yup.number().integer().min(0)
    })
    const pageNavForm = useFormik({
        initialValues: {
            to: isNaN(page) ? 0 : page
        },
        validationSchema: pageNavSchema,
        onSubmit: (values) => {
            redirect(`/products/${values.to}?${searchParams.toString()}`)
        }
    })
    useEffect(() => {
        api
            .get(`/products/${page}?${searchParams.toString()}`)
            .then((res) => {
                setProducts(res.data.data) // TOLONG
                setProductAmount(res.data.amount)
            })
            .catch((err) => {
                window.alert("Failed to load product data")
                console.log(err)
            })
    }, [ location ]) 
    useEffect(() => {
        api
            .get("/categories")
            .then((res) => {
                setCategories(res.data.data)
            })
            .catch((err) => {
                window.alert("Failed to load category data")
                console.log(err)
            })
    }, [ location ])
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

    return (<>
        <div>
            <form action="">
                Looking for something?
                <input type="text" name="nameFilter" placeholder="Product Name"/>
                <label>
                    Product Category:
                    <select name="category">
                        <option></option>
                        {categories.map(cate => (
                            <option key={cate.id} value={cate.id}>{cate.name}</option>
                        ))}
                    </select>
                </label>
                <input type="radio" name="sortByPrice" value="0"/> Sort by name
                <input type="radio" name="sortByPrice" value="1"/> Sort by price
                <input type="radio" name="sortAscend" value="0"/> {searchParams.get("sortByPrice") ? "Highest to Lowest price" : "z-A"}
                <input type="radio" name="sortAscend" value="1"/> {searchParams.get("sortByPrice") ? "Lowest to highest price" : "A-z"}
                <button type="submit">Search</button>
            </form>
            <section>
                {isEmptyArray(products)
                    ? "No items found."
                    : /** Karena sudah disort, tinggal map saja hasil itemnya. */
                    products.map(item => (
                        <div key={item.id}>
                            <div>
                                Price: {item.price}
                            </div>
                            <div>
                                Name: {item.name}
                            </div>
                            <img src={item.image} alt=""/*onError={displayBlankObject}*//>
                            <div>   
                                Category:
                                {categories.find(cate => cate.id === item.categoryId)?categories.find(cate => cate.id === item.categoryId).name : ""}
                            </div>
                            <div>
                                Description: {item.description}
                            </div>
                            <label>
                                Active:
                                <input
                                    type="checkbox"
                                    name={`activeId${item.id}`}
                                    defaultChecked={item.isActive}
                                />
                            </label>
                        </div>))
                }
                
                {}
            </section>
        </div>
            <div> Page {page} of {availablePages} </div>
            <form onSubmit={pageNavForm.submitForm}>
                <label>
                    Go to:
                    <input 
                        type="number"
                        name="to"
                        value={page}
                        min={0}
                        max={availablePages}
                        {...pageNavForm.getFieldProps("to")}
                    />
                </label>
            </form>

        </>
    )
}

export default ProductList

