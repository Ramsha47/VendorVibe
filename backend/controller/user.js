 const express = require("express");
 const path = require("path");
 const fs = require("fs");
 const User = require("../model/user");
 const router = express.Router();
 const catchAsyncError = require("../middleware/catchAsyncError");
 const {upload} = require("../multer");
 const jwt = require("jsonwebtoken");
 const sendMail = require("../utils/SendMail");
 const sendToken = require("../utils/jwtToken");
 const ErrorHandler = require("../utils/ErrorHandler");
 const { isAuthenticatedUser } = require("../middleware/auth");
 
// Create User
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlinkSync(filePath, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({ success: false, message: "error deleting file" });
        }
      });
      
      return next(new ErrorHandler("User already exists", 400));
    }
    const filename = req.file.filename;
    const fileUrl = path.join('uploads', filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: {
        url: fileUrl,
        public_id: filename,
      },
    };
    console.log(user);

    const activationToken = createActivationToken(user);
    console.log(activationToken);
    const activationUrl = `http://localhost:3000/activate/${activationToken}`;

  try {
    await sendMail({
      email: user.email,
      subject: "Activate your account",
      message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
    });
    res.status(201).json({
      success: true,
      message: `please check your email:- ${user.email} to activate your account!`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
} catch (error) {
  return next(new ErrorHandler(error.message, 400));
}
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "30m",
  });
};


// activate user
router.post("/activate", catchAsyncError(async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    if (!newUser) {
      return next(new ErrorHandler("Invalid activation token", 400));
    }
    const { name, email, password, avatar } = newUser;
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }
    user = await User.create({
      name,
      email,
      avatar: {
        url: avatar.url,
        public_id: avatar.public_id,
      },
      password,
    });

    sendToken(user, 201, res);
  } catch (error) {
    console.log("Activation error:", error);
    return next(new ErrorHandler(error.message, 500));
  }
}));

// login user
router.post("/login-user", catchAsyncError(async (req, res, next) => {
  console.log("Received /login-user request");
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }
    console.log(`Login successful, authenticated user: ${user.email} (${user._id})`);
    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

// load user
router.get(
  "/getuser",
  isAuthenticatedUser,
  catchAsyncError(async (req, res, next) => {
    console.log("GET /getuser - Authenticated user:", req.user ? req.user.email : "None");
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// logout 
router.get("/logout",isAuthenticatedUser, catchAsyncError(async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

module.exports = router;
