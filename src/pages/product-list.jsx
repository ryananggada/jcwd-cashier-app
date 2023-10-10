import { useState } from "react"

function ProductList() {
    const [products, setProducts] = useState([])
    const [sortByPrice, setSortType] = useState(false)
    const [sortAscend, setSortDirection] = useState(false)
    const [categoryFilter, setCategoryFilter] = useState("")


    return (<>
        <div>
            {/** Karena sudah disort, tinggal map saja hasil itemnya. */}
            {[].map(item => (<>
                {item.productName}
                {item.productPrice}
                {item.productImage}
                {item.category}
                {item.description}
                {item.isActive}
            </>))}
        </div>
    </>)
}

export default ProductList