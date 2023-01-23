import React, { FC } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/ru';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { Icon } from './Icon';

const deviceWidth = Dimensions.get('window').width;

type Props = {
  name: string;
  createdAt: Date;
  lasting: number;
  onClick: (path: string) => void;
  onClickNotDemo: () => void;
  path: string;
  isDemo: boolean;
};

export const MeditationItem: FC<Props> = ({
  name,
  createdAt,
  lasting,
  onClick,
  path,
  isDemo,
  onClickNotDemo,
}) => {
  const { path: statePath, isPlaying } = useSelector(
    (state: RootState) => state.audio,
  );
  const { isSubscriber } = useSelector((state: RootState) => state.user);

  const minutes = Math.floor(lasting / 60);
  const seconds = Math.floor(lasting % 60);

  const isCurrentAudio = statePath === path;

  const date = moment(createdAt);
  date.locale('ru');
  const displayDate = date.format('DD MMMM YYYY');

  const disabled = !isDemo && !isSubscriber;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={disabled ? () => onClickNotDemo() : () => onClick(path)}>
        <View
          style={{
            ...styles.playButton,
            borderColor: isCurrentAudio
              ? '#D25800'
              : disabled
              ? 'gray'
              : 'black',
          }}>
          <Icon
            name={isPlaying && isCurrentAudio ? 'pause' : 'play'}
            color={isCurrentAudio ? '#D25800' : disabled ? 'gray' : 'black'}
            size="medium"
          />
        </View>
      </TouchableOpacity>
      <View style={{ width: '100%' }}>
        <TouchableOpacity
          onPress={disabled ? () => onClickNotDemo() : () => onClick(path)}>
          <Text
            style={{
              color: isCurrentAudio ? '#D25800' : disabled ? 'gray' : 'black',
              ...styles.name,
            }}>
            {name}
          </Text>
        </TouchableOpacity>
        <View style={styles.meta}>
          <Text style={{ color: disabled ? 'gray' : 'black' }}>
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </Text>
          <View
            style={{
              borderLeftColor: disabled ? 'gray' : 'black',
              ...styles.border,
            }}
          />
          <Text style={{ color: disabled ? 'gray' : 'black' }}>
            {displayDate}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 50,
    marginRight: 30,
  },
  playButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 50,
    marginRight: 10,
  },
  name: {
    width: deviceWidth * 0.8,
    fontSize: 18,
    fontWeight: '500',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  meta: {
    flexDirection: 'row',
  },
  border: {
    marginLeft: 20,
    paddingLeft: 20,
    borderLeftWidth: 1,
  },
});
