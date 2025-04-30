import Product from '../models/product.model.js';
import mongoose from 'mongoose';


export const getProduct = async (req, res) => {
    const products = await Product.find({});

    try {
        res.status(200).json({ success: true, data: products });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    const newProduct = await Product.create(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    
    if (mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted" });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    }
    catch (err) {
        res.status(404).json({ success: false, message: "Product Not Found" });
    }
}