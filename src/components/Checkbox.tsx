import React, { FC } from 'react';
import { View, Text, Pressable, Image } from 'react-native';

type Props = {
  label: string;
  value: boolean;
  handleChange: () => void;
};

export const Checkbox: FC<Props> = ({ label, value, handleChange }) => (
  <View>
    <Pressable onPress={handleChange}>
      {value ? (
        <Image source={require('../assets/on.png')} />
      ) : (
        <Image source={require('../assets/off.png')} />
      )}
      <Text>{label}</Text>
    </Pressable>
  </View>
);
