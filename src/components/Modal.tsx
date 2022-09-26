import React, { FC } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal as ModalRN,
} from 'react-native';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  text: string;
  buttonText?: string;
  buttonFn?: () => void;
}

export const Modal: FC<Props> = ({
  modalVisible,
  setModalVisible,
  text,
  buttonText,
  buttonFn,
}) => {
  return (
    <View style={styles.centeredView}>
      <ModalRN
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{text}</Text>
            <View style={styles.buttons}>
              <Pressable
                style={{
                  ...styles.button,
                  ...styles.buttonClose,
                  marginRight: buttonText ? 5 : 0,
                }}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textButtonClose}>Закрыть</Text>
              </Pressable>
              {buttonText && buttonFn && (
                <Pressable
                  style={[styles.button, styles.buttonOptions]}
                  onPress={() => buttonFn()}>
                  <Text style={styles.textStyle}>{buttonText}</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </ModalRN>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 70,
    borderRadius: 20,
    borderColor: '#D25800',
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },
  textButtonClose: {
    color: '#D25800',
  },
  buttonOptions: {
    backgroundColor: '#D25800',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
