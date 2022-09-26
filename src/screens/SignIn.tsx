import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { login } from '../api/login';
import { Button } from '../components/Button';
import { ButtonLink } from '../components/ButtonLink';
import { Input } from '../components/Input';
import { setUser } from '../store/slices/user';
import { emailValidator, passwordValidator } from '../utils/validators';
import { Modal } from '../components/Modal';

export const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModal, setErrorModal] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onClick = async () => {
    const payload = {
      email,
      password,
    };

    if (email === '') {
      setEmailError('Обязательное поле');
    }

    if (password === '') {
      setPasswordError('Обязательное поле');
    }

    if (emailError || passwordError) {
      return;
    }

    try {
      const res = await login(payload);
      if (res && res.data && res.data.email) {
        dispatch(setUser(res.data));
      }
    } catch (e) {
      setModalVisible(true);
      if (e?.response?.data?.statusCode === 404) {
        setErrorModal(e?.response?.data?.message);
      } else if (e?.response?.data?.statusCode === 401) {
        setErrorModal(e?.response?.data?.message);
      } else {
        setErrorModal('Что то пошло не так');
      }
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setErrorModal('');
  };

  const redirectModal = () => {
    closeModal();
    navigation.navigate('SignUp');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.containerLogo}>
          <Image source={require('../assets/logo.png')} />
          <Text style={styles.text}>Авторизация</Text>
        </View>
        <View style={styles.form}>
          <Input
            placeholder="Ваш email"
            label="Адрес электронной почты"
            value={email}
            onChangeText={setEmail}
            onEndEditing={() =>
              emailValidator({ text: email, setError: setEmailError })
            }
            textError={emailError}
            autoCapitalize="none"
          />
          <Input
            placeholder="Ваш пароль"
            label="Пароль"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            textError={passwordError}
            onEndEditing={() =>
              passwordValidator({ text: password, setError: setPasswordError })
            }
            autoCapitalize="none"
          />
          <View style={styles.buttonLinkContainer}>
            <ButtonLink
              title="Не можете вспомнить пароль ?"
              onPress={() => navigation.navigate('ForgotPassword')}
            />
          </View>
          <Button title="Войти" onPress={() => onClick()} />
        </View>
        <View style={styles.signUp}>
          <Text>Ещё нет учетной записи?</Text>
          <ButtonLink
            title="Зарегестрируйтесь!"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
        <Modal
          modalVisible={modalVisible}
          setModalVisible={closeModal}
          text={errorModal}
          buttonText="Регистрация!"
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
    marginTop: '20%',
  },
  buttonLinkContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: '5%',
  },
  text: {
    fontSize: 36,
    fontWeight: '200',
    marginTop: 35,
  },
  form: {
    width: '100%',
    padding: 30,
  },
  signUp: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
