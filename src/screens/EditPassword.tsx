import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { editPassword } from '../api/login';
import { Button, Header, Input } from '../components';
import { Back } from '../components/Back';
import { passwordValidator } from '../utils/validators';
import { Modal } from '../components/Modal';

export const EditPassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');

  const [repeatPassword, setRepeatPassword] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [errorModal, setErrorModal] = useState('');

  const onClick = async () => {
    if (oldPassword === '') {
      setOldPasswordError('Обязательное поле');
    }

    if (newPassword === '') {
      setNewPasswordError('Обязательное поле');
    }

    if (newPassword === '') {
      setRepeatPasswordError('Обязательное поле');
    }

    if (newPassword !== repeatPassword) {
      setNewPasswordError('Пароли не совпадают');
      setRepeatPasswordError('Пароли не совпадают');
    }

    if (
      oldPasswordError !== '' ||
      newPasswordError !== '' ||
      repeatPasswordError !== ''
    ) {
      return;
    }

    const payload = {
      oldPassword,
      newPassword,
    };

    try {
      const res = await editPassword(payload);
      if (res && (res.status === 200 || res.status === 201)) {
        setModalVisible(true);
        setErrorModal('Пароль успешно изменен');
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
    <View style={{ height: '100%' }}>
      <Header
        color="#5F5E5E"
        icon={require('../assets/icons/settings.png')}
        widthIcon={40}
        heightIcon={40}
        head="Настройки"
      />
      <ScrollView>
        <Back label="Смена пароля" onPress={() => navigation.goBack()} />
        <View style={styles.form}>
          <Input
            placeholder="Не меньше 8 символов"
            label="Старый пароль"
            value={oldPassword}
            onChangeText={setOldPassword}
            textError={oldPasswordError}
            onEndEditing={() =>
              passwordValidator({
                text: oldPassword,
                setError: setOldPasswordError,
              })
            }
            secureTextEntry
            autoCapitalize="none"
          />
          <Input
            placeholder="Не меньше 8 символов"
            label="Новый пароль"
            value={newPassword}
            onChangeText={setNewPassword}
            textError={newPasswordError}
            onEndEditing={() =>
              passwordValidator({
                text: newPassword,
                setError: setNewPasswordError,
              })
            }
            secureTextEntry
            autoCapitalize="none"
          />
          <Input
            placeholder="Не меньше 8 символов"
            label="Пароль повторно"
            value={repeatPassword}
            onChangeText={setRepeatPassword}
            textError={repeatPasswordError}
            onEndEditing={() =>
              passwordValidator({
                text: repeatPassword,
                setError: setRepeatPasswordError,
              })
            }
            secureTextEntry
            autoCapitalize="none"
          />
          <Button
            title="Сохранить"
            onPress={() => onClick()}
            style={{ marginTop: 40 }}
            disabled={
              oldPasswordError !== '' ||
              newPasswordError !== '' ||
              repeatPasswordError !== ''
            }
          />
        </View>
        <Modal
          modalVisible={modalVisible}
          setModalVisible={() => setModalVisible(false)}
          text={errorModal}
        />
      </ScrollView>
    </View>
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
