const sequelize = require("sequelize")
const { Product, Category } = require("../models")

exports.handleGetProducts = async (req, res) => {
    const { page } = req.params
    const { sortByPrice, sortAscend, category, nameFilter } = req.query
    try {
        if (isNaN(page)) {
            throw "Page must be a number"
        }
        const {count, products} = await Product.findAndCountAll({
            order: [sortByPrice ? "productPrice" : "productName", sortAscend ? "ASC" : "DESC"],
            limit: 10,
            offset: (10 * page),
            where: {
                categoryId : category,
                productName : nameFilter
            }
        })
        res.status(200).json({
            ok: true,
            data: products,
            itemAmount: count
        })
    } catch(err) {
        res.status(500).json({
            ok: false,
            message: err.message
        })
    }
}

exports.handleGetCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({})
        res.status(200).json({
            ok: true,
            data: categories
        })
    } catch(err) {
        res.status(500).json({
            ok: false,
            message: err.message
        })
    }
}


exports.handleAddCategory = async (req, res) => {
    const { name, description } = req.body
    try {
        const newCate = await Category.create({
            name,
            description
        })
        res.status(200).json({
            ok: true,
            data: newCate
        })
    } catch(err) {
        res.status(500).json({
            ok: false,
            message: err.message
        })
    }
}

e