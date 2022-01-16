import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enterJournal: false,
  selectedJournal: "",
  enterTrade: false
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    goTojournal: (state, action) => {
      state.enterJournal = action.payload.enterJournal;
      state.selectedJournal = action.payload.selectedJournal
    },
    goToTradeForm: (state, action) => {
      state.enterTrade = action.payload.enterTrade;
    }
  },
});

export const journalActions = journalSlice.actions;

export default journalSlice.reducer;
