import PRODUCT from "../models/productModel.js";

const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const createProduct = async (req, res) => {
    const { title, image, description, rating, price, category, duration } = req.body;
    if (!title || !image || !rating || !description || !category || !price || !duration) {
        res.status(400).json({ success: false, errMsg: "all fields are required" });
        return;
    }
    try {
        const product = await PRODUCT.create({ title, image, description, rating, price, category, duration });
        res.status(201).json({ success: true, message: "product created successfully", product });
    } catch (error) {
        res.status(500).json({ success: false, errMsg: error.message });
    }
};

export const products = async (req, res) => {
    try {
        const products = await PRODUCT.insertMany(req.body);
        res.status(201).json({ success: true, message: "products created successfully", products });
    } catch (error) {
        res.status(500).json({ success: false, errMsg: error.message });
    }
};

export const allProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const skip = (page - 1) * limit;

        const [products, totalProducts] = await Promise.all([
            PRODUCT.find().skip(skip).limit(limit).lean(),
            PRODUCT.countDocuments(),
        ]);
        res.status(200).json({ success: true, message: "all products", currentPage: page, totalPages: Math.ceil(totalProducts / limit), totalProducts, products });
    } catch (error) {
        res.status(500).json({ success: false, errMsg: error.message });
    }
};

export const product = async (req, res) => {
    try {
        const product = await PRODUCT.findById(req.params.productId).lean();
        if (!product) {
            res.status(404).json(
                { success: false, errMsg: "product not found" }
            );
            return;
        }

        res.status(200).json({ success: true, message: "product found", product });
    } catch (error) {
        res.status(500).json({ success: false, errMsg: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await PRODUCT.findByIdAndUpdate(req.params.productId, req.body, { new: true, runValidators: true });
        if (!product) {
            res.status(404).json({ success: false, errMsg: "product not found" });
            return;
        }
        res.status(200).json({ success: true, message: "product updated successfully", product });
    } catch (error) {
        res.status(500).json({ success: false, errMsg: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await PRODUCT.findByIdAndDelete(req.params.productId);
        if (!product) {
            res.status(404).json({ success: false, errMsg: "product not found" });
            return;
        }
        res.status(200).json({ success: true, message: "product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, errMsg: error.message });
    }
};

export const searchProduct = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            res.status(400).json({ success: false, errMsg: "Search query is required" });
            return;
        }

        const safeQuery = escapeRegex(query);
        const products = await PRODUCT.find({
            $or: [
                { title: { $regex: safeQuery, $options: "i" } },
                { category: { $regex: safeQuery, $options: "i" } },
            ]
        }).lean();
        if (!products || products.length === 0) {
            res.status(404).json({ success: false, errMsg: "No title or category found" });
            return;
        }

        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, errMsg: error.message });
    }
};
