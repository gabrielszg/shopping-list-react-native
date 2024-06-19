/**
 * @format
 */

import 'react-native';
import React from 'react';
import {describe, it, expect, jest, afterEach} from '@jest/globals';
import {render, cleanup} from '@testing-library/react-native';
import Grid from '../../../src/components/Grid';
import {Product} from '../../../src/models/product';

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
});
