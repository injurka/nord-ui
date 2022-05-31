import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Button } from '../.';

const App = () => {
  return (
    <div>
      <Button>1</Button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
