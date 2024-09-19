 
/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [
    
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
