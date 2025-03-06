import { ClientTheme } from '../types'

interface UseClientThemeProps {
  clientGeneralSettingsData: ClientTheme
  isDarkTheme?: boolean
}

interface ThemeStyles {
  title: {
    fontFamily: string
    color: string
  }
  subtitle: {
    fontFamily: string
    color: string
  }
}

export const useClientTheme = ({
  clientGeneralSettingsData,
  isDarkTheme = false,
}: UseClientThemeProps): ThemeStyles => {
  const theme = isDarkTheme ? 'dark' : 'light'

  return {
    title: {
      fontFamily: clientGeneralSettingsData.fontMapping.articleTitle,
      color: clientGeneralSettingsData.colorMapping[theme].articleTitle,
    },
    subtitle: {
      fontFamily: clientGeneralSettingsData.fontMapping.articleSubtitle,
      color: clientGeneralSettingsData.colorMapping[theme].articleSubtitle,
    },
  }
} 