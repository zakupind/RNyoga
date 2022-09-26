import React, { FC } from 'react';
import {
  TextInputProps,
  TextInput,
  StyleSheet,
  View,
  Text,
} from 'react-native';

type Props = {
  label: string;
  textError?: string;
};

export const Input: FC<TextInputProps & Props> = props => (
  <View style={styles.wrapper}>
    <Text style={styles.label}>{props.label}</Text>
    <TextInput
      style={{
        ...styles.input,
        borderBottomColor: props.textError ? 'red' : 'black',
      }}
      {...props}
    />
    {props.textError !== '' && (
      <Text style={styles.error}>{props.textError}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    padding: 10,
  },
  label: {
    fontWeight: '600',
  },
  input: {
    height: 40,
    width: '100%',
    borderBottomWidth: 1,
    fontStyle: 'italic',
  },
  error: {
    fontStyle: 'italic',
    color: 'red',
  },
});
