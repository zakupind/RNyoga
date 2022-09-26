import { View, Text, StyleSheet } from 'react-native';
import { Button } from './Button';
import { FC } from 'react';

interface Props {
  period: string;
  value: number;
  amountFromMonth?: number;
  benefit?: number;
  onClick: () => Promise<any>;
}

export const Tariff: FC<Props> = ({
  period,
  value,
  amountFromMonth,
  benefit,
  onClick,
}) => (
  <View style={styles.wrapper}>
    <View style={{ marginBottom: 16 }}>
      <Text style={{ ...styles.font, ...styles.title }}>{period}</Text>
      <Text style={{ ...styles.font, ...styles.title }}>{value} рублей</Text>
    </View>
    {amountFromMonth && benefit ? (
      <View style={{ marginBottom: 16 }}>
        <Text style={styles.font}>{amountFromMonth} руб./мес.</Text>
        <Text style={styles.font}>Экономия {benefit}%</Text>
      </View>
    ) : (
      <Text style={{ marginBottom: 16 }}>Базовый тариф</Text>
    )}
    <Button title="Выбрать" onPress={() => onClick()} />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    borderColor: '#D25800',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  font: {
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    fontWeight: '600',
  },
});
