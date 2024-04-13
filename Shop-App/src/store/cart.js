import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../function.js";

const listCart = getLocalStorage("listCart") || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: listCart,
    total: listCart.reduce((acc, ele) => acc + ele.price * ele.quantity, 0),
  },
  reducers: {
    addCart(state, action) {
      const addedProduct = action.payload;
      // tìm index
      const index = state.data.findIndex(
        (ele) => ele["_id"]["$oid"] === addedProduct["_id"]["$oid"]
      );
      // không có sản phẩm trùng push vào array
      if (index === -1) {
        state.data.push(addedProduct);
        state.total += addedProduct.quantity * addedProduct.price;
      }
      // nếu khác -1 tức có sản phẩm trùng, thay thế và tính lại total
      else {
        state.data[index] = addedProduct;
        state.total = state.data.reduce(
          (acc, ele) => acc + ele.price * ele.quantity,
          0
        );
      }
      // save vào local storage
      setLocalStorage("listCart", state.data);
    },

    removeCart(state, action) {
      const removedProduct = action.payload;
      state.data = state.data.filter(
        (product) => product["_id"]["$oid"] !== removedProduct["_id"]["$oid"]
      );
      state.total = state.data.reduce(
        (acc, ele) => acc + ele.price * ele.quantity,
        0
      );
      setLocalStorage("listCart", state.data);
    },

    clearCart(state) {
      state.data = [];
      state.total = 0;
      localStorage.removeItem("listCart");
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
