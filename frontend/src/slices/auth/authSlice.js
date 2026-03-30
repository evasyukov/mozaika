import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { authorize, register } from "../../bff/operations"
import { ROLES } from "../../constants"
import { handlePending, handleRejected } from "../handlers"
import { handleAuthSuccess } from "../handlers" 

export const authorizeUser = createAsyncThunk(
  "auth/authorizeUser",
  async ({ login, password }, { rejectWithValue }) => {
    const { error, response } = await authorize(login, password)
    if (error) return rejectWithValue(error)
    return response
  },
)

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ data }, { rejectWithValue }) => {
    const { error, response } = await register(data)
    if (error) return rejectWithValue(error)
    return response
  },
)

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
      .addCase(authorizeUser.pending, handlePending)
      .addCase(authorizeUser.fulfilled, handleAuthSuccess)
      .addCase(authorizeUser.rejected, handleRejected)

      // регистрация
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleAuthSuccess)
      .addCase(registerUser.rejected, handleRejected)
  },
})

export const { logout, setUserFromStorage, setAuthInitialized } =
  authSlice.actions
export default authSlice.reducer
