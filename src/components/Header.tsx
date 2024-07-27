import React from 'react';

import {Text, SafeAreaView, Image} from 'react-native';
import {styles} from '../styles/header/style';

function Header(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Minha Lista de Compras</Text>

      <Image
        testID="img"
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
    </SafeAreaView>
  );
}

export default Header;
