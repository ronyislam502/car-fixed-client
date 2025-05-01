import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TService } from "@/types/service"; // Assuming you have a `TService` type for service

const initialState = {
  selectedService: null as TService | null,
  selectedSlot: null as string | null,
  selectedDate: null as string | null,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.1, // Default tax rate of 10%
  grandTotal: 0,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setService: (state, action: PayloadAction<TService>) => {
      state.selectedService = action.payload;
      state.totalPrice = action.payload.price || 0; // Assuming price is part of the service
      state.tax = state.totalPrice * state.taxRate;
      state.grandTotal = state.totalPrice + state.tax;
    },
    setSlot: (state, action: PayloadAction<string>) => {
      state.selectedSlot = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    clearBooking: (state) => {
      state.selectedService = null;
      state.selectedSlot = null;
      state.selectedDate = null;
      state.totalPrice = 0;
      state.tax = 0;
      state.grandTotal = 0;
    },
  },
});

export const { setService, setSlot, setSelectedDate, clearBooking } =
  bookingSlice.actions;

export const selectBookingDetails = (state: any) => state.booking;

export default bookingSlice.reducer;
