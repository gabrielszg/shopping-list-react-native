/**
 * @format
 */

import {Alert} from 'react-native';
import React from 'react';
import {describe, it, expect, jest, afterEach} from '@jest/globals';
import {render, cleanup, fireEvent} from '@testing-library/react-native';
import Grid from '../../../src/components/Grid';
import {Product} from '../../../src/models/product';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const mockSetProducts = jest.fn();

const products: Product[] = [
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
  {
    id: 150,
    name: 'Alho',
    quantity: 5,
    isChecked: false,
  },
  {
    id: 190,
    name: 'Macarrão',
    quantity: 1,
    isChecked: true,
  },
];

describe('Grid Test', () => {
  afterEach(cleanup);

  const mockHandleDelete = jest.fn().mockImplementation(() => {
    const product = products[index];
    products.splice(index, 1);
    products.filter(item => item !== product);
  });
  const index = products.indexOf(products[3]);
  const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(
    (title, message, buttons) =>
      //@ts-ignore
      (buttons[1] = {
        text: 'Ok',
        onPress: () => mockHandleDelete(index),
        style: 'default',
      }),
  );

  it('see if item is on the list', () => {
    const {getByText} = render(
      <Grid products={products} setProducts={mockSetProducts} />,
    );

    expect(getByText('Alho')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
  });

  it('when a product has been marked, the accessibility state of the checkbox must be true', () => {
    const {getAllByTestId} = render(
      <Grid products={products} setProducts={mockSetProducts} />,
    );

    const checkbox = getAllByTestId('checkbox');

    expect(checkbox[3].props.accessibilityState.checked).toBeTruthy();
  });

  it('when a product has been marked, its name must be crossed out', () => {
    const {getAllByTestId} = render(
      <Grid products={products} setProducts={mockSetProducts} />,
    );

    const productName = getAllByTestId('textName');

    expect(productName[3].props.style.textDecorationLine).toBe('line-through');
  });

  it('when you click on the trash can icon, a dialog box opens with the correct information', () => {
    const {getAllByTestId} = render(
      <Grid products={products} setProducts={mockSetProducts} />,
    );

    const deleteButton = getAllByTestId('deleteButton');
    fireEvent.press(deleteButton[3]);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Lista de compras',
      'Deseja excluir este item?',
      expect.any(Array),
    );
  });

  it('when you click on the trash icon a dialog box opens and when you click ok delete the product from the list', () => {
    const {getAllByTestId} = render(
      <Grid products={products} setProducts={mockSetProducts} />,
    );

    const deleteButton = getAllByTestId('deleteButton');
    fireEvent.press(deleteButton[3]);
    expect(deleteButton.length).toEqual(4);

    //@ts-ignore
    expect(alertSpy.mock.calls[0][2][1].text).toEqual('Ok');

    //@ts-ignore
    alertSpy.mock.calls[0][2][1].onPress();

    expect(mockHandleDelete).toHaveBeenCalledWith(3);
    expect(products.length).toEqual(3);
  });
});
