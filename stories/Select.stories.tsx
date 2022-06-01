import type { Meta, Story } from '@storybook/react';
import React from 'react';

import type { SelectProps } from '#/components/index';
import { Select } from '#/components/index';

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
  options: optionsPrimary,
  placeholder: 'input value'
};

export const Secondary = Template.bind({});
const optionsSecondary = [
  { value: 'Eula' },
  { value: 'Debra' },
  { value: 'Morales' },
  { value: 'Alana' },
  { value: 'Livingston' },
  { value: 'Acevedo' },
  { value: 'Mayo' },
  { value: 'Krista' },
  { value: 'Sharpe' },
  { value: 'Shawn' },
  { value: 'Ester' },
  { value: 'Nola' },
  { value: 'Perry' },
  { value: 'Leah' },
  { value: 'Mattie' },
  { value: 'Delacruz' },
  { value: 'Nguyen' },
  { value: 'Delgado' },
  { value: 'Colon' },
  { value: 'Phyllis' },
  { value: 'Randall' },
  { value: 'Cheryl' },
  { value: 'West' },
  { value: 'Ruthie' },
  { value: 'Glenda' },
  { value: 'Duffy' },
  { value: 'Dorthy' },
  { value: 'Maureen' },
  { value: 'Moreno' },
  { value: 'Sandy' },
  { value: 'Nadine' },
  { value: 'Marshall' },
  { value: 'Jessie' },
  { value: 'Vera' },
  { value: 'Eleanor' },
  { value: 'Georgia' },
  { value: 'Berry' },
  { value: 'Tammi' },
  { value: 'Elisa' },
  { value: 'Daugherty' },
  { value: 'Tracey' },
  { value: 'Rosario' },
  { value: 'Schwartz' },
  { value: 'Josephine' },
  { value: 'Jami' },
  { value: 'Yesenia' },
  { value: 'Thomas' },
  { value: 'Stein' },
  { value: 'Bianca' },
  { value: 'Rhea' },
  { value: 'Silvia' },
  { value: 'Martinez' },
  { value: 'Janie' },
  { value: 'Church' },
  { value: 'Carolina' },
  { value: 'Jacobson' },
  { value: 'Montoya' },
  { value: 'Patrice' },
  { value: 'Henson' },
  { value: 'Maura' },
  { value: 'Johns' },
  { value: 'Hurley' },
  { value: 'Lena' },
  { value: 'Berg' },
  { value: 'Mccoy' },
  { value: 'Sears' },
  { value: 'Martin' },
  { value: 'Alta' },
  { value: 'Chen' },
  { value: 'Adele' },
  { value: 'Gabrielle' },
  { value: 'Kim' },
  { value: 'Evans' },
  { value: 'Rosalyn' },
  { value: 'Snider' },
  { value: 'Mcdonald' },
  { value: 'Klein' },
  { value: 'Lolita' },
  { value: 'Amy' },
  { value: 'Head' },
  { value: 'Cox' },
  { value: 'Alyson' },
  { value: 'Cleveland' },
  { value: 'Lourdes' },
  { value: 'Millicent' },
  { value: 'Patsy' },
  { value: 'Oliver' },
  { value: 'Kate' },
  { value: 'Singleton' },
  { value: 'Bertha' },
  { value: 'Holcomb' },
  { value: 'Earnestine' },
  { value: 'Daphne' },
  { value: 'Mills' },
  { value: 'Megan' },
  { value: 'Goodwin' },
  { value: 'Hutchinson' },
  { value: 'Hammond' },
  { value: 'Sue' },
  { value: 'Hanson' },
  { value: 'Ina' },
  { value: 'Wilcox' },
  { value: 'Sykes' },
  { value: 'Claudette' },
  { value: 'Alisha' },
  { value: 'Harding' },
  { value: 'Ginger' },
  { value: 'Hazel' },
  { value: 'Noemi' },
  { value: 'Miranda' },
  { value: 'Mendez' },
  { value: 'Newton' },
  { value: 'Willa' },
  { value: 'Foley' },
  { value: 'Frazier' },
  { value: 'Alexis' },
  { value: 'Oconnor' },
  { value: 'Valarie' },
  { value: 'Rosalie' },
  { value: 'Susie' },
  { value: 'Alison' },
  { value: 'Dunlap' },
  { value: 'Williams' },
  { value: 'Beatrice' },
  { value: 'Ophelia' },
  { value: 'Rena' },
  { value: 'Potter' },
  { value: 'Zelma' },
  { value: 'Suzette' },
  { value: 'Cleo' },
  { value: 'Raymond' },
  { value: 'Langley' },
  { value: 'Morin' },
  { value: 'Anne' },
  { value: 'Ayers' },
  { value: 'Cornelia' },
  { value: 'Alisa' },
  { value: 'Keisha' },
  { value: 'Robbie' },
  { value: 'Britney' },
  { value: 'Dean' },
  { value: 'Brittney' },
  { value: 'Heath' },
  { value: 'Hendricks' },
  { value: 'Cabrera' },
  { value: 'Sophie' },
  { value: 'Lorie' },
  { value: 'Oneal' },
  { value: 'Jewell' },
  { value: 'James' },
  { value: 'Marion' },
  { value: 'Concepcion' },
  { value: 'Sampson' },
  { value: 'Vance' },
  { value: 'Fleming' },
  { value: 'Vargas' },
  { value: 'Steele' },
  { value: 'Marissa' },
  { value: 'Joyner' },
  { value: 'Kerr' },
  { value: 'Travis' },
  { value: 'Reed' },
  { value: 'Justine' }
];
Secondary.args = {
  options: optionsSecondary,
  filterOption: false
};

type UseStateSelectProps = Omit<SelectProps, 'option' | 'onChange'>;

const TemplateUseState: Story<UseStateSelectProps> = ({ ...restProps }: UseStateSelectProps) => {
  const [option, setOption] = React.useState<any>([]);

  return (
    <Select
      option={option}
      onChange={(v) => {
        setOption(v);
      }}
      {...restProps}
    />
  );
};

export const Third = TemplateUseState.bind({});
const optionsThird = [
  { value: 'Eula' },
  { value: 'Debra' },
  { value: 'Morales' },
  { value: 'Alana' },
  { value: 'Livingston' },
  { value: 'Acevedo' },
  { value: 'Mayo' }
];
Third.args = {
  options: optionsThird,
  filterOption: false
};
