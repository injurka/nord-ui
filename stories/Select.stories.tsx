/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, Story } from '@storybook/react';
import React from 'react';

import type { SelectOption, SelectProps } from '#/components';
import { Select } from '#/components';
import debounce from '#/utils/debounce';
import type { OptionValue } from '#/components/select/Select';

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

type SelectValue = string; // ...or another types
type StorySelectProps = SelectProps<SelectOption<SelectValue>>;

//* - Single / Multiple Template ---------------------------------------------------------------- *//
const Template: Story<StorySelectProps> = ({ ...restProps }) => {
  const [option, setOption] = React.useState<OptionValue>(null);

  return <Select {...restProps} option={option} onChange={(v) => setOption(v)} />;
};

//* - Single ---------------------------------------------------------------- *//
export const Single = Template.bind({});
const optionsSingle = [
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
  options: optionsSingle,
  placeholder: 'input value'
};

//* - Multiple ---------------------------------------------------------------- *//
export const Multiple = Template.bind({});
const optionsMultiple = [
  { value: 'Eula' },
  { value: 'Debra' },
  { value: 'Morales' },
  { value: 'Alana' },
  { value: 'Livingston' },
  { value: 'Acevedo' },
  { value: 'Mayo' },
  { value: 'Morales' },
  { value: 'Alana' },
  { value: 'Livingston' },
  { value: 'Acevedo' }
];
Multiple.args = {
  mode: 'multiple',
  options: optionsMultiple,
  filterOption: true
};

//* - Fetch Template ---------------------------------------------------------------- *//
interface DebounceSelectProps extends StorySelectProps {
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

const TemplateFetch: Story<StorySelectProps> = ({ ...restProps }) => {
  const [option, setOption] = React.useState<OptionValue>(null);

  return (
    <DebounceSelect
      {...restProps}
      debounceTimeout={500}
      fetchOptions={fetchUserList}
      option={option}
      onChange={(v) => setOption(v)}
    />
  );
};

export const MultipleFetch = TemplateFetch.bind({});
MultipleFetch.args = {
  placeholder: 'Select users',
  mode: 'multiple',
  filterOption: false
};

//* - Custom theme Template ---------------------------------------------------------------- *//
// eslint-disable-next-line import/first
import './assets/SelectDark.scss';

const TemplateCustomTheme: Story<StorySelectProps> = ({ ...restProps }) => {
  const [option, setOption] = React.useState<OptionValue>(null);

  return <Select {...restProps} option={option} onChange={(v) => setOption(v)} />;
};

export const CustomTheme = TemplateCustomTheme.bind({});
CustomTheme.args = {
  placeholder: 'Select users',
  mode: 'multiple',
  filterOption: false,
  cln: 'custom'
};
