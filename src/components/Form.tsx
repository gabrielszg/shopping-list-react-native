import React, {useState, useEffect} from 'react';

import {FormInput} from '../models/formInput';
import {Product} from '../models/product';
import {saveProduct, editProduct} from '../services/service';
import Toast from 'react-native-toast-message';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusCircle, faFloppyDisk} from '@fortawesome/free-solid-svg-icons';

import {SafeAreaView, Text, TextInput, View, Pressable} from 'react-native';
import {styles} from '../styles/form/style';

interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  editingProduct?: Product | null;
  onClose?: () => void;
}

function Form({
  products,
  setProducts,
  editingProduct,
  onClose,
}: Props): JSX.Element {
  const [input, setInput] = useState<FormInput>({
    name: editingProduct ? editingProduct.name : '',
    quantity: editingProduct ? String(editingProduct.quantity) : '',
  });

  useEffect(() => {
    if (editingProduct) {
      setInput({
        name: editingProduct.name,
        quantity: String(editingProduct.quantity),
      });
    } else {
      setInput({name: '', quantity: ''});
    }
  }, [editingProduct]);

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

  const handleSubmit = async () => {
    if (input.name.trim() === '') {
      return Toast.show({
        type: 'info',
        text1: 'Informe o nome do Produto!',
      });
    }

    if (editingProduct) {
      try {
        const productToEdit: Product = {
          ...editingProduct,
          name: input.name,
          quantity: Number(input.quantity),
        };

        const newProducts = await editProduct(products, productToEdit);
        setProducts(newProducts);

        Toast.show({
          type: 'success',
          text1: 'Produto atualizado com sucesso!',
          position: 'top',
        });

        if (onClose) {
          onClose();
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Erro ao atualizar produto!',
          position: 'top',
        });
      }
      return;
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
          <Text style={styles.text}>
            {editingProduct ? 'Editar Produto' : 'Novo Produto'}
          </Text>
          <TextInput
            testID="productName"
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
            testID="productQuantity"
            style={styles.inputQuantity}
            onChangeText={qtd => updateState('quantity', qtd)}
            value={input.quantity}
            placeholder="1"
            placeholderTextColor={'#808080'}
            keyboardType="numeric"
          />
        </View>
      </View>

      <Pressable testID="submit" style={styles.btnAdd} onPress={handleSubmit}>
        <FontAwesomeIcon
          icon={editingProduct ? faFloppyDisk : faPlusCircle}
          color={editingProduct ? '#fff' : '#008000'}
        />
        <Text style={styles.btnAddTitle}>
          {editingProduct ? 'Salvar' : 'Adicionar'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default Form;
