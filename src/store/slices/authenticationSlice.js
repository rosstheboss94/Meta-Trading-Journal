import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  currentUser: ""
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggingIn: (state, action) => {
        state.isLoggedIn = action.payload.userLoginStatus
        state.currentUser = action.payload.currentUser;
    },
  },
})

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions

export default authSlice.reducer