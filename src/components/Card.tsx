import React from 'react';

import {View, Text, StyleSheet, Pressable} from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 160,
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 8,
    textAlign: 'center',
    color: '#000',
  },

  body: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },

  btnAddNewList: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
    padding: 10,
    borderRadius: 5,
    border: 'none',
    backgroundColor: 'rgb(57, 57, 226)',
  },

  titleBtnAddNewList: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Card;
