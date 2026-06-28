import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../../services/api';

const initialState = {
  events: [],
  selectedEvent: null,
  categories: [],
  loading: false,
  error: null,
  detailLoading: false,
  detailError: null,
  createLoading: false,
  createError: null,
};

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      return await apiRequest('/events/index.php');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (id, { rejectWithValue }) => {
    try {
      return await apiRequest(`/events/show.php?id=${id}`);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchCategories = createAsyncThunk(
  'events/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await apiRequest('/categories/index.php');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      return await apiRequest('/events/store.php', {
        method: 'POST',
        body: JSON.stringify(eventData),
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createCategory = createAsyncThunk(
  'events/createCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      return await apiRequest('/categories/store.php', {
        method: 'POST',
        body: JSON.stringify(categoryData),
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
      state.detailError = null;
    },
    clearCreateError: (state) => {
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload?.events ?? [];
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEventById.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedEvent = action.payload?.event ?? null;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload?.categories ?? [];
      })
      .addCase(createEvent.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createEvent.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        const category = action.payload?.category;
        if (category) {
          state.categories = [...state.categories, category];
        }
      });
  },
});

export const { clearSelectedEvent, clearCreateError } = eventsSlice.actions;
export default eventsSlice.reducer;
