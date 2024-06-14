/**
 * @format
 */

import 'react-native';
import {describe, it, expect, jest} from '@jest/globals';
import {
  findAllProducts,
  removeProduct,
  saveProduct,
  updateProduct,
} from '../../src/services/service';
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

  updateProduct: jest.fn().mockImplementation(() => {
    const productToEdit = productList[0];
    productToEdit.isChecked = true;

    const newArray = [...productList];
    newArray[0] = productToEdit;
    return newArray;
  }),

  removeProduct: jest.fn().mockImplementation(() => {
    const productToRemove = productList[1];
    productList.splice(1, 1);
    const newArray = productList.filter(item => item !== productToRemove);
    return newArray;
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

  it('when the quantity is zero or less, switch to one', () => {
    product.quantity = 0;
    const save = saveProduct(productList, product);
    expect(save.length).toEqual(3);
    expect(save[2].id).toEqual(100);
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
