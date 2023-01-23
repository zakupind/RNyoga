import moment from 'moment';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { Button } from './Button';

export const Subscription = ({ onClick }: { onClick: () => void }) => {
  const { expiredSubscription } = useSelector((state: RootState) => state.user);

  const buttonText = expiredSubscription ? 'Редактировать' : 'Активировать';

  return (
    <View style={styles.wrapper}>
      {expiredSubscription ? (
        <View>
          <Text style={styles.text}>
            Подписка активна до:{' '}
            {moment(expiredSubscription).format('DD.MM.YYYY')}
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.text}>Подписка:</Text>
          <Text style={styles.text}>неактивна</Text>
        </View>
      )}
      <Button
        title={buttonText}
        onPress={() => onClick()}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 4,
  },
  button: {
    marginTop: 10,
  },
  text: {
    color: '#2E2E2E',
  },
});
