import { configureStore } from "@reduxjs/toolkit";
import pickedReducer from "./picked.js";
import cartReducer from "./cart.js";
import userReducer from "./user.js";

const store = configureStore({
  reducer: {
    pickedProduct: pickedReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
