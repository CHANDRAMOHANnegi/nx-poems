import React from 'react';
import { render } from '@testing-library/react-native';

import PoemList from './poem-list';

describe('PoemList', () => {
  it('should render successfully', () => {
    const { container } = render(<PoemList />);
    expect(container).toBeTruthy();
  });
});
