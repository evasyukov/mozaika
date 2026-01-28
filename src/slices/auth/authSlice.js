import { createSlice } from "@reduxjs/toolkit"

import { authorizeUser, registerUser } from "./authThunk"
import { authReducer } from "./authReducer"
import { ROLE } from "../../constants"

const initialState = {
  id: null,
  login: null,
  roleId: ROLE.GUEST,
  session: null,
  status: "idle",
  error: null,
  isInitialized: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout() {
      sessionStorage.removeItem("userData")
      return { ...initialState, isInitialized: true }
    },

    setUserFromStorage(state, action) {
      return {
        ...state,
        ...action.payload,
        status: "succeeded",
        error: null,
        isInitialized: true,
      }
    },

    setAuthInitialized(state) {
      state.isInitialized = true
    },
  },
  extraReducers: (builder) => {
    builder
      // авторизация
      .addCase(authorizeUser.pending, authReducer.setLoading)
      .addCase(authorizeUser.fulfilled, authReducer.authSuccess)
      .addCase(authorizeUser.rejected, authReducer.setError)

      // регистрация
      .addCase(registerUser.pending, authReducer.setLoading)
      .addCase(registerUser.fulfilled, authReducer.authSuccess)
      .addCase(registerUser.rejected, authReducer.setError)
  },
})

export const { logout, setUserFromStorage, setAuthInitialized } =
  authSlice.actions

export default authSlice.reducer
