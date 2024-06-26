import React from 'react';

import Form from './Form';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmarkCircle} from '@fortawesome/free-solid-svg-icons';

import {View, Modal, Pressable} from 'react-native';
import Toast from 'react-native-toast-message';
import {styles} from '../styles/modalComp/style';
import {Product} from '../models/product';

interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
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
        testID="modal"
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

export default ModalComp;
