/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, Story } from '@storybook/react';
import React from 'react';

import type { SelectProps } from '#/components';
import { Select } from '#/components';
import debounce from '#/utils/debounce';

// type StoriesProps = Omit<SelectProps, 'onChange' | 'onSearch'>;

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

const TemplateUseState: Story<SelectProps> = ({ ...props }: SelectProps) => {
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
  mode: 'single',
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
  filterOption: true
};

//* - TemplateFetch ---------------------------------------------------------------- *//

interface DebounceSelectProps extends SelectProps {
  fetchOptions: (username: string) => Promise<any>;
  debounceTimeout: number;
}
function DebounceSelect({ fetchOptions, debounceTimeout = 500, ...props }: DebounceSelectProps) {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const fetchRef = React.useRef(0);
  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      {...props}
      loading={fetching}
      filterOption={false}
      onSearch={debounceFetcher}
      options={options}
    />
  );
}

async function fetchUserList(username: string) {
  console.log('fetching user', username);
  return fetch('https://randomuser.me/api/?results=5')
    .then((response) => response.json())
    .then((body: any) =>
      body.results.map((user: any) => ({
        label: `${user.name.first} ${user.name.last}`,
        value: user.login.username
      }))
    );
}

const TemplateFetch: Story<SelectProps> = ({ ...props }: SelectProps) => {
  const [option, setOption] = React.useState<any>([]);

  return (
    <DebounceSelect
      {...props}
      debounceTimeout={500}
      fetchOptions={fetchUserList}
      option={option}
      onChange={(v) => setOption(v)}
    />
  );

  // return <Select {...props} option={option} onChange={(v) => setOption(v)} />;
};

export const MultipleFetch = TemplateFetch.bind({});
MultipleFetch.args = {
  placeholder: 'Select users',
  mode: 'multiple',
  filterOption: false
};
