import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { signup } from '../api/login';

import { Button } from '../components/Button';
import { ButtonLink } from '../components/ButtonLink';
import { Input } from '../components/Input';
import { setUser } from '../store/slices/user';
import { Modal } from '../components/Modal';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../utils/validators';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [errorModal, setErrorModal] = useState('');

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [repeatPassword, setRepeatPassword] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');

  const onSubmit = async () => {
    if (name === '') {
      setNameError('Обязательное поле');
    }

    if (email === '') {
      setEmailError('Обязательное поле');
    }

    if (password === '') {
      setPasswordError('Обязательное поле');
    }

    if (repeatPassword === '') {
      setRepeatPasswordError('Обязательное поле');
    }

    if (password !== repeatPassword) {
      setPasswordError('Пароли не совпадают');
      setRepeatPasswordError('Пароли не совпадают');
    }

    if (!consent) {
      setConsentError(true);
    }

    if (
      emailError ||
      nameError ||
      passwordError ||
      repeatPasswordError ||
      consentError
    ) {
      return;
    }

    if (password === repeatPassword && consent) {
      const payload = { name, email, password };

      try {
        const res = await signup(payload);

        if (res && res.data && res.data.email) {
          dispatch(setUser(res.data));
        }
      } catch (e) {
        setModalVisible(true);
        if (e?.response?.data?.statusCode === 401) {
          setErrorModal(e?.response?.data?.message);
        } else {
          setErrorModal('Что то пошло не так');
        }
      }
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setErrorModal('');
  };

  const redirectModal = () => {
    closeModal();
    navigation.navigate('SignIn');
  };

  const consentClick = () => {
    setConsent(!consent);
    setConsentError(false);
  };

  const textColor = consentError ? 'red' : '#000';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <ScrollView style={{ width: deviceWidth, height: deviceHeight }}>
        <View style={{ marginTop: 30, marginBottom: 60 }}>
          <View style={styles.containerLogo}>
            <Image source={require('../assets/logo.png')} />
            <Text style={{ ...styles.text, ...styles.heading }}>
              Регистрация
            </Text>
          </View>
          <View style={styles.form}>
            <Input
              placeholder="Ваше имя"
              label="Имя"
              value={name}
              onChangeText={setName}
              onEndEditing={() =>
                nameValidator({ text: name, setError: setNameError })
              }
              textError={nameError}
            />
            <Input
              placeholder="simple@mail.ru"
              label="Адрес электронной почты"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              onEndEditing={() =>
                emailValidator({ text: email, setError: setEmailError })
              }
              textError={emailError}
            />
            <Input
              placeholder="Не меньше 8 символов"
              label="Пароль"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
              textError={passwordError}
              onEndEditing={() =>
                passwordValidator({
                  text: password,
                  setError: setPasswordError,
                })
              }
              autoCapitalize="none"
            />
            <Input
              placeholder="Не меньше 8 символов"
              label="Пароль повторно"
              value={repeatPassword}
              secureTextEntry
              onChangeText={setRepeatPassword}
              textError={repeatPasswordError}
              onEndEditing={() =>
                passwordValidator({
                  text: repeatPassword,
                  setError: setRepeatPasswordError,
                })
              }
              autoCapitalize="none"
            />
            <View style={styles.consent}>
              <Pressable onPress={() => consentClick()}>
                {consent ? (
                  <Image
                    source={require('../assets/on.png')}
                    style={{ marginRight: 15, width: 25, height: 25 }}
                  />
                ) : (
                  <Image
                    source={require('../assets/off.png')}
                    style={{ marginRight: 15, width: 25, height: 25 }}
                  />
                )}
              </Pressable>
              <View>
                <View style={styles.textWrapper}>
                  <Text
                    style={{
                      fontStyle: 'italic',
                      marginRight: 3,
                      color: textColor,
                    }}>
                    Даю
                  </Text>
                  <ButtonLink
                    title="согласие на обработку"
                    onPress={() => navigation.navigate('Policy')}
                  />
                  <Text
                    style={{
                      fontStyle: 'italic',
                      marginLeft: 3,
                      color: textColor,
                    }}>
                    моих
                  </Text>
                </View>
                <Text style={{ fontStyle: 'italic', color: textColor }}>
                  персональных данных
                </Text>
              </View>
            </View>
            <Button title="Зарегистрироваться" onPress={() => onSubmit()} />
          </View>
          <View style={styles.signIn}>
            <Text style={styles.text}>Регистрировались раннее? </Text>
            <ButtonLink
              title="Войдите!"
              onPress={() => navigation.navigate('SignIn')}
            />
          </View>
        </View>
        <Modal
          modalVisible={modalVisible}
          setModalVisible={closeModal}
          text={errorModal}
          buttonText="Авторизация!"
          buttonFn={() => redirectModal()}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerLogo: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 100,
  },
  buttonLinkContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 40,
  },
  heading: {
    fontSize: 36,
    fontWeight: '200',
    marginTop: 35,
  },
  text: {
    color: '#2E2E2E',
  },
  form: {
    width: '100%',
    padding: 30,
  },
  consent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 40,
  },
  textWrapper: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  signIn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
