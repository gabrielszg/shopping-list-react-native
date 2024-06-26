import React, {useState, useEffect} from 'react';

import Header from './components/Header';
import Grid from './components/Grid';
import ModalComp from './components/ModalComp';

import {Product} from './models/product';
import {findAllProducts, removeAllproducts} from './services/service';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash, faPlusCircle} from '@fortawesome/free-solid-svg-icons';

import {
  SafeAreaView,
  Pressable,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Card from './components/Card';
import {styles} from './styles/index/style';

function App(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const getProducts = () => {
    findAllProducts().then(result => {
      if (result !== null) {
        setProducts(JSON.parse(String(result)));
      }
    }).catch;
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
    removeAllproducts();
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
          testID="deleteAllButton"
          style={styles.btnDeleteAll}
          onPress={showDeleteAllButtonAlert}>
          <FontAwesomeIcon icon={faTrash} color="#c00" />
          <Text style={styles.btnDeleteAllTitle}>Excluir Todos</Text>
        </Pressable>
      )}

      <Grid products={products} setProducts={setProducts} />

      <TouchableOpacity
        testID="floatingButton"
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

export default App;
