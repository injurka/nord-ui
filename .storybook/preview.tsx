import '../src/styles/index.scss';

// Default Setting
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  // Add Custom Background
  backgrounds: {
    default: 'bgWhite',
    values: [
      {
        name: 'black',
        value: '#212121'
      },
      {
        name: 'white',
        value: '#FFFFFF'
      }
    ]
  }
};

export const decorators = [(Story) => <Story />];
