import { useEffect, useState } from "react"
import * as yup from "yup"
import api from "../api"
import { useFormik } from "formik"

function ProductCategoryList() {

    const [categories, setCategories] = useState([])

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
    }, [])

    const createCategorySchema = yup.object().shape({
        categoryName: yup
            .string()
            .required("Category name cannot be empty.")
            .min(3, "Category name must be at least 3 characters")
            .max(100, "Category name cannot be longer than 100 characters"),
        description: yup
            .string()
            .required("Category description cannot be empty.")
            .min(3, "Category description must be at least 3 characters")
            .max(100, "Category description cannot be longer than 100 characters")
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
            const res = await api.post(`/categories`, {
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
            const res = await api.put(`/categories/${id}`, {
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
            <div key={item.id}>Category</div>
            {item.name}
            {item.description}
            {(createCategoryForm.isValid 
            && ((item.name !== createCategoryForm.values.categoryName) || (item.description !== createCategoryForm.values.description)) 
            && createCategoryForm.dirty)
            ? <button 
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
                    htmlFor="name"
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
                {createCategoryForm.touched.categoryName
                ?<div className="text-red-500">{createCategoryForm.errors.categoryName}</div>
                :<></>}
                <label
                    htmlFor="description"
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
                {createCategoryForm.touched.description
                ?<div className="text-red-500">{createCategoryForm.errors.description}</div>
                :<></>}
                <button 
                    type="submit"
                >Create New</button>
            </form>
        </div>
    </>)
}

export default ProductCategoryList