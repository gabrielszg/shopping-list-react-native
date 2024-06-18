/**
 * @format
 */

import 'react-native';
import React from 'react';
import {describe, it, expect, jest} from '@jest/globals';
import {render} from '@testing-library/react-native';
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
  it('see if item is on the list', () => {
    const {getByText} = render(
      <Grid products={products} setProducts={mockSetProducts} />,
    );

    expect(getByText('Alho')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
  });
});
