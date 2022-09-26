import React from 'react';
import { Pressable, ImageBackground, Text, StyleSheet } from 'react-native';
import { BASE_URL_HTTP } from '../api/api';

type Props = {
  name: string;
  path: string;
  onPress: () => void;
};

export const Category = ({ name, path, onPress }: Props) => {
  const image = { uri: `${BASE_URL_HTTP}${path}` };

  return (
    <Pressable onPress={onPress}>
      <ImageBackground style={styles.wrapper} source={image}>
        <Text style={styles.text} adjustsFontSizeToFit>
          {name}
        </Text>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    padding: 20,
    marginTop: 5,
  },
  text: {
    color: '#FFF',
    fontSize: 25,
    textAlign: 'center',
  },
});
