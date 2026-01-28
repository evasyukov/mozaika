import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./slices"
import profileReducer from "./slices/profile/profileSlice"

const reducer = {
  auth: authReducer,
  profile: profileReducer,
}

export const store = configureStore({
  reducer,
})
