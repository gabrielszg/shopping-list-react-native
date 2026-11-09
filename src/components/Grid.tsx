import React, {useEffect, useState} from 'react';

import {Product} from '../models/product';
import {removeProduct, updateProduct} from '../services/service';
import CheckBox from '@react-native-community/checkbox';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash, faPen} from '@fortawesome/free-solid-svg-icons';

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
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onEditProduct?: (product: Product) => void;
}

function Grid({products, setProducts, onEditProduct}: Props): JSX.Element {
  const [isSelected, setSelection] = useState<boolean[]>([]);

  const handleCheckboxChange = (index: number) => {
    const isChecked = updatedCheckedState(index);
    const productEdit = products[index];

    updateProduct(products, productEdit, isChecked);
  };

  const updatedCheckedState = (position: number) => {
    const updateArray = isSelected.map((item, index) =>
      index === position ? !item : item,
    );

    setSelection(updateArray);

    return updateArray[position];
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
    const newArray = removeProduct(products, index);
    setProducts(newArray);
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
            testID="checkbox"
            value={item.isChecked}
            onChange={() => handleCheckboxChange(index)}
            tintColors={{true: '#008000', false: '#000'}}
          />
          <Text
            testID="textName"
            style={
              item.isChecked ? styles.textNameStrikethrough : styles.textName
            }>
            {item.name}
          </Text>
        </View>
        <Text style={styles.textQuantity}>{item.quantity}</Text>
        <View style={styles.viewActions}>
          <Pressable
            testID="editButton"
            style={styles.btnEdit}
            onPress={() => onEditProduct && onEditProduct(item)}>
            <FontAwesomeIcon icon={faPen} color="#0000ff" size={18} />
          </Pressable>
          <Pressable
            testID="deleteButton"
            onPress={() => showDeleteButtonAlert(index)}>
            <FontAwesomeIcon icon={faTrash} color="#c00" size={20} />
          </Pressable>
        </View>
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
