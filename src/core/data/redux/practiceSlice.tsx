// src/store/globalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    subtype_id: null,   // you can add more fields here later
};

const practiceSlice = createSlice({
  name: 'subtype_id',
  initialState,
  reducers: {
    setSubtypeValue: (state, action) => {
      state.subtype_id = action.payload;
    },
    // You can add more global actions here
  },
});

export const { setSubtypeValue } = practiceSlice.actions;
export default practiceSlice.reducer;
