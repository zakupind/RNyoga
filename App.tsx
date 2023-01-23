/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';

import { Provider } from 'react-redux';

import { store } from './src/store/store';

import { Navigation } from './src/components/Navigation';
import TrackPlayer from 'react-native-track-player';

const App = () => {
  useEffect(() => {
    TrackPlayer.setupPlayer()
      .then(() => console.log('ok setup player'))
      .catch(e => console.log(e));
    TrackPlayer.updateOptions({
      stoppingAppPausesPlayback: true,
    });
  });

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
