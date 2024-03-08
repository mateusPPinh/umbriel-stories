import '../src/index.css';
import { ThemeProvider } from "styled-components";
import {theme} from '../src/styles/theme';
import '@fontsource/roboto';

export const decorators = [
 (Story) => {
  return (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
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
