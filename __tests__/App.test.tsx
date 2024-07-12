/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';
import Card from '../src/components/Card';

// Note: import explicitly to use the types shiped with jest.
import {describe, it, jest, expect, afterEach, beforeEach} from '@jest/globals';

// Note: test renderer must be required after react-native.
import {
  fireEvent,
  render,
  cleanup,
  act,
  waitFor,
} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Product} from '../src/models/product';
import {Alert} from 'react-native';
import * as service from '../src/services/service';

jest.mock('react-native-toast-message', () => 'Toast');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

let productList: Product[] = [
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

describe('App test', () => {
  const findAllProductsSpy = jest.spyOn(service, 'findAllProducts');
  const alertSpy = jest.spyOn(Alert, 'alert');

  afterEach(cleanup);

  beforeEach(async () => {
    await AsyncStorage.setItem('products', JSON.stringify(productList));
  });

  it('renders correctly', async () => {
    await waitFor(() => {
      render(<App />);
    });
  });

  it('when there is an error when find all products, show an error alert', async () => {
    findAllProductsSpy.mockRejectedValue(() => {});

    render(<App />);

    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith('Ops ocorreu um erro!', 'erro'),
    );

    findAllProductsSpy.mockRestore();
  });

  it('when product list is empty, not render delete all button', async () => {
    const {queryByTestId} = render(<App />);

    await waitFor(() => {
      const buttonDeleteAll = queryByTestId('deleteAllButton');
      expect(buttonDeleteAll).toBeNull();
    });
  });

  it('when product list is not empty, render delete all button with correct text', async () => {
    const {getByTestId} = render(<App />);

    await waitFor(() => {
      const buttonDeleteAll = getByTestId('deleteAllButton');
      expect(buttonDeleteAll).toBeTruthy();
      expect(buttonDeleteAll.props.children[0][1].props.children).toBe(
        'Excluir Todos',
      );
    });
  });

  it('when you click on the delete all button, an alert will open with the correct information', async () => {
    const {getByTestId} = render(<App />);

    await waitFor(() => {
      const buttonDeleteAll = getByTestId('deleteAllButton');
      fireEvent.press(buttonDeleteAll);
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Lista de compras',
      'Deseja excluir todos os seus itens?',
      expect.any(Array),
    );
  });

  it('when you click on the delete all button, an alert open and when you click cancel closed the alert', async () => {
    const {getByTestId} = render(<App />);

    await waitFor(() => {
      const buttonDeleteAll = getByTestId('deleteAllButton');
      fireEvent.press(buttonDeleteAll);
    });

    //@ts-ignore
    expect(alertSpy.mock.calls[1][2][0].text).toEqual('Cancelar');
    expect(alertSpy.mock.results[1].value).toBeUndefined();
  });

  it('when you click on the delete all button, an alert open and when you click ok delete all products', async () => {
    const {getByTestId} = render(<App />);

    await waitFor(() => {
      const buttonDeleteAll = getByTestId('deleteAllButton');
      fireEvent.press(buttonDeleteAll);
    });

    //@ts-ignore
    expect(alertSpy.mock.calls[2][2][1].text).toEqual('Ok');

    //@ts-ignore
    alertSpy.mock.calls[2][2][1].onPress();

    expect(await AsyncStorage.getItem('products')).toBeNull();
  });

  it('when the product list is empty, render the card', async () => {
    const {UNSAFE_getByType} = render(<App />);

    await waitFor(() => {
      const card = UNSAFE_getByType(Card);
      expect(card).toBeTruthy();
    });
  });

  it('check if the floating button is rendering correctly', async () => {
    const {getByTestId} = render(<App />);

    await waitFor(() => {
      const floatingButton = getByTestId('floatingButton');
      expect(floatingButton).toBeTruthy();
    });
  });

  it('when clicking on the floating button open the modal', async () => {
    const {getByTestId} = render(<App />);

    await act(async () => {
      const floatingButton = getByTestId('floatingButton');
      fireEvent.press(floatingButton);
    });

    await waitFor(() => {
      const modal = getByTestId('modal');
      expect(modal.props.visible).toBeTruthy();
    });
  });

  it('when you click on the icon with x close modal', async () => {
    const {getByTestId} = render(<App />);

    await waitFor(() => {
      const floatingButton = getByTestId('floatingButton');
      fireEvent.press(floatingButton);

      const modal = getByTestId('modal');
      modal.props.onRequestClose();
      expect(modal.props.visible).toBeFalsy();
    });
  });
});
