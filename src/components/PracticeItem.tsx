import React, { FC } from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from '../api/api';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';

type Props = {
  id: number;
  name: string;
  path: string;
  previewImgPath: string;
  lasting: number;
  createdAt: string;
  onClick: (path: string) => void;
  onClickNotDemo: () => void;
  isDemo: boolean;
};

export const PracticeItem: FC<Props> = ({
  name,
  path,
  previewImgPath,
  lasting,
  createdAt,
  onClick,
  isDemo,
  onClickNotDemo,
}) => {
  const { expiredSubscription } = useSelector((state: RootState) => state.user);

  const date = moment(createdAt);
  date.locale('ru');
  const displayDate = date.format('DD MMMM YYYY');

  const disabled = !isDemo && !expiredSubscription;

  const minutes = Math.floor(lasting / 60);
  const seconds = lasting % 60;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: `${BASE_URL}${previewImgPath}` }}
        style={{
          width: 140,
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: '3%',
        }}>
        <TouchableOpacity
          onPress={disabled ? () => onClickNotDemo() : () => onClick(path)}>
          <View
            style={{
              borderColor: disabled ? 'gray' : '#FFF',
              ...styles.button,
            }}>
            <Ionicons
              style={{
                alignSelf: 'center',
                backgroundColor: 'transparent',
                color: disabled ? 'gray' : '#FFF',
                marginLeft: 3,
              }}
              name={'play'}
              size={24}
            />
          </View>
        </TouchableOpacity>
      </ImageBackground>
      <View
        style={{
          flex: 1,
          height: 80,
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{ color: disabled ? 'gray' : '#000', ...styles.name }}
          adjustsFontSizeToFit>
          {name}
        </Text>
        <View style={styles.meta}>
          <Text
            style={{
              color: disabled ? 'gray' : '#000',
            }}
            adjustsFontSizeToFit>
            {minutes}:{seconds}
          </Text>
          <View style={styles.border} />
          <Text
            style={{ color: disabled ? 'gray' : '#000' }}
            adjustsFontSizeToFit>
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
    marginBottom: 30,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  meta: {
    flexDirection: 'row',
  },
  border: {
    marginLeft: 10,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#000',
  },
});
