import { useDispatch } from "react-redux"
import { useEffect } from "react"

import { setUserFromStorage } from "../slices/auth/authSlice"
import { fetchMe } from "../slices/auth/authThunk"

export function useInitAuth() {
  const dispatch = useDispatch()

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userData")

    if (storedUser) {
      try {
        dispatch(setUserFromStorage(JSON.parse(storedUser)))
        return
      } catch {
        sessionStorage.removeItem("userData")
      }
    }

    dispatch(fetchMe())
  }, [dispatch])
}
