import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Factors from '../Factor';
import { store } from '../../../../app/store';

test('renders learn react link', () => {
  const html = render(
    <Provider store={store}>
      <Factors />
    </Provider>
  );
});
