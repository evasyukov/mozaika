import { createSlice } from "@reduxjs/toolkit"
import { profileIdThunk, updateProfileThunk } from "./profileThunk"
import {
  handlePending,
  handleRejected,
  handleFulfilledObject,
} from "../handlers"

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
    builder
      // получение профиля
      .addCase(profileIdThunk.pending, handlePending)
      .addCase(profileIdThunk.fulfilled, handleFulfilledObject)
      .addCase(profileIdThunk.rejected, handleRejected)

      // обновление профиля
      .addCase(updateProfileThunk.pending, handlePending)
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.data = {
          ...state.data,
          profile: action.payload.profile,
        }
        state.status = "succeeded"
      })
      .addCase(updateProfileThunk.rejected, handleRejected)
  },
})

export const { clearProfile } = profileSlice.actions
export default profileSlice.reducer
