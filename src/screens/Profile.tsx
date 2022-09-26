import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../api/login';
import { Button, ButtonUp, Subscription } from '../components';
import { Header } from '../components/Header';
import { RootState } from '../store/reducer';
import { clearUser } from '../store/slices/user';

const deviceHeight = Dimensions.get('window').height;

export const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { name, email } = useSelector((state: RootState) => state.user);

  const logOut = () => {
    logout();
    dispatch(clearUser());
  };

  return (
    <View style={styles.wrapper}>
      <Header
        color="#5F5E5E"
        icon={require('../assets/icons/settings.png')}
        widthIcon={40}
        heightIcon={40}
        head="Настройки"
      />
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.infoText}>{name}</Text>
          <Text style={styles.infoText} adjustsFontSizeToFit numberOfLines={1}>
            {email}
          </Text>
        </View>
        <View style={styles.line} />
        <Subscription onClick={() => navigation.navigate('Pays')} />
        <View style={styles.line} />
        <ButtonUp
          label="О проекте"
          onPress={() => navigation.navigate('About')}
        />
        <View style={styles.line} />
        <ButtonUp
          label="Изменить пароль"
          onPress={() => navigation.navigate('EditPassword')}
        />
        <View style={styles.line} />
        <ButtonUp
          label="Политика конфиденциальности"
          onPress={() => {
            Linking.openURL('https://tm-coach.ru/policy/');
          }}
        />
        <ButtonUp
          label="Правила использования"
          onPress={() => {
            Linking.openURL('https://tm-coach.ru/rules/');
          }}
        />
        <ButtonUp
          label="Офферта"
          onPress={() => {
            Linking.openURL('https://tm-coach.ru/agreement/');
          }}
        />
        <View style={styles.line} />
        <ButtonUp
          label="Напишите нам"
          onPress={() => {
            Linking.openURL('mailto:support@tmcouch.com');
          }}
        />
        <View style={{ marginTop: 20, marginBottom: 60 }}>
          <Button onPress={logOut} title="Выход" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
  },
  container: {
    padding: 30,
    height: deviceHeight,
  },
  infoText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#5F5E5E',
  },
  line: {
    width: '100%',
    marginTop: 16,
    borderBottomColor: '#5F5E5E',
    borderBottomWidth: 1,
  },
});
