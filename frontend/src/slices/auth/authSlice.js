import { createSlice } from "@reduxjs/toolkit"
import { ROLES } from "../../constants"
import { handlePending, handleRejected, handleAuthSuccess } from "../handlers"
import { authorizeUser, registerUser, logoutUser, fetchMe } from "./authThunk"

const initialState = {
  id: null,
  login: null,
  roleId: ROLES.GUEST,
  session: null,
  status: "idle",
  error: null,
  isInitialized: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutLocal(state) {
      state.id = null
      state.login = null
      state.roleId = ROLES.GUEST
      state.status = "idle"
      state.error = null
      state.isInitialized = true
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
    clearAuthError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // авторизация
      .addCase(authorizeUser.pending, handlePending)
      .addCase(authorizeUser.fulfilled, handleAuthSuccess)
      .addCase(authorizeUser.rejected, handleRejected)

      // регистрация
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleAuthSuccess)
      .addCase(registerUser.rejected, handleRejected)

      // выход
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.id = null
        state.login = null
        state.roleId = ROLES.GUEST
        state.status = "idle"
        state.error = null
        state.isInitialized = true
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "idle"
        state.error = action.payload
      })

      // проверка токена
      .addCase(fetchMe.pending, handlePending)
      .addCase(fetchMe.fulfilled, handleAuthSuccess)
      .addCase(fetchMe.rejected, (state) => {
        state.status = "idle"
        state.isInitialized = true
      })
  },
})

export const {
  logoutLocal,
  setUserFromStorage,
  setAuthInitialized,
  clearAuthError,
} = authSlice.actions
export default authSlice.reducer
