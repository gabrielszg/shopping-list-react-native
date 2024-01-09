import React from 'react';

import Form from './Form';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmarkCircle} from '@fortawesome/free-solid-svg-icons';

import {View, Modal, Pressable, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';

interface Props {
  products: any[];
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
  modalIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalComp({
  products,
  setProducts,
  modalIsOpen,
  setIsOpen,
}: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(!modalIsOpen);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.btnCloseModal}
              onPress={() => setIsOpen(!modalIsOpen)}>
              <FontAwesomeIcon icon={faXmarkCircle} size={20} />
            </Pressable>

            <Form products={products} setProducts={setProducts} />
          </View>
        </View>

        <Toast />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    /* marginTop: 120, */
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  btnCloseModal: {
    alignSelf: 'flex-end',
  },
});

export default ModalComp;
