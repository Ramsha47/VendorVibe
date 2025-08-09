import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    
}

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("LoadUserRequest", (state, action) => {
            state.loading = true;
        })
        .addCase("LoadUserSuccess", (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })
        .addCase("LoadUserFailure", (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        })
        .addCase("ClearErrors", (state, action) => {
            state.error = null;
        });
});