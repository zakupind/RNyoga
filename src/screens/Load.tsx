import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export const Load = () => {
  return (
    <View style={{ height: '100%' }}>
      <View style={styles.containerLogo}>
        <Image source={require('../assets/logo.png')} />
      </View>
      <View style={styles.wrapper}>
        <Text style={{ ...styles.text, ...styles.text1 }}>Исцеляющая</Text>
        <Text style={{ ...styles.text, ...styles.text2 }}>медитация</Text>
        <Text style={{ ...styles.text, ...styles.text3 }}>для тела и души</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLogo: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 100,
  },
  wrapper: {
    justifyContent: 'center',
    height: '50%',
    paddingHorizontal: 40,
    fontStyle: 'italic',
  },
  text: {
    color: '#D25800',
    fontWeight: '200',
    fontSize: 30,
  },
  text1: {
    textAlign: 'left',
  },
  text2: {
    textAlign: 'center',
  },
  text3: {
    textAlign: 'right',
  },
});
