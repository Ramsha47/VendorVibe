import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { EventReducer } from "./reducers/event";
import { productReducer } from "./reducers/product";
import { cartReducer } from "./reducers/cart";

const Store = configureStore({
    reducer: {
        user: userReducer,
        seller: sellerReducer,
        product: productReducer,
        event: EventReducer,
        cart: cartReducer
    }
})

export default Store
