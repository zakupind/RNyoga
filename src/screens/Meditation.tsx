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
import { useDispatch, useSelector } from 'react-redux';
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
import {
  createAudio,
  pauseAudio,
  playAudio,
  removeAudio,
} from '../store/slices/audio';
import { Modal } from '../components/Modal';
import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { getIndexTrack } from '../utils/getIndexTrack';
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

const events = [Event.PlaybackState, Event.PlaybackError];

export const Meditation = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { id, path, nameCategory } = route.params;
  const [data, setData] = useState<MeditationItemType[]>([]);

  const { isSubscriber } = useSelector((state: RootState) => state.user);
  const { path: audioPath } = useSelector((state: RootState) => state.audio);
  const { duration, position } = useProgress();

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

  useEffect(() => {
    getData();

    return () => {
      setData([]);
    };
  }, []);

  const modalClick = () => {
    setModalVisible(false);
    navigation.navigate('Pays');
  };

  const initTrackList = async () => {
    const playlist = data
      .filter(track => track.isDemo || isSubscriber)
      .map(track => ({
        id: track.id,
        url: BASE_URL_HTTP + track.path,
        title: track.name,
        artist: 'Tatiana Kim',
        duration: track.lasting,
      }));

    const state = await TrackPlayer.getState();
    if (playlist.length > 0 && state !== State.Playing) {
      await TrackPlayer.add(playlist);
    }
  };

  useEffect(() => {
    initTrackList();
  }, [data, isSubscriber]);

  const handlePlayOrPause = async (path: string, id: number) => {
    const state = await TrackPlayer.getState();
    const queue = await TrackPlayer.getQueue();

    if (path === audioPath) {
      if (state === State.Playing) {
        await TrackPlayer.pause();
        dispatch(pauseAudio());
      } else {
        await TrackPlayer.play();
        dispatch(playAudio());
      }
    } else {
      await TrackPlayer.play();
      const indexNewTrack = getIndexTrack(queue, id);
      await TrackPlayer.skip(indexNewTrack);
      dispatch(createAudio(path));
    }
  };

  useEffect(() => {
    console.log(duration - position);
    const lasting = duration - position;

    if (lasting <= 1) {
      dispatch(removeAudio());
      void TrackPlayer.pause();
    }
  }, [position]);

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
              lasting={path === audioPath ? duration - position : lasting}
              createdAt={createdAt}
              path={path}
              onClick={() => handlePlayOrPause(path, id)}
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
