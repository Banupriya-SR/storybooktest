import { configureStore } from '@reduxjs/toolkit';
import resourceReducer from "../features/user/userSlice"

export const store = configureStore({
  reducer: {
    resource:resourceReducer,
  },
});
