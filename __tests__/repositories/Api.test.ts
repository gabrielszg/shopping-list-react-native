/**
 * @format
 */

import 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {removeData, retrieveData, storeData} from '../../src/repositories/api';
import {Product} from '../../src/models/product';

import {describe, it, expect, jest, beforeEach} from '@jest/globals';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('Api AsyncStorage', () => {
  beforeEach(() => {
    jest.resetModules();
  });

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

  it('when passing the product list it saves correctly', async () => {
    await storeData(productList);
    expect(AsyncStorage.setItem).toBeCalledWith(
      'products',
      JSON.stringify(productList),
    );
  });

  it('When unable to save the products, an error message returns', async () => {
    jest.doMock('@react-native-async-storage/async-storage', () => {
      return {
        __esModule: true,
        setItem: jest.fn<() => Promise<never>>().mockRejectedValue({
          message: 'Cannot read properties of undefined (reading "setItem")',
        }),
      };
    });

    const storage = await import('../../src/repositories/api');

    await expect(storage.storeData(productList)).rejects.toThrow(
      "Cannot read properties of undefined (reading 'setItem')",
    );
  });

  it('when you enter the correct key, the list of saved products returns', async () => {
    await retrieveData();
    expect(AsyncStorage.getItem).toBeCalledWith('products');
  });

  it('when unable to return all products return error message', async () => {
    jest.doMock('@react-native-async-storage/async-storage', () => {
      return {
        __esModule: true,
        getItem: jest.fn<() => Promise<never>>().mockRejectedValue({
          message: 'Cannot read properties of undefined (reading "getItem")',
        }),
      };
    });

    const storage = await import('../../src/repositories/api');

    await expect(storage.retrieveData()).rejects.toThrow(
      "Cannot read properties of undefined (reading 'getItem')",
    );
  });

  it('remove by passing the correct key', async () => {
    await removeData();
    expect(AsyncStorage.removeItem).toBeCalledWith('products');
  });

  it('when unable to remove the products, an error message returns', async () => {
    jest.doMock('@react-native-async-storage/async-storage', () => {
      return {
        __esModule: true,
        removeItem: jest.fn<() => Promise<never>>().mockRejectedValue({
          message: 'Cannot read properties of undefined (reading "removeItem")',
        }),
      };
    });

    const storage = await import('../../src/repositories/api');

    await expect(storage.removeData()).rejects.toThrow(
      "Cannot read properties of undefined (reading 'removeItem')",
    );
  });
});
