import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { forgotPassword } from '../api/login';
import { Button, Input } from '../components';
import { emailValidator } from '../utils/validators';
import { Modal } from '../components/Modal';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [errorModal, setErrorModal] = useState('');

  const onClick = async () => {
    if (email === '') {
      setEmailError('Обязательное поле');
    }

    if (emailError) {
      return;
    }

    const payload = {
      email,
    };

    try {
      const res = await forgotPassword(payload);
      if (res && (res.status === 200 || res.status === 201)) {
        setModalVisible(true);
        setErrorModal('На вашу почту был выслан временный пароль');
      }
    } catch (e) {
      setModalVisible(true);
      if (e.response.data.statusCode !== 500) {
        setErrorModal(e?.response?.data?.message);
      } else {
        setErrorModal('Что то пошло не так');
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.containerLogo}>
        <Image source={require('../assets/logo.png')} />
        <Text style={styles.text}>Сбросить пароль</Text>
      </View>
      <View style={styles.form}>
        <Input
          placeholder="sample@mail.ru"
          label="Введите почту"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          onEndEditing={() =>
            emailValidator({ text: email, setError: setEmailError })
          }
          textError={emailError}
        />
        <Button title="Сбросить" onPress={() => onClick()} />
        <Modal
          modalVisible={modalVisible}
          setModalVisible={() => setModalVisible(false)}
          text={errorModal}
        />
      </View>
    </ScrollView>
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
  text: {
    fontSize: 36,
    fontWeight: '200',
    marginTop: 35,
  },
  form: {
    width: '100%',
    padding: 30,
  },
  signIn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
});
