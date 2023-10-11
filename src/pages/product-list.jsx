import { useEffect, useState } from "react"
import api from "../api"
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"
import Dashboard from "../components/Dashboard"

function ProductList() {
    const { page } = useParams();
    const location = useLocation()
    const [products, setProducts] = useState([])
    const [productAmount, setProductAmount] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams();
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const toSearch = Object.freeze(["sortByPrice", "sortAscend", "category", "nameFilter"])
        let has = false
        let backendSearchUrl = `/products/${page}`
        for (let searchFor in toSearch) {
            const searchValue = searchParams.get(searchFor)
            if (searchValue !== null){
                if (has) {
                    backendSearchUrl = `${backendSearchUrl}&${searchFor}=${searchValue}`
                } else {
                    backendSearchUrl = `${backendSearchUrl}?${searchFor}=${searchValue}`
                }
            }
        }
        api
            .get(backendSearchUrl)
            .then((res) => {
                console.log(res)
                setProducts(res.data.data) // TOLONG
                setProductAmount(res.data.data.length)
            })
            .catch((err) => {
                window.alert("Failed to load product data")
                console.log(err)
            })
    }, []) 
    useEffect(() => {
        api
            .get("/categories")
            .then((res) => {
                console.log(res)
                setCategories(res.data.data)
            })
            .catch((err) => {
                window.alert("Failed to load category data")
                console.log(err)
            })
    }, [])
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
        {isNaN(page) 
        ?<div>
            <div>
                ERROR
            </div>
            Page must be a number.
        </div>
        : <div>
            <form action="">
                Looking for something?
                <input type="text" name="nameFilter" placeholder="Product Name"/>
                <select name="category">
                    <option></option>
                    {categories.map(cate => (
                        <option value={cate.id}>{cate.name}</option>
                    ))}
                </select>
                <input type="radio" name="sortByPrice" value="0"/> Sort by name
                <input type="radio" name="sortByPrice" value="1"/> Sort by price
                <input type="radio" name="sortAscend" value="0"/> {searchParams.get("sortByPrice") ? "Highest to Lowest price" : "z-A"}
                <input type="radio" name="sortAscend" value="1"/> {searchParams.get("sortByPrice") ? "Lowest to highest price" : "A-z"}
                <button type="submit">Search</button>
            </form>
            <section>
            {/** Karena sudah disort, tinggal map saja hasil itemnya. */}
            {products.map(item => (<div key={item.id}>
                <div>
                    {item.price}
                </div>
                <div>
                    Name: {item.name}
                </div>
                <image path={item.image}/>
                <div>
                    Category:
                    {categories.find(cate => cate.id === item.categoryId).name}
                </div>
                <div>
                    Description: {item.description}
                </div>
                {item.isActive}
            </div>))}
            </section>
            </div>
        }
        {((!isNaN(page)) && (page > 0)) 
            ? <Link to={`/products/${(Number(page) - 1)}?${searchParams}`}>{"<"}</Link>
            : <></>
            } 
            {/* Ketik angka disini untuk mengganti halaman. */}
            {isNaN(page)
            ? <Link to="/products/0">Return</Link> 
            : page
            } 
            <Link to={`/products/${Number(page) + 1}?${searchParams}`}>{">"}</Link>
        </>
    )
}

export default ProductList

