import { useFocusEffect } from '@react-navigation/native';
import Video from 'react-native-video';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { BASE_URL_HTTP } from '../api/api';
import { Back, Header } from '../components';

export const About = ({ navigation }) => {
  const video = React.useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // unmountVideo();
      };
    }, []),
  );

  return (
    <View style={{ height: '100%' }}>
      <Header
        color="#5F5E5E"
        icon={require('../assets/icons/settings.png')}
        widthIcon={40}
        heightIcon={40}
        head="Настройки"
      />
      <ScrollView>
        <Back label="О проекте" onPress={() => navigation.goBack()} />
        <View style={styles.wrapper}>
          <ImageBackground
            source={require('../assets/tatiana.png')}
            style={styles.image}
          />
          <Text style={{ fontSize: 16, padding: 20 }}>
            Меня зовут Татьяна Мельникова.{'\n'}Я профессиональный психолог,
            сертифицированный коуч SFM (модель фактора Успеха), бизнес тренер,
            тренер личной эффективности.{'\n'}
            Люблю рисовать, играть на скрипке, изучать всё, что меня
            совершенствует. Я ищу новые эффективные способы использования
            соверемнных или давно забытых методик, которые способствуют развитию
            лидерских качеств.{'\n'}Я создала данный проект для того, чтобы вы
            могли расширять границы ваших возможностей в условиях современного
            быстро меняющегося мира. Важным элементом собственного развития
            и вхождения в состояние потока является применение правильно
            подобранных медитаций.{'\n'}
            Что такое медитация? Как работает медитация? Когда нужно
            использовать медитацию? Смотрите краткое видео с ответами!
          </Text>
          <Video
            style={styles.video}
            ref={video}
            source={{ uri: `${BASE_URL_HTTP}/uploads/about.mp4` }}
            resizeMode="contain"
            controls
            paused
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 30,
  },
  image: {
    width: 300,
    height: 350,
  },
  video: {
    width: '80%',
    height: 300,
    marginBottom: 20,
  },
});
