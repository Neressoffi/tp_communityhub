import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../../services/api';

const initialState = {
  messages: [],
  filter: 'received', // 'received' | 'sent'
  loading: false,
   error: null,
  sendLoading: false,
    sendError: null,
};

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (type = 'received', 
    { rejectWithValue }) => {
    try {
      const query = type === 'sent' ? '?type=sent' : '';
      return await apiRequest(`/messages/index.php${query}`);
    } catch (error) {
      return rejectWithValue
      (error.message);
    }
  },
);

 export const sendMessage = createAsyncThunk(
       'messages/sendMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      return await apiRequest('/messages/send.php', {
        method: 'POST',
      body: JSON.stringify({
          receiver_id: Number(messageData.receiver_id),
      message: messageData.message,
        }),
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const messagesSlice = createSlice(
  {
      name: 'messages',
      initialState,
       reducers: {
    clearMessageMessages: (state) => {
      state.error = null;
      state.sendError = null;
    },
    clearSendError: (state) => {
      state.sendError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- fetchMessages ---
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload?.messages ?? action.payload ?? [];
        state.filter = action.meta.arg ?? 'received';
      }
    )

      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    )

      // --- sendMessage ---
      .addCase(sendMessage.pending, (state) => {
        state.sendLoading = true;
        state.sendError = null;
      }
    )
      .addCase(sendMessage.fulfilled, (state) => {
        state.sendLoading = false;
      }
    )
         .addCase(sendMessage.rejected, (state, action) => {
         state.sendLoading = false;
         state.sendError = action.payload;
      });
  }  ,
});

export const { clearMessageMessages, clearSendError } = messagesSlice.actions;
export default messagesSlice.reducer;