import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("orderCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("orderCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
      state.success = true;
    })
    .addCase("orderCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    // get all orders of user
    .addCase("getAllOrdersUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersUserSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllOrdersUserFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // delete product of a shop
    .addCase("deleteOrderShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteOrderShopSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteOrderShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // get all orders
    .addCase("getAllOrdersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersSuccess", (state, action) => {
      state.isLoading = false;
      state.allOrders = action.payload;
    })
    .addCase("getAllOrdersFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});