import { createSlice } from "@reduxjs/toolkit"
import { profileIdThunk, updateProfileThunk } from "./profileThunk"

const initialState = {
  data: null,
  status: "idle",
  error: null,
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    // получение профиля
    builder
      .addCase(profileIdThunk.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(profileIdThunk.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = "succeeded"
      })
      .addCase(profileIdThunk.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })

      // обновление профиля
      .addCase(updateProfileThunk.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.data = {
          ...state.data,
          profile: action.payload.profile,
        }
        state.status = "succeeded"
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

export const { clearProfile } = profileSlice.actions
export default profileSlice.reducer
