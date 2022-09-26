import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  path: '',
  isPlaying: false,
};

const audio = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    playAudio(state) {
      state.isPlaying = true;
    },
    pauseAudio(state) {
      state.isPlaying = false;
    },
    createAudio(state, action) {
      state.path = action.payload;
      state.isPlaying = true;
    },
    removeAudio(state) {
      state.path = '';
      state.isPlaying = false;
    },
  },
});

export const { playAudio, pauseAudio, createAudio, removeAudio } =
  audio.actions;
export const audioReducer = audio.reducer;
