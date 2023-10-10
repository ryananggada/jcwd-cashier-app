function ProductCategoryList() {
    return (<>
        <div>
            {[].map(item => (<>
            {item.name}
            {item.description}
            {/* Edit button */}
            {/* Delete button */}
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
                    placeholder="NAME"
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