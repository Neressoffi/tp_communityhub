import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../../services/api';

const initialState = {
  payments: [],
  loading: false,
  error: null,
  subscribeLoading: false,
  subscribeError: null,
};

export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async (_, { rejectWithValue }) => {
    try {
      return await apiRequest('/payments/index.php');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const subscribePremium = createAsyncThunk(
  'payments/subscribePremium',
  async (paymentData, { rejectWithValue }) => {
    try {
      return await apiRequest('/payments/premium.php', {
        method: 'POST',
        body: JSON.stringify(paymentData),
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    clearSubscribeError: (state) => {
      state.subscribeError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload?.payments ?? [];
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(subscribePremium.pending, (state) => {
        state.subscribeLoading = true;
        state.subscribeError = null;
      })
      .addCase(subscribePremium.fulfilled, (state) => {
        state.subscribeLoading = false;
      })
      .addCase(subscribePremium.rejected, (state, action) => {
        state.subscribeLoading = false;
        state.subscribeError = action.payload;
      });
  },
});

export const { clearSubscribeError } = paymentsSlice.actions;
export default paymentsSlice.reducer;
