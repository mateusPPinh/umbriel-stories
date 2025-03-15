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
  fontSize: {
    pageblockTitle: string
    pageblockSubtitle: string
    pageblockText: string
  }
}

export const useClientTheme = ({
  clientGeneralSettingsData,
  isDarkTheme = false,
}: UseClientThemeProps): ThemeStyles => {
  const theme = isDarkTheme ? 'dark' : 'light'

  // Default font sizes if not provided
  const defaultFontSizes = {
    pageblockTitle: '1rem', // 24px
    pageblockSubtitle: '1.125rem', // 18px
    pageblockText: '1rem', // 16px
  }

  // Safely get font sizes with fallbacks
  const fontSizes = {
    pageblockTitle: clientGeneralSettingsData?.fontSize?.pageblockTitle ?? defaultFontSizes.pageblockTitle,
    pageblockSubtitle: clientGeneralSettingsData?.fontSize?.pageblockSubtitle ?? defaultFontSizes.pageblockSubtitle,
    pageblockText: clientGeneralSettingsData?.fontSize?.pageblockText ?? defaultFontSizes.pageblockText,
  }

  return {
    title: {
      fontFamily: clientGeneralSettingsData?.fontMapping?.pageblockTitle ?? 'system-ui',
      color: clientGeneralSettingsData?.colorMapping?.[theme]?.pageblockTitle ?? (isDarkTheme ? '#ffffff' : '#000000'),
    },
    subtitle: {
      fontFamily: clientGeneralSettingsData?.fontMapping?.pageblockSubtitle ?? 'system-ui',
      color: clientGeneralSettingsData?.colorMapping?.[theme]?.pageblockSubtitle ?? (isDarkTheme ? '#e2e8f0' : '#4a5568'),
    },
    fontSize: fontSizes
  }
} 