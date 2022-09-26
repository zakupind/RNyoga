import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

type Props = {
  onPress: () => void;
  title: string;
};

export const ButtonLink: FC<Props> = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: {
    color: '#2E2E2E',
    textDecorationLine: 'underline',
    textDecorationColor: '#2E2E2E',
  },
});
