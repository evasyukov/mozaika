// store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { authorize } from "../bff/operations"
import { ROLE } from "../constants"

export const authorizeUser = createAsyncThunk(
  "auth/authorizeUser",
  async ({ login, password }, { rejectWithValue }) => {
    const { error, response } = await authorize(login, password)

    if (error) {
      return rejectWithValue(error)
    }

    return response
  },
)

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
      return initialState
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
      .addCase(authorizeUser.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(authorizeUser.fulfilled, (state, action) => {
        const { id, login, roleId, session } = action.payload

        state.id = id
        state.login = login
        state.roleId = roleId
        state.session = session

        state.status = "succeeded"
        state.error = null

        sessionStorage.setItem("userData", JSON.stringify(action.payload))
      })
      .addCase(authorizeUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

export const { logout, setUserFromStorage, setAuthInitialized } =
  authSlice.actions
export default authSlice.reducer
