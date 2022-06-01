import React from 'react';
import { render } from '@testing-library/react';

import type { SelectProps } from '#/components/Select';
import { Select } from '#/components/Select';

describe('Test Component', () => {
  const props: SelectProps = {
    options: [{ value: 'test' }]
  };

  const renderComponent = () => render(<Select {...props} />);

  it('should have primary className with default props', () => {
    const { container } = renderComponent();

    expect(container.getElementsByClassName('select').length).toBe(1);
  });
});
