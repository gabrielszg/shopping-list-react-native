/**
 * @format
 */

import 'react-native';
import React from 'react';
import {describe, it, expect, jest} from '@jest/globals';
import {fireEvent, render} from '@testing-library/react-native';
import Form from '../../../src/components/Form';
import Toast from 'react-native-toast-message';

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const mockSetProducts = jest.fn();

describe('Form test', () => {
  it('check if show correctly product input name placeholder', () => {
    const {getByPlaceholderText} = render(
      <Form products={[]} setProducts={mockSetProducts} />,
    );

    const productNameInput = getByPlaceholderText('Exemplo: Arroz');

    expect(productNameInput.props.placeholder).toBeTruthy();
  });

  it('check if show correctly product input quantity placeholder', () => {
    const {getByPlaceholderText} = render(
      <Form products={[]} setProducts={mockSetProducts} />,
    );

    const productQuantityInput = getByPlaceholderText('1');

    expect(productQuantityInput.props.placeholder).toBeTruthy();
  });

  it('checks if the inputs are empty before inserting data', () => {
    const {getByTestId} = render(
      <Form products={[]} setProducts={mockSetProducts} />,
    );

    const productNameInput = getByTestId('productName');
    const productQuantityInput = getByTestId('productQuantity');

    expect(productNameInput.props.value).toEqual('');
    expect(productQuantityInput.props.value).toEqual('');
  });

  it('should display an error alert when product name is empty', () => {
    const {getByTestId} = render(
      <Form products={[]} setProducts={mockSetProducts} />,
    );

    const submitButton = getByTestId('submit');

    fireEvent.press(submitButton);

    expect(Toast.show).toBeCalled();
    expect(Toast.show).toBeCalledWith({
      type: 'info',
      text1: 'Informe o nome do Produto!',
    });
  });

  it('should display success alert when submit form', () => {
    const {getByTestId} = render(
      <Form products={[]} setProducts={mockSetProducts} />,
    );

    const expectProductNameInput = 'Feijão';
    const expectProductQuantityInput = '1';
    const submitButton = getByTestId('submit');

    fireEvent.changeText(getByTestId('productName'), expectProductNameInput);
    fireEvent.changeText(
      getByTestId('productQuantity'),
      expectProductQuantityInput,
    );
    fireEvent.press(submitButton);

    expect(Toast.show).toBeCalled();
    expect(Toast.show).toBeCalledWith({
      type: 'success',
      text1: 'Produto adicionado com sucesso!',
      position: 'top',
    });
  });
});
