import React, { FC } from 'react';
import { StyleSheet, View, Image, Text, ImageBackground } from 'react-native';

type Props = {
  background?: any;
  color?: string;
  icon: any;
  head: string;
  widthIcon: number;
  heightIcon: number;
};

export const Header: FC<Props> = ({
  background,
  icon,
  head,
  color,
  widthIcon,
  heightIcon,
}) => (
  <View>
    {background ? (
      <ImageBackground source={background} style={styles.preview}>
        <View style={styles.headerContainer}>
          <Image
            source={icon}
            style={{
              width: widthIcon,
              height: heightIcon,
              marginRight: 10,
              tintColor: '#FFF',
            }}
          />
          <Text style={styles.text}>{head}</Text>
        </View>
      </ImageBackground>
    ) : (
      <View style={[styles.preview, { backgroundColor: color }]}>
        <View style={styles.headerContainer}>
          <Image
            source={icon}
            style={{
              width: widthIcon,
              height: heightIcon,
              marginRight: 20,
              tintColor: '#FFF',
            }}
          />
          <Text style={styles.text}>{head}</Text>
        </View>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  preview: {
    width: '100%',
    height: 120,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    color: '#FFF',
    fontSize: 36,
  },
});
