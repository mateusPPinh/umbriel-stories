import React from 'react';
import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: {
      dark: { ...themes.dark },
      light: { ...themes.light }
    }
  },
  decorators: [
    (Story) => (
      <div className="font-sans">
        <Story />
      </div>
    ),
  ],
};

export default preview; 