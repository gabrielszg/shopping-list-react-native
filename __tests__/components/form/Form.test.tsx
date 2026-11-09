/**
 * @format
 */

import 'react-native';
import React from 'react';
import {describe, it, expect, jest, beforeEach} from '@jest/globals';
import {act, fireEvent, render} from '@testing-library/react-native';
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
  beforeEach(() => {
    jest.clearAllMocks();
  });
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

  it('the fields are cleared after submitting the form and when clicking to add a new product name call onKeyPress event', async () => {
    const {getByTestId} = render(
      <Form products={[]} setProducts={mockSetProducts} />,
    );

    await act(async () => {
      const productNameField = getByTestId('productName');
      fireEvent.changeText(productNameField, '');
      fireEvent.press(productNameField);

      productNameField.props.onKeyPress();
    });

    expect(Toast.hide).toBeCalled();
  });

  it('the fields are cleared after submitting the form and when clicking to add a new product name call onPressIn event', async () => {
    const {getByTestId} = render(
      <Form products={[]} setProducts={mockSetProducts} />,
    );

    await act(async () => {
      const productNameField = getByTestId('productName');
      fireEvent.changeText(productNameField, '');
      fireEvent.press(productNameField);

      productNameField.props.onPressIn();
    });

    expect(Toast.hide).toBeCalled();
  });

  describe('Form Edit Mode', () => {
    const editingProduct = {
      id: 50,
      name: 'ARROZ',
      quantity: 2.5,
      isChecked: false,
    };

    const initialProducts = [editingProduct];

    it('renders "Editar Produto" and "Salvar" when editingProduct is passed', () => {
      const {getByText, getByTestId} = render(
        <Form
          products={initialProducts}
          setProducts={mockSetProducts}
          editingProduct={editingProduct}
        />,
      );

      expect(getByText('Editar Produto')).toBeTruthy();
      expect(getByTestId('submit')).toBeTruthy();
      expect(getByText('Salvar')).toBeTruthy();
    });

    it('pre-populates inputs with the editing product data', () => {
      const {getByTestId} = render(
        <Form
          products={initialProducts}
          setProducts={mockSetProducts}
          editingProduct={editingProduct}
        />,
      );

      expect(getByTestId('productName').props.value).toEqual('ARROZ');
      expect(getByTestId('productQuantity').props.value).toEqual('2.5');
    });

    it('reinitializes inputs when editingProduct prop changes', () => {
      const {getByTestId, rerender} = render(
        <Form
          products={initialProducts}
          setProducts={mockSetProducts}
          editingProduct={editingProduct}
        />,
      );

      expect(getByTestId('productName').props.value).toEqual('ARROZ');

      const nextProduct = {
        id: 60,
        name: 'FEIJÃO',
        quantity: 1,
        isChecked: true,
      };

      rerender(
        <Form
          products={[...initialProducts, nextProduct]}
          setProducts={mockSetProducts}
          editingProduct={nextProduct}
        />,
      );

      expect(getByTestId('productName').props.value).toEqual('FEIJÃO');
      expect(getByTestId('productQuantity').props.value).toEqual('1');
    });

    it('shows info toast and does not submit when name is empty in edit mode', async () => {
      const {getByTestId} = render(
        <Form
          products={initialProducts}
          setProducts={mockSetProducts}
          editingProduct={editingProduct}
        />,
      );

      fireEvent.changeText(getByTestId('productName'), '   ');
      fireEvent.press(getByTestId('submit'));

      expect(Toast.show).toHaveBeenCalledWith({
        type: 'info',
        text1: 'Informe o nome do Produto!',
      });
      expect(mockSetProducts).not.toHaveBeenCalled();
    });

    it('submits edit successfully, calls setProducts, shows success toast and calls onClose', async () => {
      const mockOnClose = jest.fn();
      const {getByTestId} = render(
        <Form
          products={initialProducts}
          setProducts={mockSetProducts}
          editingProduct={editingProduct}
          onClose={mockOnClose}
        />,
      );

      fireEvent.changeText(getByTestId('productName'), 'Arroz Parboilizado');
      fireEvent.changeText(getByTestId('productQuantity'), '4');

      await act(async () => {
        fireEvent.press(getByTestId('submit'));
      });

      expect(mockSetProducts).toHaveBeenCalledWith([
        {
          id: 50,
          name: 'ARROZ PARBOILIZADO',
          quantity: 4,
          isChecked: false,
        },
      ]);
      expect(Toast.show).toHaveBeenCalledWith({
        type: 'success',
        text1: 'Produto atualizado com sucesso!',
        position: 'top',
      });
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('shows error toast and does not call onClose when editProduct throws', async () => {
      const mockOnClose = jest.fn();
      const {getByTestId} = render(
        <Form
          products={[]}
          setProducts={mockSetProducts}
          editingProduct={editingProduct}
          onClose={mockOnClose}
        />,
      );

      await act(async () => {
        fireEvent.press(getByTestId('submit'));
      });

      expect(Toast.show).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Erro ao atualizar produto!',
        position: 'top',
      });
      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });
});
