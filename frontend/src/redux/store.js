import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { EventReducer } from "./reducers/event";
import { productReducer } from "./reducers/product";

const Store = configureStore({
    reducer: {
        user: userReducer,
        seller: sellerReducer,
        product: productReducer,
        event: EventReducer
    }
})

export default Store
