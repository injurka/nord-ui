/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, Story } from '@storybook/react';
import React from 'react';

import type { SelectProps } from '#/components';
import { Select } from '#/components';

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

const Template: Story<SelectProps> = ({ option, onChange, ...restProps }: SelectProps) => {
  return <Select {...restProps} />;
};

export const Single = Template.bind({});
const optionsPrimary = [
  { value: 'Livingston' },
  { value: 'Acevedo' },
  { value: 'Mayo' },
  { value: 'Krista' },
  { value: 'Sharpe' },
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
Single.args = {
  options: optionsPrimary,
  placeholder: 'input value'
};

type StoriesSelectProps = Omit<SelectProps, 'onChange' | 'value'>;
const TemplateUseState: Story<StoriesSelectProps> = ({ ...props }: SelectProps) => {
  const [option, setOption] = React.useState<any>([]);

  return <Select {...props} option={option} onChange={(v) => setOption(v)} />;
};

export const CustomState = TemplateUseState.bind({});
const optionsThird = [
  { value: 'Eula' },
  { value: 'Debra' },
  { value: 'Morales' },
  { value: 'Alana' },
  { value: 'Livingston' },
  { value: 'Acevedo' },
  { value: 'Mayo' }
];
CustomState.args = {
  options: optionsThird,
  filterOption: false
};

export const Multiple = TemplateUseState.bind({});
const optionsFourth = [
  { value: 'Eula' },
  { value: 'Debra' },
  { value: 'Morales' },
  { value: 'Alana' },
  { value: 'Livingston' },
  { value: 'Acevedo' },
  { value: 'Mayo' }
];
Multiple.args = {
  mode: 'multiple',
  options: optionsFourth,
  filterOption: false
};
