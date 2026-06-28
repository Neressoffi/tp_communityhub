import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../../services/api';

const initialState = {
   contacts: [],
   users: [],
     loading: false,
   error: null,
   actionLoading: false,
   actionError: null,
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      return await 
      apiRequest('/contacts/index.php');
    } catch
     (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchUsers = createAsyncThunk(
  'contacts/fetchUsers',
       async (_, { rejectWithValue }) => {
      try {
      return await apiRequest
      ('/users/index.php');
          } catch 
    (error) {
      return rejectWithValue(error.message);
        }
  },
);

export const sendContactRequest = createAsyncThunk(
  'contacts/sendContactRequest',
  async (receiverId,
     { rejectWithValue }) => {
    try {
      return await apiRequest
      ('/contacts/store.php', {
        method: 'POST',
        body: JSON.stringify(
          { receiver_id: Number(receiverId) 

          }),
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export  const acceptContact = createAsyncThunk(
  'contacts/acceptContact',
  async (contactId, { rejectWithValue }) => {
    try {
      return await apiRequest('/contacts/accept.php', {
        method: 'POST',
        body: JSON.stringify({ contact_id: Number(contactId) }),
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
    reducers: {
    clearContactMessages: (state) => {
      state.error = null;
      state.actionError = null;
    },
        clearActionError: (state) => {
      state.actionError = null;
    },
  },
  extraReducers: (builder) => {
        builder
      // --- fetchContacts ---
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload?.contacts ?? action.payload ?? [];
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- fetchUsers ---
      .addCase(fetchUsers.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload?.users ?? action.payload ?? [];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
      })

      // --- sendContactRequest ---
      .addCase(sendContactRequest.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(sendContactRequest.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(sendContactRequest.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })

      // --- acceptContact ---
      .addCase(acceptContact.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(acceptContact.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(acceptContact.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      });
  },
});

export const { clearContactMessages, clearActionError } = contactsSlice.actions;
export default contactsSlice.reducer;