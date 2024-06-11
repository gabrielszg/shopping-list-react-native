/**
 * @format
 */

import 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {removeData, retrieveData, storeData} from '../../src/repositories/api';
import {Product} from '../../src/models/product';

import {describe, it, expect, jest} from '@jest/globals';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('Api AsyncStorage', () => {
  it('when passing the product list it saves correctly', async () => {
    const productList: Product[] = [
      {
        id: 120,
        name: 'Arroz',
        quantity: 2,
        isChecked: false,
      },
      {
        id: 50,
        name: 'Feijão',
        quantity: 1,
        isChecked: false,
      },
    ];
    await storeData(productList);
    expect(AsyncStorage.setItem).toBeCalledWith(
      'products',
      JSON.stringify(productList),
    );
  });

  it('when you enter the correct key, the list of saved products returns', async () => {
    await retrieveData();
    expect(AsyncStorage.getItem).toBeCalledWith('products');
  });

  it('remove by passing the correct key', async () => {
    await removeData();
    expect(AsyncStorage.removeItem).toBeCalledWith('products');
  });
});
