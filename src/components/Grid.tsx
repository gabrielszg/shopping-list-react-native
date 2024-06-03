import React, {useEffect, useState} from 'react';

import {Product} from '../models/product';
import {storeData} from '../services/api';
import CheckBox from '@react-native-community/checkbox';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

import {
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  View,
  ListRenderItemInfo,
  Alert,
} from 'react-native';
import {styles} from '../styles/grid/style';

interface Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
}

function Grid({products, setProducts}: Props): JSX.Element {
  const [isSelected, setSelection] = useState<boolean[]>([]);

  const handleCheckboxChange = (index: number) => {
    const isChecked = updatedCheckedState(index);
    const productEdit = products[index];

    if (isChecked) {
      checkedProductCheckbox(productEdit);
    } else {
      uncheckedProductCheckbox(productEdit);
    }
  };

  const updatedCheckedState = (position: number) => {
    const updateArray = isSelected.map((item, index) =>
      index === position ? !item : item,
    );

    setSelection(updateArray);

    return updateArray[position];
  };

  const checkedProductCheckbox = (product: Product) => {
    const index = products.indexOf(product);
    let newArray = [...products];

    product.isChecked = true;
    newArray[index] = product;

    setProducts(newArray);
    storeData(newArray);
  };

  const uncheckedProductCheckbox = (product: Product) => {
    const index = products.indexOf(product);
    let newArray = [...products];

    product.isChecked = false;
    newArray[index] = product;

    setProducts(newArray);
    storeData(newArray);
  };

  const showDeleteButtonAlert = (index: number): void =>
    Alert.alert('Lista de compras', 'Deseja excluir este item?', [
      {text: 'Cancelar'},
      {
        text: 'Ok',
        onPress: () => handleDelete(index),
        style: 'default',
      },
    ]);

  const handleDelete = (index: number): void => {
    const product = products[index];

    products.splice(index, 1);

    const newArray = products.filter(item => item !== product);

    setProducts(newArray);
    storeData(newArray);
  };

  useEffect(() => {
    setSelection(new Array(products.length));
    const newChecked = products.map(item => item.isChecked);
    setSelection(newChecked);
  }, [products]);

  const renderItem = ({item, index}: ListRenderItemInfo<Product>) => {
    return (
      <View style={styles.viewList}>
        <View style={styles.viewCheckboxName}>
          <CheckBox
            value={item.isChecked}
            onChange={() => handleCheckboxChange(index)}
            tintColors={{true: '#008000', false: '#000'}}
          />
          <Text
            style={
              item.isChecked ? styles.textNameStrikethrough : styles.textName
            }>
            {item.name}
          </Text>
        </View>
        <Text style={styles.textQuantity}>{item.quantity}</Text>
        <Pressable onPress={() => showDeleteButtonAlert(index)}>
          <FontAwesomeIcon icon={faTrash} color="#c00" size={20} />
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
      />
    </SafeAreaView>
  );
}

export default Grid;
