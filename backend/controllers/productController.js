const Product = require('../models/product');

// Add new product
const addProduct = async(req, res) => {
    try {
        const {name, price, originalPrice, image, category, stock} = req.body;

        if (!name || !price || !image || !category) {
            return res.status(400).json({message: "name, price, image, category are required"});
        }
        const product = await Product.create({
            name,
            price,
            originalPrice,
            image,
            category,
            stock: stock || 100
        });
        res.status(201).json({success: true, product});
    } catch (error) {
        res.status(500).json({message: error.message});
    } 
};

// Get all products with search, category, price, and sorting filter
const getAllProducts = async(req, res) => {
    try {
        const {category, search, minPrice, maxPrice, sort} = req.query;
        let filter = {};

        if (category && category !== 'all') {
            filter.category = new RegExp(category, 'i');
        }

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ];
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        let query = Product.find(filter);

        if (sort === 'price_asc') {
            query = query.sort({ price: 1 });
        } else if (sort === 'price_desc') {
            query = query.sort({ price: -1 });
        } else if (sort === 'name_asc') {
            query = query.sort({ name: 1 });
        } else {
            query = query.sort({ createdAt: -1 });
        }

        const products = await query;
        res.json({ success: true, count: products.length, products});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Detail of one product for product.jsx
const getProductById = async(req, res) => { 
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({message: "product not found"});
        res.json({success: true, product});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete product
const deleteProduct = async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({success: true, message: "product removed"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {addProduct, getAllProducts, getProductById, deleteProduct};
