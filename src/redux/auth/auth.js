import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = undefined;
    },
    setUser: (state, actions) => {
      state.user = actions.payload;
    },
  },
});

export default authSlice.reducer;
export const authAction = authSlice.actions;
