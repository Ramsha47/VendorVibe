import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { EventReducer } from "./reducers/event";
import { productReducer } from "./reducers/product";
import { cartReducer } from "./reducers/cart";
import { orderReducer } from "./reducers/order";
import {wishlistReducer} from "./reducers/wishlist"

const Store = configureStore({
    reducer: {
        user: userReducer,
        seller: sellerReducer,
        product: productReducer,
        event: EventReducer,
        order: orderReducer,
        cart: cartReducer,
        wishlist:wishlistReducer
    }
})

export default Store
