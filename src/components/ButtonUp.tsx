import React from 'react';
import { View, Image, Text, Pressable, StyleSheet } from 'react-native';

interface Props {
  label: string;
  onPress: () => void;
}

export const ButtonUp = ({ label, onPress }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Image style={styles.img} source={require('../assets/up.png')} />
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
    fontSize: 18,
    fontWeight: '200',
  },
  img: {
    height: 20,
    width: 10,
    marginLeft: 10,
  },
});
