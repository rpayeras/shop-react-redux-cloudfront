import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UserState {
  logged: boolean;
}

const initialState: UserState = {
  logged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state: UserState) => {
      state.logged = true;
    },
    logout: (state: UserState) => {
      state.logged = false;
    },
  },
});

export const selectUser = (state: RootState) => state.user;

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
