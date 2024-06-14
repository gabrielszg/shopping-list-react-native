/**
 * @format
 */

import 'react-native';
import React from 'react';
import {describe, it, expect} from '@jest/globals';
import {render} from '@testing-library/react-native';
import Card from '../../../src/components/Card';

describe('Card Test', () => {
  it('title and description correctly displayed', () => {
    const {getByText} = render(
      <Card
        modalIsOpen={false}
        setIsOpen={function (): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );

    const title = getByText('Sua lista de compras está vazia!');
    const description = getByText('Adicione itens a sua lista de compras');

    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
  });

  it('button title correctly displayed', () => {
    const {getByText} = render(
      <Card
        modalIsOpen={false}
        setIsOpen={function (): void {
          throw new Error('Function not implemented.');
        }}
      />,
    );

    const btnTitle = getByText('Começar minha lista');
    expect(btnTitle).toBeTruthy();
  });
});
