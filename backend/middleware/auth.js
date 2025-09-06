const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Shop = require("../model/shop");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Login first to access this resource", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
});

exports.isSeller = catchAsyncError(async (req, res, next) => {
    const { seller_token } = req.cookies;
    console.log("[isSeller] seller_token:", seller_token);
    if (!seller_token) {
        console.log("[isSeller] No seller_token found in cookies");
        return next(new ErrorHandler("Login first to access this resource", 401));
    }
    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET);
    console.log("[isSeller] Decoded seller id:", decoded.id);
    req.seller = await Shop.findById(decoded.id);
    console.log("[isSeller] req.seller:", req.seller);
    next();
});


