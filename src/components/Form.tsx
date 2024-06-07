import React, {useState} from 'react';

import {FormInput} from '../models/formInput';
import {Product} from '../models/product';
import {saveProduct} from '../services/service';
import Toast from 'react-native-toast-message';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

import {SafeAreaView, Text, TextInput, View, Pressable} from 'react-native';
import {styles} from '../styles/form/style';

interface Props {
  products: any[];
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
}

function Form({products, setProducts}: Props): JSX.Element {
  const [input, setInput] = useState<FormInput>({name: '', quantity: ''});

  const updateState = (key: string, value: string) => {
    setInput(oldState => ({
      ...oldState,
      [key]: value,
    }));
  };

  let product: Product = {
    id: 0,
    name: '',
    quantity: 1,
    isChecked: false,
  };

  const handleSubmit = () => {
    if (input.name === '') {
      return Toast.show({
        type: 'info',
        text1: 'Informe o nome do Produto!',
      });
    }

    const nameToUpperCase = input.name.toUpperCase();
    const quantityStringToNumber = Number(input.quantity);

    product.name = nameToUpperCase;
    product.quantity = quantityStringToNumber;

    const newProducts = saveProduct(products, product);
    setProducts(newProducts);

    Toast.show({
      type: 'success',
      text1: 'Produto adicionado com sucesso!',
      position: 'top',
    });

    setInput({name: '', quantity: ''});
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
            onChangeText={name => updateState('name', name)}
            value={input.name}
            onPressIn={() => Toast.hide()}
            onKeyPress={() => Toast.hide()}
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.viewQuantity}>
          <Text style={styles.text}>Qtd</Text>
          <TextInput
            style={styles.inputQuantity}
            onChangeText={qtd => updateState('quantity', qtd)}
            value={input.quantity}
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
