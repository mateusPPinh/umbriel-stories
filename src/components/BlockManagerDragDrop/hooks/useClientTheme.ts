import { useMemo } from 'react';
import { ClientTheme } from '../types';

interface UseClientThemeProps {
  clientGeneralSettingsData?: ClientTheme;
  isDarkTheme?: boolean;
}

interface ThemeStyles {
  title: {
    fontFamily: string;
    color: string;
  };
  subtitle: {
    fontFamily: string;
    color: string;
  };
}

const defaultTheme: ClientTheme = {
  fontMapping: {
    articleTitle: "'Noto Sans Variable', sans-serif",
    articleSubtitle: "'Noto Sans Variable', sans-serif",
    articleBody: "'Noto Sans Variable', sans-serif",
    headerTitle: "'Noto Sans Variable', sans-serif",
    headerText: "'Noto Sans Variable', sans-serif",
  },
  colorMapping: {
    light: {
      articleBackground: '#FFFFFF',
      articleTitle: '#1A1A1A',
      articleSubtitle: '#4A5568',
      articleText: '#2D3748',
      headerBackground: '#FFFFFF',
      headerText: '#1A1A1A',
      primaryButton: '#3182CE',
      secondaryButton: '#718096',
      accent: '#3182CE',
      sidebarBackground: '#F7FAFC',
      sidebarText: '#2D3748',
    },
    dark: {
      articleBackground: '#1A1A1A',
      articleTitle: '#FFFFFF',
      articleSubtitle: '#A0AEC0',
      articleText: '#E2E8F0',
      headerBackground: '#1A1A1A',
      headerText: '#FFFFFF',
      primaryButton: '#4299E1',
      secondaryButton: '#A0AEC0',
      accent: '#4299E1',
      sidebarBackground: '#2D3748',
      sidebarText: '#E2E8F0',
    },
  },
};

export function useClientTheme({ clientGeneralSettingsData, isDarkTheme }: UseClientThemeProps): ThemeStyles {
  return useMemo(() => {
    const theme = clientGeneralSettingsData || defaultTheme;
    const { fontMapping, colorMapping } = theme;
    const colors = isDarkTheme ? colorMapping.dark : colorMapping.light;

    return {
      title: {
        fontFamily: fontMapping.articleTitle,
        color: colors.articleTitle,
      },
      subtitle: {
        fontFamily: fontMapping.articleSubtitle,
        color: colors.articleSubtitle,
      },
    };
  }, [clientGeneralSettingsData, isDarkTheme]);
} 