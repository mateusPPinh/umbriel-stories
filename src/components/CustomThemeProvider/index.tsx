import { ThemeProvider } from 'styled-components'
import theme from '../../styles/index'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React, { ReactElement } from 'react'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type CustomThemeProviderProps = {
  theme?: typeof theme
  children: React.ReactNode
}

const CustomThemeProvider = ({ theme: customTheme = theme, children }: CustomThemeProviderProps): ReactElement => (
  <ThemeProvider theme={customTheme}>
    {children}
  </ThemeProvider>
)

export { CustomThemeProvider }
