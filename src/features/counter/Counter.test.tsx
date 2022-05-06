import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { Counter } from './Counter';

test('renders learn react link', () => {
  const html = render(
    <Provider store={store}>
      <Counter />
    </Provider>
  );
});
