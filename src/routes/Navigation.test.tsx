import React from 'react';
import {render, screen} from '@testing-library/react';
import Navigation from './Navigation';
import { Provider } from 'react-redux';
import { store } from '../app/store';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
});