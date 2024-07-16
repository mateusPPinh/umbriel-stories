import { ThemeProvider } from 'styled-components'
import theme from '../../styles/index'
import { type ReactElement } from 'react'

interface CustomThemeProviderProps {
  theme?: typeof theme
  children: React.ReactNode
}

const CustomThemeProvider = ({ theme: customTheme = theme, children }: CustomThemeProviderProps): ReactElement => (
  <ThemeProvider theme={customTheme}>
    {children}
  </ThemeProvider>
)

export { CustomThemeProvider }
