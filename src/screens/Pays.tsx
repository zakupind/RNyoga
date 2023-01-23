import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Linking } from 'react-native';
import { api, BASE_URL } from '../api/api';
import { Back, Header, Modal } from '../components';
import { Tariff } from '../components/Tariff';

const products = [
  {
    name: 'oneMonth',
    period: '1 месяц',
    value: 490,
  },
  {
    name: 'threeMonth',
    period: '3 месяца',
    value: 1308,
    amountFromMonth: 436,
    benefit: 11,
  },
  {
    name: 'sixMonth',
    period: '6 месяцев',
    value: 2293,
    amountFromMonth: 382,
    benefit: 22,
  },
];

export const Pays = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModal, setErrorModal] = useState('');

  const closeModal = () => {
    setModalVisible(false);
    setErrorModal('');
  };

  const onClick = async (product: string) => {
    try {
      const params = { product };
      const res = await api.post(`${BASE_URL}/payment/pay`, params);

      Linking.openURL(res.data.url);
    } catch (e) {
      setModalVisible(true);
      setErrorModal('Что то пошло не так');
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
        <Back label="Подписка" onPress={() => navigation.goBack()} />
        <View style={styles.wrapper}>
          <Text style={styles.subtitle}>
            Активировав подписку вы получите доступ ко всем медитациям в
            приложении.
          </Text>
          {products.map(p => (
            <Tariff {...p} onClick={() => onClick(p.name)} />
          ))}
        </View>
      </ScrollView>
      <Modal
        modalVisible={modalVisible}
        setModalVisible={closeModal}
        text={errorModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#2E2E2E',
  },
});
