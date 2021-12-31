import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/authenticationSlice"
import modalReducer from "./slices/modal-state-slice"

export const store = configureStore({
  reducer: {
      auth: authReducer,
      modal: modalReducer
  },
})