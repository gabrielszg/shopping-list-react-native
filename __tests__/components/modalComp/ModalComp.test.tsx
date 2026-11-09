/**
 * @format
 */

import 'react-native';
import React from 'react';
import {describe, it, expect, jest} from '@jest/globals';
import {fireEvent, render} from '@testing-library/react-native';
import ModalComp from '../../../src/components/ModalComp';

jest.mock('react-native-toast-message', () => 'Toast');

describe('ModalComp Test', () => {
  it('Set is open', () => {
    const mockSetProducts = jest.fn();
    let modalIsOpen = true;
    const mockSetIsOpen = jest.fn();

    const {getByTestId} = render(
      <ModalComp
        products={[]}
        setProducts={mockSetProducts}
        modalIsOpen={modalIsOpen}
        setIsOpen={mockSetIsOpen}
      />,
    );

    const modalCloseButton = getByTestId('modalCloseButton');
    fireEvent.press(modalCloseButton);

    expect(mockSetIsOpen).toHaveBeenCalledWith(!modalIsOpen);
  });

  it('calls onClose when provided on close button press', () => {
    const mockSetProducts = jest.fn();
    const mockSetIsOpen = jest.fn();
    const mockOnClose = jest.fn();

    const {getByTestId} = render(
      <ModalComp
        products={[]}
        setProducts={mockSetProducts}
        modalIsOpen={true}
        setIsOpen={mockSetIsOpen}
        onClose={mockOnClose}
      />,
    );

    const modalCloseButton = getByTestId('modalCloseButton');
    fireEvent.press(modalCloseButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Android back button request (onRequestClose)', () => {
    const mockSetProducts = jest.fn();
    const mockSetIsOpen = jest.fn();
    const mockOnClose = jest.fn();

    const {getByTestId} = render(
      <ModalComp
        products={[]}
        setProducts={mockSetProducts}
        modalIsOpen={true}
        setIsOpen={mockSetIsOpen}
        onClose={mockOnClose}
      />,
    );

    const modal = getByTestId('modal');
    modal.props.onRequestClose();

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
