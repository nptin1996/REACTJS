import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../function.js";

const currentUser = getLocalStorage("currentUser");

const initialState = {
  isLogin: Boolean(currentUser),
  data: currentUser,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.data = action.payload;
      setLocalStorage("currentUser", state.data);
    },

    logout(state) {
      state.isLogin = false;
      state.data = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
