import React, {useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

import {SafeAreaView, Text, TextInput, View, Pressable} from 'react-native';
import {styles} from '../styles/form/style';

interface Product {
  products: any[];
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
}

function Form({products, setProducts}: Product): JSX.Element {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  let product = {
    id: 0,
    name: '',
    quantity: 1,
    isChecked: false,
  };

  const handleSubmit = () => {
    if (name === '') {
      return Toast.show({
        type: 'info',
        text1: 'Informe o nome do Produto!',
      });
    }

    product.id = Number(Math.random() * 100);
    product.name = name.toUpperCase();
    product.quantity =
      Number(quantity) > 1 ? Number(quantity) : product.quantity;

    const newProducts = [...products, product];
    setProducts(newProducts);
    AsyncStorage.setItem('products', JSON.stringify(newProducts));

    Toast.show({
      type: 'success',
      text1: 'Produto adicionado com sucesso!',
      position: 'top',
    });

    setName('');
    setQuantity('');
  };

  return (
    <SafeAreaView>
      <View style={styles.form}>
        <View>
          <Text style={styles.text}>Novo Produto</Text>
          <TextInput
            style={styles.inputNameProduct}
            placeholder="Exemplo: Arroz"
            placeholderTextColor={'#808080'}
            onChangeText={setName}
            value={name}
            onPressIn={() => Toast.hide()}
            onKeyPress={() => Toast.hide()}
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.viewQuantity}>
          <Text style={styles.text}>Qtd</Text>
          <TextInput
            style={styles.inputQuantity}
            onChangeText={setQuantity}
            value={quantity}
            placeholder="1"
            placeholderTextColor={'#808080'}
            keyboardType="numeric"
          />
        </View>
      </View>

      <Pressable style={styles.btnAdd} onPress={handleSubmit}>
        <FontAwesomeIcon icon={faPlusCircle} color="#008000" />
        <Text style={styles.btnAddTitle}>Adicionar</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default Form;
