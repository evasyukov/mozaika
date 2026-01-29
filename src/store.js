import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./slices"
import profileReducer from "./slices/profile/profileSlice"
import projectReducer from "./slices/project/projectSlice"

const reducer = {
  auth: authReducer,
  profile: profileReducer,
  project: projectReducer,
}

export const store = configureStore({
  reducer,
})
