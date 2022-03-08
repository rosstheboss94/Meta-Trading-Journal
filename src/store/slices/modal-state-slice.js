import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createUserModalState: false,
  loginModalState: false,
  chartModalState: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showCreateUser: (state, action) => {
      state.createUserModalState = action.payload.modalState;
      state.loginModalState = !action.payload.modalState;
      state.chartModalState = false;
    },
    showLoginModal: (state, action) => {
      state.loginModalState = action.payload.modalState;
      state.createUserModalState = !action.payload.modalState;
      state.chartModalState = false;
    },
    closeModal: (state, action) => {
      state.createUserModalState = false;
      state.loginModalState = false;
      state.chartModalState = false;
    },
    showChartModal: (state, action) => {
      state.createUserModalState = !action.payload.modalState;
      state.loginModalState = !action.payload.modalState;
      state.chartModalState = action.payload.modalState;
    }
  },
});

// Action creators are generated for each case reducer function
export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
