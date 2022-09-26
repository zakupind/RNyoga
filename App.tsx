/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';

import {Provider} from 'react-redux';
import TrackPlayer from 'react-native-track-player';

import {store} from './src/store/store';

import {Navigation} from './src/components/Navigation';

const App = () => {
  useEffect(() => {
    async function run() {
      await TrackPlayer.setupPlayer();
    }

    run();
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
