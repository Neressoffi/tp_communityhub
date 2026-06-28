import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../../services/api';

const initialState = {
  skills: [],
  filterUserId: null,
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
};

export const fetchSkills = createAsyncThunk(
  'skills/fetchSkills',
  async (userId = null, { rejectWithValue }) => {
    try {
      const query = userId ? `?user_id=${Number(userId)}` : '';
      return await apiRequest(`/skills/index.php${query}`);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createSkill = createAsyncThunk(
  'skills/createSkill',
  async (skillData, { rejectWithValue }) => {
    try {
      return await apiRequest('/skills/store.php', {
        method: 'POST',
        body: JSON.stringify({
          title: skillData.title,
          description: skillData.description,
          daily_price: Number(skillData.daily_price),
        }),
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    clearSkillMessages: (state) => {
      state.error = null;
      state.createError = null;
    },
    clearCreateError: (state) => {
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload?.skills ?? action.payload ?? [];
        state.filterUserId = action.meta.arg ?? null;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(createSkill.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createSkill.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createSkill.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload;
      });
  },
});

export const { clearSkillMessages, clearCreateError } = skillsSlice.actions;
export default skillsSlice.reducer;