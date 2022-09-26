import React, { FC } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';

type Props = {
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export const Button: FC<Props> = ({ onPress, title, style, disabled }) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={{ ...styles.wrapper, ...style }}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 40,
    backgroundColor: '#D25800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
  },
});
