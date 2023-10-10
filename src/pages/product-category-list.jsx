import { useState } from "react"
import api from "../api"

function ProductCategoryList() {


    const [categories, setCategories] = useState([])
    useEffect(() => {
        api
            .get("/product/categories")
            .then((res) => {
                setCategories(res.data)
            })
            .catch((err) => {
                window.alert("Failed to load category data")
                console.log(err)
            })
    }, [])
    const editById = async(id, name, description) => {
        try {
            const res = await api.post(`/product/categories/${id}`, {
                name,
                description
            })
            if (res.status !== 200){
                window.alert("Failed to edit category")
            } else {
                window.alert("Successfully edited category")
            }
        } catch(err) {
            window.alert("Failed to edit category")
            console.log(err)
        }
    }
    const deleteById = async(id) => {
        try{
            const res = await api.delete(`/product/categories/${id}`)
            if (res.status !== 200) {
                window.alert("Failed to delete category")
            } else {
                window.alert("Successfully deleted category")
            }
        } catch(err) {
            window.alert("Failed to delete category")
            console.log(err)
        }
    }
    return (<>

        <div>
            {categories.map(item => (<>
            {item.name}
            {item.description}
            {/* Edit button */}
            {/* Delete button */}
            <button onClick={deleteById(item.id)}>Delete</button>
            </>))}
            <div>
                Create a new product category
            </div>
            <form action="#">
                <label
                    for="name"
                >
                    Category name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                />
                <label
                    for="description"
                >
                    Category description                    
                </label>
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                />
            </form>
        </div>
    </>)
}

export default ProductCategoryList