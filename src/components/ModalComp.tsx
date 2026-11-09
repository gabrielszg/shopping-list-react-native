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
  editingProduct?: Product | null;
  onClose?: () => void;
}

function ModalComp({
  products,
  setProducts,
  modalIsOpen,
  setIsOpen,
  editingProduct,
  onClose,
}: Props): JSX.Element {
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setIsOpen(false);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        testID="modal"
        animationType="slide"
        transparent={true}
        visible={modalIsOpen}
        onRequestClose={handleClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              testID="modalCloseButton"
              style={styles.btnCloseModal}
              onPress={handleClose}>
              <FontAwesomeIcon icon={faXmarkCircle} size={20} />
            </Pressable>

            <Form
              key={editingProduct ? `edit-${editingProduct.id}` : 'create'}
              products={products}
              setProducts={setProducts}
              editingProduct={editingProduct}
              onClose={handleClose}
            />
          </View>
        </View>

        <Toast />
      </Modal>
    </View>
  );
}

export default ModalComp;
