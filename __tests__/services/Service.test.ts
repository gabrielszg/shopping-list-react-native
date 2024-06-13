/**
 * @format
 */

import 'react-native';
import {describe, it, expect, jest} from '@jest/globals';
import {findAllProducts, saveProduct} from '../../src/services/service';
import {Product} from '../../src/models/product';

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

const product: Product = {
  id: 0,
  name: 'Alho',
  quantity: 5,
  isChecked: false,
};

jest.mock('../../src/services/service', () => ({
  findAllProducts: jest
    .fn()
    .mockReturnValueOnce({data: JSON.stringify(productList)}),

  saveProduct: jest.fn().mockImplementation(() => {
    product.id = 100;
    if (product.quantity <= 0) {
      product.quantity = 1;
    }
    const newProducts: Product[] = [...productList, product];
    return newProducts;
  }),
}));

describe('Service Test', () => {
  it('when searching for all products returns successfully', () => {
    const data = findAllProducts();
    expect(data).toEqual({data: JSON.stringify(productList)});
  });

  it('save product successfully', () => {
    const save = saveProduct(productList, product);
    expect(save.length).toEqual(3);
    expect(save[2].id).toEqual(100);
    expect(save[2].name).toEqual('Alho');
    expect(save[2].quantity).toEqual(5);
    expect(save[2].isChecked).toEqual(false);
  });
});
