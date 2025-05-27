// src/redux/bookingSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api_url } from '../../../environment';

const API_URL = `${api_url}v1/get-bookingData`;

// Async thunk to fetch booking data
export const fetchBookingData = createAsyncThunk(
  "booking/fetchBookingData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Or get it from Redux if you're storing it there

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("API error", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

interface BookingState {
  bookingData: any; // you can strongly type this if you have a structure
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookingData: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearBookingData: (state) => {
      state.bookingData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingData.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingData = action.payload;
      })
      .addCase(fetchBookingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearBookingData } = bookingSlice.actions;

export default bookingSlice.reducer;
