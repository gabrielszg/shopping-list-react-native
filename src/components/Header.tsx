import React from 'react';

import {Text, StyleSheet, SafeAreaView, Image} from 'react-native';

function Header(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Minha Lista de Compras</Text>

      <Image source={require('../assets/list.png')} style={styles.logo} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 8,
    textAlign: 'center',
    color: '#000',
  },

  logo: {
    width: 75,
    height: 75,
    alignSelf: 'center',
  },
});

export default Header;
