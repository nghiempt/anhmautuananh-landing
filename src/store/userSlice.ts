"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  avatar: string | null;
}

const initialState: UserState = {
  avatar: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAvatar(state, action: PayloadAction<string | null>) {
      state.avatar = action.payload ?? null;
    },
    clearAvatar(state) {
      state.avatar = null;
    },
  },
});

export const { setAvatar, clearAvatar } = userSlice.actions;
export default userSlice.reducer;
