import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PresentationDataService from "../services/presentation.service";

const initialState = [];

export const createPresentation = createAsyncThunk(
  "presentations/create",
  async ({ title, description }) => {
    const res = await PresentationDataService.create({ title, description });
    return res.data;
  }
);

export const retrievePresentations = createAsyncThunk(
  "presentations/retrieve",
  async () => {
    const res = await PresentationDataService.getAll();
    return res.data;
  }
);

export const updatePresentation = createAsyncThunk(
  "presentations/update",
  async ({ id, data }) => {
    const res = await PresentationDataService.update(id, data);
    return res.data;
  }
);

export const deletePresentation = createAsyncThunk(
  "presentations/delete",
  async ({ id }) => {
    await PresentationDataService.remove(id);
    return { id };
  }
);

export const deleteAllPresentations = createAsyncThunk(
  "presentations/deleteAll",
  async () => {
    const res = await PresentationDataService.removeAll();
    return res.data;
  }
);

export const findPresentationsByTitle = createAsyncThunk(
  "presentations/findByTitle",
  async ({ title }) => {
    const res = await PresentationDataService.findByTitle(title);
    return res.data;
  }
);

const presentationSlice = createSlice({
  name: "presentation",
  initialState,
  extraReducers: {
    [createPresentation.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrievePresentations.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updatePresentation.fulfilled]: (state, action) => {
      const index = state.findIndex(presentation => presentation.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deletePresentation.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllPresentations.fulfilled]: (state, action) => {
      return [];
    },
    [findPresentationsByTitle.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = presentationSlice;
export default reducer;