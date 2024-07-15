/**
 * @format
 */

import 'react-native';
import {describe, it, expect, jest, beforeEach, afterEach} from '@jest/globals';
import {
  findAllProducts,
  removeAllproducts,
  removeProduct,
  saveProduct,
  updateProduct,
} from '../../src/services/service';
import {Product} from '../../src/models/product';
import AsyncStorage from '@react-native-async-storage/async-storage';

const productList: Product[] = [
  {
    id: 0,
    name: 'Arroz',
    quantity: 2,
    isChecked: false,
  },
  {
    id: 0,
    name: 'Feijão',
    quantity: 1,
    isChecked: false,
  },
];

const product: Product = {
  id: 0,
  name: 'Alho',
  quantity: 5,
  isChecked: false,
};

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('Service Test', () => {
  beforeEach(async () => {
    jest.resetModules();
    await AsyncStorage.setItem('products', JSON.stringify(productList));
  });

  afterEach(async () => await AsyncStorage.clear());

  it('when searching for all products returns successfully', async () => {
    const data = await findAllProducts();
    expect(data).toEqual(JSON.stringify(productList));
  });

  it('when it cannot search for all products it returns an error', async () => {
    jest.doMock('@react-native-async-storage/async-storage', () => {
      return {
        __esModule: true,
        getItem: jest.fn<() => Promise<never>>().mockRejectedValueOnce({
          message: "Cannot read properties of undefined (reading 'getItem')",
        }),
      };
    });

    const service = await import('../../src/services/service');
    await expect(service.findAllProducts()).rejects.toThrow(
      "Cannot read properties of undefined (reading 'getItem')",
    );
  });

  it('save product successfully', () => {
    const save = saveProduct(productList, product);
    expect(save.length).toEqual(3);
    expect(save[2].id).not.toBeNull();
    expect(save[2].name).toEqual('Alho');
    expect(save[2].quantity).toEqual(5);
    expect(save[2].isChecked).toEqual(false);
  });

  it('when the quantity is zero or less, switch to one', () => {
    product.quantity = 0;
    const save = saveProduct(productList, product);
    expect(save.length).toEqual(3);
    expect(save[2].id).not.toBeNull();
    expect(save[2].name).toEqual('Alho');
    expect(save[2].quantity).toEqual(1);
    expect(save[2].isChecked).toEqual(false);
  });

  it('when the product is checked update the list', () => {
    const update = updateProduct(productList, productList[0], true);
    expect(update.length).toEqual(2);
    expect(update[0].isChecked).toEqual(true);
  });

  it('when remove product return updated list', () => {
    const remove = removeProduct(productList, 1);
    expect(remove.length).toEqual(1);
    expect(remove[0].name).toEqual('Arroz');
    expect(remove[1]).toBeFalsy();
  });

  it('remove all products', async () => {
    removeAllproducts();
    const products = await AsyncStorage.getItem('products');
    expect(products).toBeNull();
  });
});
