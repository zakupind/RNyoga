/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import { useSelector } from 'react-redux';
import { BASE_URL_HTTP } from '../api/api';
import { requestMeditations } from '../api/meditations';
import { Header } from '../components';
import { MeditationItem } from '../components/MeditationItem';
import { RootState } from '../store/reducer';
// import {
//   Audio,
//   AVPlaybackStatus,
//   InterruptionModeAndroid,
//   InterruptionModeIOS,
// } from 'expo-av';
// import {
//   createAudio,
//   pauseAudio,
//   playAudio,
//   removeAudio,
// } from '../store/slices/audio';
import { useFocusEffect } from '@react-navigation/native';
import { Modal } from '../components/Modal';
// import MusicControl, { Command } from 'react-native-music-control';

type MeditationItemType = {
  id: number;
  name: string;
  path: string;
  isDemo: boolean;
  lasting: number;
  createdAt: Date;
  orderNumber: number | null;
};

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export const Meditation = ({ route, navigation }) => {
  // const dispatch = useDispatch();

  const { id, path, nameCategory } = route.params;
  const [data, setData] = useState<MeditationItemType[]>([]);
  // const [playbackObject, setPlaybackObject] = useState<Audio.Sound | null>(
  //   new Audio.Sound()
  // );
  // const playbackObject = useRef(new Audio.Sound());

  // const [playbackStatus, setPlaybackStatus] = useState<
  //   AVPlaybackStatus | null | undefined
  // >(null);
  const { path: audioPath } = useSelector((state: RootState) => state.audio);
  const [duration] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const imageBgCategory = { uri: `${BASE_URL_HTTP}${path}` };

  const getData = async () => {
    try {
      const res = await requestMeditations(id);
      let meditations = res.data;
      meditations = meditations.sort(
        (a: MeditationItemType, b: MeditationItemType) =>
          a.orderNumber - b.orderNumber || 0,
      );
      meditations = meditations.sort((a: MeditationItemType) =>
        a.isDemo ? -1 : 1,
      );
      setData(meditations);
    } catch (e) {
      //add modal
      console.error(e);
    }
  };

  // const unmountAudio = async () => {
  //   if (playbackObject.current) {
  //     const { isLoaded } = await playbackObject.current.getStatusAsync();
  //     if (isLoaded) {
  //       void playbackObject.current.stopAsync();
  //       void playbackObject.current.unloadAsync();
  //     }
  //   }
  // };

  // const settingsAudio = async () => {
  //   await Audio.setAudioModeAsync({
  //     allowsRecordingIOS: true,
  //     interruptionModeIOS: InterruptionModeIOS.DoNotMix,
  //     playsInSilentModeIOS: true,
  //     interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
  //     shouldDuckAndroid: false,
  //     staysActiveInBackground: true,
  //     playThroughEarpieceAndroid: false,
  //   });
  // };

  useFocusEffect(
    React.useCallback(() => {
      // settingsAudio();

      return () => {
        // void unmountAudio();
        // dispatch(removeAudio());
      };
    }, []),
  );

  useEffect(() => {
    getData();

    return () => {
      setData([]);
    };
  }, []);

  // const handleAudioPlayPause = async (localPath: string) => {
  //   if (playbackObject !== null && playbackStatus === null) {
  //     let status = await playbackObject.current.loadAsync(
  //       { uri: `${BASE_URL_HTTP}${localPath}` },
  //       { shouldPlay: true },
  //     );

  //     playbackObject.current.setOnPlaybackStatusUpdate(st => {
  //       setDuration(
  //         Math.floor(
  //           (Number(st.durationMillis) - Number(st.positionMillis)) / 1000,
  //         ),
  //       );
  //     });

  //     dispatch(createAudio(localPath));

  //     return setPlaybackStatus(status);
  //   }

  //   // It will pause our audio
  //   if (isPlaying) {
  //     if (localPath === audioPath) {
  //       const status = await playbackObject.current.pauseAsync();
  //       dispatch(pauseAudio());
  //       return setPlaybackStatus(status);
  //     } else {
  //       await playbackObject.current.unloadAsync();
  //       const status = await playbackObject.current.loadAsync(
  //         { uri: `${BASE_URL_HTTP}${localPath}` },
  //         { shouldPlay: true },
  //       );

  //       dispatch(createAudio(localPath));
  //       return setPlaybackStatus(status);
  //     }
  //   }

  //   // It will resume our audio
  //   if (!isPlaying) {
  //     if (localPath === audioPath) {
  //       const status = await playbackObject.current.playAsync();
  //       dispatch(playAudio());
  //       return setPlaybackStatus(status);
  //     } else {
  //       await playbackObject.current.unloadAsync();
  //       const status = await playbackObject.current.loadAsync(
  //         { uri: `${BASE_URL_HTTP}${localPath}` },
  //         { shouldPlay: true },
  //       );
  //       dispatch(createAudio(localPath));
  //       return setPlaybackStatus(status);
  //     }
  //   }
  // };

  const modalClick = () => {
    setModalVisible(false);
    navigation.navigate('Pays');
  };

  return (
    <View style={{ height: deviceHeight }}>
      <Header
        background={require('../assets/meditations.png')}
        icon={require('../assets/icons/meditation.png')}
        widthIcon={40}
        heightIcon={40}
        head="Медитации"
      />
      <ScrollView style={styles.wrapper}>
        <View style={{ padding: 10 }}>
          <ImageBackground
            style={styles.categoryWrapper}
            source={imageBgCategory}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                style={{ height: 30, width: 15 }}
                source={require('../assets/backWhite.png')}
              />
            </Pressable>
            <Text style={styles.categoryName} adjustsFontSizeToFit>
              {nameCategory}
            </Text>
          </ImageBackground>
        </View>
        <View style={{ padding: 20, marginBottom: 40 }}>
          {data.map(({ id, name, isDemo, lasting, createdAt, path }) => (
            <MeditationItem
              key={id}
              name={name}
              lasting={path === audioPath ? duration : lasting}
              createdAt={createdAt}
              path={path}
              onClick={() => console.log('handleAudioPlayPause')}
              isDemo={isDemo}
              onClickNotDemo={() => setModalVisible(true)}
            />
          ))}
        </View>
      </ScrollView>
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        text="Это платный контент. Для доступа к нему необходимо оформить подписку"
        buttonText="Активировать!"
        buttonFn={() => modalClick()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: deviceHeight,
    width: deviceWidth,
  },
  categoryWrapper: {
    height: 160,
    padding: 20,
    marginTop: 5,
  },
  categoryName: {
    color: '#FFF',
    fontSize: 25,
    textAlign: 'center',
  },
});
