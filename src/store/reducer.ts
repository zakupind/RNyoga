import { combineReducers } from '@reduxjs/toolkit';
import { audioReducer } from './slices/audio';
import { userReducer } from './slices/user';
import { videoReducer } from './slices/video';

const reducers = {
  user: userReducer,
  audio: audioReducer,
  video: videoReducer,
};

export const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;
