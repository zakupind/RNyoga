import { createSlice } from '@reduxjs/toolkit';

interface Video {
  path: string;
  isPlaying: boolean;
}

const initialState: Video = {
  path: '',
  isPlaying: false,
};

const video = createSlice({
  name: 'video',
  initialState,
  reducers: {
    playVideo(state) {
      state.isPlaying = true;
    },
    pauseVideo(state) {
      state.isPlaying = false;
    },
    createVideo(state, action) {
      state.path = action.payload;
      state.isPlaying = true;
    },
    removeVideo(state) {
      state.path = '';
      state.isPlaying = false;
    },
  },
});

export const { playVideo, pauseVideo, createVideo, removeVideo } =
  video.actions;
export const videoReducer = video.reducer;
