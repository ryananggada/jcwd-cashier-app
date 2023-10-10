const sequelize = require("sequelize")
const { Product, Category } = require("../models")

exports.handleGetProducts = async (req, res) => {
    const { sortByPrice, desc, category, nameFilter, page } = req.query
    try {
        const products = await Products.findAll({
            order: [sortByPrice ? "productPrice" : "productName", desc ? "ASC": "DESC"],
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
            max
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