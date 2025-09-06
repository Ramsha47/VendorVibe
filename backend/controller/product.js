const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const catchAsyncError = require("../middleware/catchAsyncError");
const {upload} = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const { isSeller } = require("../middleware/auth");
const fs = require("fs")

// Create Product
router.post("/create-product", upload.array("images"), catchAsyncError(async (req, res) => {
    try {
        const shopId = req.shopId;
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return next(new ErrorHandler("Shop not found", 400));
        }
        else{
            const files = req.files;
            const imageUrls = files.map((file) => {`${file.filename}` });
            const productData = req.body;
            productData.images = imageUrls;
            productData.shop = shop;

            const product = await Product.create(productData);
            res.status(201).json({
                success: true,
                product,
            });
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
}));

// Get all products of a shop
router.get("/get-all-products-shop/:id", catchAsyncError(async (req, res) => {
    try {
        const products = await Product.find({ shopId: req.params.id });
        res.status(201).json({
            success: true,
            products,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
}));

// Delete product
router.delete("/delete-shop-product/:id",isSeller, catchAsyncError(async (req, res) => {
    try {
        const productData = await Product.findById(req.params.id);
        console.log(productData.images)

        productData.images.forEach((imageUrls) => {
            const filename = imageUrls
            const filepath = `uploads/${filename}`

            fs.unlink(filepath , (err)=>{
                if(err){
                    console.log(err)
                }   
            })
            
        });
        const product = await Product.findByIdAndDelete(req.params.id);
       
        if(!product){
            return next(new ErrorHandler("Product not found with this id", 500));
        }
        res.status(201).json({
            success: true,
            message: "Product deleted successfully",
            product,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
}));

module.exports = router;
