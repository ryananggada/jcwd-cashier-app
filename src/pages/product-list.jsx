import { useEffect, useState } from "react"
import api from "../api"
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"
import Dashboard from "../components/Dashboard"

function ProductList() {
    const { page } = useParams();
    const [products, setProducts] = useState([{
        id: 1,
        productName: "brick",
        productPrice: 1,
        productImage: "https://pbs.twimg.com/media/DvOOcFCUYAA0OXa?format=jpg&name=small",
        categoryId: 1,
        description: "useless",
        isActive: true
    },
    {
        id: 2,
        productName: "nomium",
        productPrice: 3000,
        productImage: ".../backend/public/IMG-1696935393111",
        categoryId: 1,
        description: "makes you want to cook something",
        isActive: true
    }])
    const [productAmount, setProductAmount] = useState(2)
    const [searchParams, setSearchParams] = useSearchParams();
    const [categories, setCategories] = useState([{
        id: 1,
        name: "nom",
        description: "nom"
    }])
    /* 
    useEffect(() => {
        api
            .get(`/products${page}?SortByPrice=${searchParams.get(sortByPrice)}&sortAscend=${searchParams.get(sortAscend)}&category=${searchParams.get(categoryFilter)}&nameFilter=${searchParams.get(nameFilter)}`)
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
                <select name="categoryFilter">
                    <option></option>
                    {categories.map(cate => (
                        <option value={cate.id}>{cate.name}</option>
                    ))}
                </select>
                <input type="radio" name="sortByPrice" value="0"/> Sort by name
                <input type="radio" name="sortByPrice" value="1"/> Sort by price
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
                    Name: {item.productName}
                </div>
                <image path={item.productImage}/>
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

