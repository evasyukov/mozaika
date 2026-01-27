export const authReducer = {
  setLoading(state) {
    state.status = "loading"
    state.error = null
  },
  setError(state, action) {
    state.status = "failed"
    state.error = action.payload
  },
  authSuccess(state, action) {
    const { id, login, roleId, session } = action.payload

    state.id = id
    state.login = login
    state.roleId = roleId
    state.session = session

    state.status = "succeeded"
    state.error = null

    sessionStorage.setItem("userData", JSON.stringify(action.payload))
  },
}
