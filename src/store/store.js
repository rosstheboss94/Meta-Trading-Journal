import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/authenticationSlice"
import modalReducer from "./slices/modal-state-slice"
import journalReducer from "./slices/journal_slice"

export const store = configureStore({
  reducer: {
      auth: authReducer,
      modal: modalReducer,
      journal: journalReducer
  },
})