import React from 'react';
import { View, Image, Text, Pressable, StyleSheet } from 'react-native';

interface Props {
  label: string;
  onPress: () => void;
}

export const Back = ({ label, onPress }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.img} source={require('../assets/back.png')} />
        <Text style={styles.label} adjustsFontSizeToFit numberOfLines={1}>
          {' '}
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 25,
    fontWeight: '500',
    color: '#2E2E2E',
  },
  img: {
    height: 20,
    width: 10,
    marginRight: 5,
    marginLeft: 20,
  },
});
