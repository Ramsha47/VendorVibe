const express = require("express");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// Routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");  
const event = require("./controller/event");
const couponCode = require("./controller/couponCode");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");

app.get("/test", (req, res) => {
  console.log("Test route hit");
  res.send("test ok");
});

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/couponCode", couponCode);
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);

// Error Handling
app.use(ErrorHandler);

module.exports = app;