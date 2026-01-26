import { useDispatch } from "react-redux"
import { useEffect } from "react"

import { setUserFromStorage, setAuthInitialized } from "../slices/authSlice"

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

    dispatch(setAuthInitialized())
  }, [dispatch])
}
