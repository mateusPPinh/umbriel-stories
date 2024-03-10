import '../src/index.css';
import Theme from '../src/styles/index'
import '@fontsource/roboto';

export const decorators = [
 (Story) => {
  return (
    <Theme>
      <Story />
    </Theme>
  )
 }
]

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
