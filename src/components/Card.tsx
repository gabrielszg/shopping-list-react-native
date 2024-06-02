import React from 'react';

import {View, Text, Pressable} from 'react-native';
import {styles} from '../styles/card/style';

interface Props {
  modalIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Card({modalIsOpen, setIsOpen}: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sua lista de compras está vazia!</Text>

      <Text style={styles.body}>Adicione itens a sua lista de compras</Text>

      <Pressable
        style={styles.btnAddNewList}
        onPress={() => setIsOpen(!modalIsOpen)}>
        <Text style={styles.titleBtnAddNewList}>Começar minha lista</Text>
      </Pressable>
    </View>
  );
}

export default Card;
