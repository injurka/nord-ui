import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { OptionValue, Select } from '../src/components/select/Select';

const options = [
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

const App = () => {
  const [option, setOption] = React.useState<OptionValue>(null);

  return (
    <div>
      <Select
        options={options}
        placeholder={'Input value'}
        option={option}
        onChange={(v) => setOption(v)}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
