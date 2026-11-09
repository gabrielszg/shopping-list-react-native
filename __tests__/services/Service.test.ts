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
  editProduct,
  normalizeQuantity,
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

  describe('normalizeQuantity', () => {
    it('returns positive numbers correctly', () => {
      expect(normalizeQuantity(5)).toEqual(5);
      expect(normalizeQuantity('10')).toEqual(10);
    });

    it('preserves valid decimal quantities without truncating or rounding', () => {
      expect(normalizeQuantity(2.5)).toEqual(2.5);
      expect(normalizeQuantity('3.75')).toEqual(3.75);
    });

    it('returns 1 for zero or negative values', () => {
      expect(normalizeQuantity(0)).toEqual(1);
      expect(normalizeQuantity(-2)).toEqual(1);
      expect(normalizeQuantity('-5.5')).toEqual(1);
    });

    it('returns 1 for non-numeric, empty or invalid values (NaN, Infinity)', () => {
      expect(normalizeQuantity('abc')).toEqual(1);
      expect(normalizeQuantity('')).toEqual(1);
      expect(normalizeQuantity(NaN)).toEqual(1);
      expect(normalizeQuantity(Infinity)).toEqual(1);
      expect(normalizeQuantity(-Infinity)).toEqual(1);
    });
  });

  describe('editProduct', () => {
    const initialList: Product[] = [
      {id: 10, name: 'ARROZ', quantity: 2, isChecked: false},
      {id: 20, name: 'FEIJÃO', quantity: 1, isChecked: true},
      {id: 30, name: 'MACARRÃO', quantity: 3, isChecked: false},
    ];

    it('edits both name and quantity successfully and persists to AsyncStorage', async () => {
      const updated = await editProduct(initialList, {
        id: 20,
        name: 'feijão preto',
        quantity: 4,
        isChecked: true,
      });

      expect(updated.length).toEqual(3);
      expect(updated[1]).toEqual({
        id: 20,
        name: 'FEIJÃO PRETO',
        quantity: 4,
        isChecked: true,
      });

      const stored = await AsyncStorage.getItem('products');
      expect(stored).toEqual(JSON.stringify(updated));
    });

    it('edits only name while keeping original quantity and isChecked', async () => {
      const updated = await editProduct(initialList, {
        id: 10,
        name: 'arroz integral',
        quantity: 2,
        isChecked: false,
      });

      expect(updated[0].name).toEqual('ARROZ INTEGRAL');
      expect(updated[0].quantity).toEqual(2);
      expect(updated[0].isChecked).toEqual(false);
    });

    it('edits only quantity while keeping original name', async () => {
      const updated = await editProduct(initialList, {
        id: 30,
        name: 'MACARRÃO',
        quantity: 5,
        isChecked: false,
      });

      expect(updated[2].name).toEqual('MACARRÃO');
      expect(updated[2].quantity).toEqual(5);
    });

    it('preserves decimal quantities in editProduct', async () => {
      const updated = await editProduct(initialList, {
        id: 10,
        name: 'ARROZ',
        quantity: 2.5,
        isChecked: false,
      });

      expect(updated[0].quantity).toEqual(2.5);
    });

    it('normalizes invalid quantity (0, negative, NaN) to 1', async () => {
      const updated = await editProduct(initialList, {
        id: 10,
        name: 'ARROZ',
        quantity: 0,
        isChecked: false,
      });

      expect(updated[0].quantity).toEqual(1);
    });

    it('guarantees other items in the list remain unaltered and preserve order', async () => {
      const updated = await editProduct(initialList, {
        id: 20,
        name: 'FEIJÃO CARIOCA',
        quantity: 1,
        isChecked: true,
      });

      expect(updated[0]).toEqual(initialList[0]);
      expect(updated[2]).toEqual(initialList[2]);
    });

    it('throws error and does not persist when product ID is not found in the list', async () => {
      await expect(
        editProduct(initialList, {
          id: 999,
          name: 'PRODUTO INEXISTENTE',
          quantity: 1,
          isChecked: false,
        }),
      ).rejects.toThrow('Produto não encontrado.');
    });
  });
});
