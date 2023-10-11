import { useState } from "react"
import * as yup from "yup"
//import api from "../api"
import { useFormik } from "formik"

function ProductCategoryList() {

    const [categories, setCategories] = useState([{
        id: 1,
        name: "nom",
        description: "nom"
    }])
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
    const createCategorySchema = yup.object().shape({
        categoryName: yup
            .string()
            .required("Name cannot be empty.")
            .min(1),
        description: yup.string()
    })
    
    const createCategoryForm = useFormik({
        initialValues: {
            categoryName: "",
            description: ""
        },
        validationSchema: createCategorySchema,
        onSubmit: (values) => {
            const { categoryName, description } = values
            createNewCategory(categoryName, description)
        }
    })
    const createNewCategory = async(name, description) => {
        window.alert(`testing reactivity of creating item with data {${name}, ${description}}`)
        /* 
        try {
            const res = await api.post(`/products/categories`, {
                name, 
                description
            })
            if (res.status !== 200){
                window.alert("Failed to add category")
            } else {
                window.alert("Successfully added category")
            }
        } catch(err) {
            window.alert("Failed to add category")
            console.log(err)
        } 
        */
    }
    const editById = async(id, name, description) => {
        window.alert(`testing reactivity of editing item with id '${id}' with data {${name}, ${description}}`)
        /* 
        try {
            const res = await api.put(`/products/categories/${id}`, {
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
        */
    }
    const deleteById = async(id) => {
        window.alert(`testing reactivity of deleting item with id '${id}'`)
        /* 
        try {
            const res = await api.delete(`/products/categories/${id}`)
            if (res.status !== 200) {
                window.alert("Failed to delete category")
            } else {
                window.alert("Successfully deleted category")
            }
        } catch(err) {
            window.alert("Failed to delete category")
            console.log(err)
        } 
        */
    }
    return (<>

        <div>
            {categories.map(item => (<>
            {item.name}
            {item.description}
            {(createCategoryForm.isValid && createCategoryForm.dirty) ? 
            <button 
                onClick={() => (editById(item.id, createCategoryForm.values.categoryName, createCategoryForm.values.description))}
            >Replace with submitted
            </button> 
            : <></>}
            <button onClick={() => (deleteById(item.id))}>Delete</button>
            </>))}
            <div>
                Product Category submission
            </div>
            <form onSubmit={createCategoryForm.handleSubmit}>
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
                    {...createCategoryForm.getFieldProps("categoryName")}
                />
                <div className="text-red-500">{createCategoryForm.errors.categoryName}</div>
                <label
                    for="description"
                >
                    Category description                    
                </label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Description"
                    {...createCategoryForm.getFieldProps("description")}
                />
                <button 
                    type="submit"
                >Create New</button>
            </form>
        </div>
    </>)
}

export default ProductCategoryList