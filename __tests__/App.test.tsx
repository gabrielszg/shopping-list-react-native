/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: import explicitly to use the types shiped with jest.
import {describe, it, jest, expect} from '@jest/globals';

// Note: test renderer must be required after react-native.
import {render} from '@testing-library/react-native';
import Card from '../src/components/Card';

jest.mock('react-native-toast-message', () => 'Toast');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('App test', () => {
  it('renders correctly', () => {
    render(<App />);
  });

  it('when product list is not empty, render delete all button', () => {
    const {queryByTestId} = render(<App />);

    const buttonDeleteAll = queryByTestId('deleteAllButton');

    expect(buttonDeleteAll).toBeNull();
  });

  it('when the product list is empty, render the card', () => {
    const {UNSAFE_getByType} = render(<App />);

    const card = UNSAFE_getByType(Card);

    expect(card).not.toBeNull();
  });
});
