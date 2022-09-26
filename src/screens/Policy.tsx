import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Back, Header } from '../components';

export const Policy = ({ navigation }) => {
  return (
    <View style={{ height: '100%' }}>
      <Header
        color="#5F5E5E"
        icon={require('../assets/icons/settings.png')}
        widthIcon={40}
        heightIcon={40}
        head="Настройки"
      />
      <Back
        label="Политика конфеденциальности"
        onPress={() => navigation.goBack()}
      />
      <WebView
        style={{
          height: '100%',
          width: '100%',
        }}
        source={{ uri: 'https://tm-coach.ru/policy/' }}
      />
    </View>
  );
};
