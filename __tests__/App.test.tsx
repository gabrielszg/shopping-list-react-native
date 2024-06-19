/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import {render} from '@testing-library/react-native';

it('renders correctly', () => {
  render(<App />);
});
