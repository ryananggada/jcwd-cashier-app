import { useState } from "react"
import api from "../api"
import { Link, useParams, useSearchParams } from "react-router-dom"

function ProductList() {
    const { page } = useParams();
    const [products, setProducts] = useState([{
        productName: "brick",
        productPrice: 1,
        productImage: "",
        category: "",
        description: "useless",
        isActive: true
    }])
    const [productAmount, setProductAmount] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams();
    /* 
    const fetchData = async () => {
        try {
            const res = await api.get(`/products/products/${page}?SortByPrice=${searchParams.get(sortByPrice)}&sortAscend=${searchParams.get(sortAscend)}&category=${searchParams.get(categoryFilter)}&nameFilter=${searchParams.get(nameFilter)}`)
            setProducts(res.data)
            setProductAmount(res.itemAmount)
        } catch(err) {
            // Something has gone wrong.
            // 5s
        }
    } 
    */
    /*
    const 
    */

    return (<>
        {isNaN(page) 
        ?<div>
            Page must be a number!
            <Link to="/products/0">return</Link>
        </div>
        :<div>
            <form action="" method="post">
                Looking for something?
                <input type="text" name="nameFilter" placeholder="Product Name"/>
                <input type="text" name="categoryFilter" placeholder="Product Category"/>
                <input type="radio" name="sortByPrice" value="0"/> Sort by name{" "}
                <input type="radio" name="sortByPrice" value="1"/> Sort by price{" "}
                <input type="radio" name="sortAscend" value="0"/> {searchParams.get("sortByPrice") ? "Highest to Lowest price" : "z-A"}
                <input type="radio" name="sortAscend" value="1"/> {searchParams.get("sortByPrice") ? "Lowest to highest price" : "A-z"}
                <button type="submit">done?</button>
            </form>
            {/** Karena sudah disort, tinggal map saja hasil itemnya. */}
            {products.map(item => (<div>
                <div>
                    {item.productPrice}
                </div>
                {item.productName}
                {item.productImage}
                {item.category}
                {item.description}
                {item.isActive}
            </div>))}
            {"\n"}
            {(page > 0) ? 
            <Link to={`/products/${(Number(page) - 1)}`}>{"<"}</Link>
            : <></>
            } {page}
            <Link to={`/products/${Number(page) + 1}`}>{">"}</Link>
        </div>}
    </>)
}

export default ProductList

