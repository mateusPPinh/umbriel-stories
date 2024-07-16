import '../src/index.css'
import theme from '../src/styles/index'
import '@fontsource/roboto'
import { ThemeProvider } from 'styled-components'

export const decorators = [
  (Story) => {
    return (
      <ThemeProvider theme={theme}> 
        <Story />
      </ThemeProvider>
    )
  },
]

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
