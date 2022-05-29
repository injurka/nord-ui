import type { Meta, Story } from '@storybook/react';
import React from 'react';

import type { SelectProps } from '#/components/Select';
import { Select } from '#/components/Select';

const meta: Meta = {
  title: 'Select',
  component: Select,
  argTypes: {
    children: {
      control: {
        type: 'text'
      }
    }
  },
  parameters: {
    controls: { expanded: true }
  }
};

export default meta;

const Template: Story<SelectProps> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
const optionsPrimary = [
  { value: 'Lambert' },
  { value: 'Hollie' },
  { value: 'Hardy' },
  { value: 'Meagan' },
  { value: 'Baxter' },
  { value: 'Ila' },
  { value: 'Mercado' },
  { value: 'Janelle' },
  { value: 'Dorthy' },
  { value: 'June' },
  { value: 'Kim' },
  { value: 'Burnett' },
  { value: 'Noble' },
  { value: 'Sonja' },
  { value: 'Giles' },
  { value: 'Cantrell' },
  { value: 'Snider' },
  { value: 'Gould' },
  { value: 'Kris' },
  { value: 'Brittney' }
];
Primary.args = {
  options: optionsPrimary
};

export const Secondary = Template.bind({});
Secondary.args = {
  options: [{ value: 'nice' }, { value: 'smth wrong' }, { value: 'bad' }]
};
