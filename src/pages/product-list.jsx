import { useEffect, useState } from "react"
import api from "../api"
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"
import Dashboard from "../components/Dashboard"

function ProductList() {
    const { page } = useParams();
    const location = useLocation()
    const [products, setProducts] = useState([{
        productName: "brick",
        productPrice: 1,
        productImage: "https://pbs.twimg.com/media/DvOOcFCUYAA0OXa?format=jpg&name=small",
        category: 1,
        description: "useless",
        isActive: true
    },
    {
        productName: "nomium",
        productPrice: 3000,
        productImage: "https://cdn.7tv.app/emote/6262ca3795fb1400ef2f93c1/4x.webp",
        category: 1,
        description: "makes you want to cook something",
        isActive: true
    }])
    const [productAmount, setProductAmount] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    const [categories, setCategories] = useState([{
        id: 1,
        name: "nom",
        description: "nom"
    }])
    /* 
    useEffect(() => {
        api
            .get(`/products/products/${page}?SortByPrice=${searchParams.get(sortByPrice)}&sortAscend=${searchParams.get(sortAscend)}&category=${searchParams.get(categoryFilter)}&nameFilter=${searchParams.get(nameFilter)}`)
            .then((res) => {
                setProducts(res.data)
                setProductAmount(res.itemAmount)
            })
            .catch((err) => {
                window.alert("Failed to load product data")
                console.log(err)
            })
    }, [ location ]) 
    */
    /*
    useEffect(() => {
        api
            .get("/products/categories")
            .then((res) => {
                setCategories(res.data)
            })
            .catch((err) => {
                window.alert("Failed to load category data")
                console.log(err)
            })
    }, [])
    */
    /* 
    const fetchData = async () => {
        try {
            const res = await api.get(`/products/products/${page}?SortByPrice=${searchParams.get(sortByPrice)}&sortAscend=${searchParams.get(sortAscend)}&category=${searchParams.get(categoryFilter)}&nameFilter=${searchParams.get(nameFilter)}`)
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
    <Dashboard>
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
                <input type="text" name="categoryFilter" placeholder="Product Category"/>
                <input type="radio" name="sortByPrice" value="0"/> Sort by name{" "}
                <input type="radio" name="sortByPrice" value="1"/> Sort by price{" "}
                <input type="radio" name="sortAscend" value="0"/> {searchParams.get("sortByPrice") ? "Highest to Lowest price" : "z-A"}
                <input type="radio" name="sortAscend" value="1"/> {searchParams.get("sortByPrice") ? "Lowest to highest price" : "A-z"}
                <button type="submit">done?</button>
            </form>
            <section>
            {/** Karena sudah disort, tinggal map saja hasil itemnya. */}
            {products.map(item => (<div>
                <div>
                    {item.productPrice}
                </div>
                <div>
                    {item.productName}
                </div>
                <image path={item.productImage}/>
                <div>
                    {item.category}
                </div>
                <div>
                    {item.description}
                </div>
                {item.isActive}
            </div>))}
            </section>
            </div>
        }
        {((!isNaN(page)) && (page > 0)) 
            ? <Link to={`/products/${(Number(page) - 1)}`}>{"<"}</Link>
            : <></>
            } 
            {/* Ketik angka disini untuk mengganti halaman. */}
            {isNaN(page)
            ? <Link to="/products/0">Return</Link> 
            : page
            } 
            { ((!isNaN(page)) && (productAmount > (10 * (Number(page) + 1))))
            ? <Link to={`/products/${Number(page) + 1}`}>{">"}</Link>
            : <></>
        }
        </Dashboard>
    )
}

export default ProductList

