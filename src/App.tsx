import React, {useState, useEffect} from 'react';

import Header from './components/Header';
import Grid from './components/Grid';
import ModalComp from './components/ModalComp';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash, faPlusCircle} from '@fortawesome/free-solid-svg-icons';

import {
  SafeAreaView,
  StyleSheet,
  Pressable,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Card from './components/Card';

interface Product {
  id: number;
  name: string;
  quantity: number;
  isChecked: boolean;
}

function App(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const getProducts = async () => {
    const getItemLocal = await AsyncStorage.getItem('products');

    if (getItemLocal !== null) {
      setProducts(JSON.parse(getItemLocal));
    }
  };

  const renderedCard = products.length === 0 ? true : false;
  const renderedButtonDeleteAll = products.length === 0 ? false : true;

  const showDeleteAllButtonAlert = () =>
    Alert.alert('Lista de compras', 'Deseja excluir todos os seus itens?', [
      {text: 'Cancelar'},
      {
        text: 'Ok',
        onPress: handleDeleteAll,
        style: 'default',
      },
    ]);

  const handleDeleteAll = () => {
    AsyncStorage.removeItem('products');
    setProducts([]);
  };

  useEffect(() => {
    getProducts();
  }, [setProducts]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />

      <Header />

      {renderedCard && <Card modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />}

      {renderedButtonDeleteAll && (
        <Pressable
          style={styles.btnDeleteAll}
          onPress={showDeleteAllButtonAlert}>
          <FontAwesomeIcon icon={faTrash} color="#c00" />
          <Text style={styles.btnDeleteAllTitle}>Excluir Todos</Text>
        </Pressable>
      )}

      <Grid products={products} setProducts={setProducts} />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.touchableOpacityStyle}
        onPress={() => setIsOpen(true)}>
        <FontAwesomeIcon
          icon={faPlusCircle}
          style={styles.floatingButtonStyle}
          size={60}
          color="#008000"
        />
      </TouchableOpacity>

      <ModalComp
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        products={products}
        setProducts={setProducts}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },

  btnDeleteAll: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    border: 'none',
    backgroundColor: 'rgb(57, 57, 226)',
    marginTop: 135,
    marginLeft: 15,
    position: 'absolute',
    top: 0,
    zIndex: 1,
    marginHorizontal: 5,
  },

  btnDeleteAllTitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 8,
  },

  viewGrid: {
    marginTop: 20,
  },

  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  floatingButtonStyle: {
    width: 70,
    height: 70,
  },
});

export default App;
