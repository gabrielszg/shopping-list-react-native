/**
 * @format
 */

import 'react-native';
import {describe, it, expect, jest, beforeEach, afterEach} from '@jest/globals';
import {
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Find all products', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it('when searching for all products returns successfully', async () => {
      jest.doMock('../../src/services/service', () => {
        return {
          __esModule: true,
          findAllProducts: jest
            .fn<() => Promise<string>>()
            .mockResolvedValueOnce(JSON.stringify(productList)),
        };
      });

      const service = await import('../../src/services/service');
      const data = await service.findAllProducts();
      expect(data).toEqual(JSON.stringify(productList));
    });

    it('When it cannot search for all products it returns an error', async () => {
      jest.doMock('../../src/services/service', () => {
        return {
          __esModule: true,
          findAllProducts: jest
            .fn<() => Promise<never>>()
            .mockRejectedValueOnce(new Error('error')),
        };
      });

      const service = await import('../../src/services/service');
      await expect(service.findAllProducts()).rejects.toThrow('error');
    });
  });

  describe('Service Test without mocks', () => {
    beforeEach(async () => {
      await AsyncStorage.setItem('products', JSON.stringify(productList));
    });

    afterEach(async () => await AsyncStorage.clear());

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
  });
});
