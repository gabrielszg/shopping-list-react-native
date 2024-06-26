/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';
import Card from '../src/components/Card';

// Note: import explicitly to use the types shiped with jest.
import {describe, it, jest, expect, afterEach} from '@jest/globals';

// Note: test renderer must be required after react-native.
import {fireEvent, render, cleanup} from '@testing-library/react-native';

jest.mock('react-native-toast-message', () => 'Toast');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('App test', () => {
  afterEach(cleanup);

  it('renders correctly', () => {
    render(<App />);
  });

  it('when product list is empty, not render delete all button', () => {
    const {queryByTestId} = render(<App />);

    const buttonDeleteAll = queryByTestId('deleteAllButton');

    expect(buttonDeleteAll).toBeNull();
  });

  it('when the product list is empty, render the card', () => {
    const {UNSAFE_getByType} = render(<App />);

    const card = UNSAFE_getByType(Card);

    expect(card).toBeTruthy();
  });

  it('check if the floating button is rendering correctly', () => {
    const {getByTestId} = render(<App />);

    const floatingButton = getByTestId('floatingButton');

    expect(floatingButton).toBeTruthy();
  });

  it('when clicking on the floating button open the modal', () => {
    const {getByTestId} = render(<App />);

    const floatingButton = getByTestId('floatingButton');
    const modal = getByTestId('modal');

    fireEvent.press(floatingButton);

    expect(modal.props.visible).toBeTruthy();
  });
});
