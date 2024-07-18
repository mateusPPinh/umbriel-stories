import '../src/index.css'
import Theme from '../src/styles/index'
import '@fontsource/roboto'
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

export const decorators = [
  (Story) => {
    return (
      <Theme>
        <Story />
      </Theme>
    )
  },
]

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
      defaultViewport: 'desktop',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview