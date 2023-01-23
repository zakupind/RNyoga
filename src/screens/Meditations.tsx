import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { Meditation, requestCategories } from '../api/meditations';

import { Category } from '../components/Category';
import Video from 'react-native-video';
import TrackPlayer from 'react-native-track-player';

const deviceHeight = Dimensions.get('window').height;

export const Meditations = ({ navigation }) => {
  const video = React.useRef(null);
  // const [status, setStatus] = React.useState({});
  const [data, setData] = useState<Meditation[]>([]);

  const getCategories = async () => {
    try {
      const res = await requestCategories();

      setData(res.data);
    } catch (e) {
      // add modal
      console.error(e);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={{ height: '100%' }}>
      <ScrollView>
        <Video
          ref={video}
          style={styles.video}
          source={require('../assets/background-home.mp4')}
          // useNativeControls
          resizeMode="cover"
          muted
        />
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Медитации</Text>
        </View>
        <View style={styles.wrapper}>
          {data.map(({ id, name, path }) => (
            <Category
              key={id}
              name={name}
              path={path}
              onPress={() =>
                navigation.navigate('Meditation', {
                  id,
                  path,
                  nameCategory: name,
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
  },
  video: {
    height: deviceHeight * 0.5,
    width: '100%',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
    position: 'absolute',
    top: 90,
  },
  title: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: '200',
  },
});
