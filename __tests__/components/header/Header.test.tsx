/**
 * @format
 */

import 'react-native';
import React from 'react';
import {describe, it, expect} from '@jest/globals';
import {render} from '@testing-library/react-native';
import Header from '../../../src/components/Header';

describe('Header test', () => {
  it('check if the title is correct', () => {
    const {getByText} = render(<Header />);

    const title = getByText('Minha Lista de Compras');

    expect(title).toBeTruthy();
  });

  it('check if the image is correct', () => {
    const {getByTestId} = render(<Header />);

    const image = getByTestId('img');

    expect(image.props.source.testUri).toBe('../../../src/assets/list.png');
  });
});
