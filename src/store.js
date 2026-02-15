import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./slices"
import profileReducer from "./slices/profile/profileSlice"
import projectReducer from "./slices/project/projectSlice"
import projectsReducer from "./slices/projects/projectsSlice"

const reducer = {
  auth: authReducer,
  profile: profileReducer,
  project: projectReducer,
  projects: projectsReducer,
}

export const store = configureStore({
  reducer,
})
