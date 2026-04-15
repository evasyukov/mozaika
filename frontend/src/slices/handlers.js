// pending
export const handlePending = (state) => {
  state.status = "loading"
  state.error = null
}

// rejected
export const handleRejected = (state, action) => {
  state.status = "failed"
  state.error = action.payload || action.error?.message || "Unknown error"
}

// fulfilled для объектов
export const handleFulfilledObject = (state, action) => {
  state.status = "succeeded"
  state.data = action.payload
}

// fulfilled для массивов
export const handleFulfilledArray = (state, action) => {
  state.data = action.payload.projects || action.payload
  state.lastPage = action.payload.lastPage || 1
  state.status = "succeeded"
}

// обработка авторизации
export const handleAuthSuccess = (state, action) => {
  const { id, login, roleId, session } = action.payload
  state.id = id
  state.login = login
  state.roleId = roleId
  state.session = session
  state.status = "succeeded"
  state.error = null
  state.isInitialized = true
}
