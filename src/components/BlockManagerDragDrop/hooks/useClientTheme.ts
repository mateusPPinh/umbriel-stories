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
  fontSize: {
    pageblockTitle: string;
    pageblockSubtitle: string;
    pageblockText: string;
  };
}

const defaultTheme: ClientTheme = {
  fontMapping: {
    pageblockTitle: "'Noto Sans Variable', sans-serif",
    pageblockSubtitle: "'Noto Sans Variable', sans-serif",
    pageblockText: "'Noto Sans Variable', sans-serif",
  },
  colorMapping: {
    light: {
      pageblockTitle: '#1A1A1A',
      pageblockSubtitle: '#4A5568',
      pageblockText: '#4A5568',
    },
    dark: {
      pageblockTitle: '#FFFFFF',
      pageblockSubtitle: '#E2E8F0',
      pageblockText: '#A0AEC0',
    },
  },
  fontSize: {
    pageblockTitle: '1rem',
    pageblockSubtitle: '0.80rem',
    pageblockText: '1rem',
  },
};

export function useClientTheme({ clientGeneralSettingsData, isDarkTheme = false }: UseClientThemeProps): ThemeStyles {
  // @ts-ignore
  return useMemo(() => {
    const theme = isDarkTheme ? 'dark' : 'light';
    const settings = clientGeneralSettingsData || defaultTheme;

    return {
      title: {
        fontFamily: settings?.fontMapping?.pageblockTitle ?? defaultTheme.fontMapping.pageblockTitle,
        color: settings?.colorMapping?.[theme]?.pageblockTitle ?? defaultTheme.colorMapping[theme].pageblockTitle,
      },
      subtitle: {
        fontFamily: settings?.fontMapping?.pageblockSubtitle ?? defaultTheme.fontMapping.pageblockSubtitle,
        color: settings?.colorMapping?.[theme]?.pageblockSubtitle ?? defaultTheme.colorMapping[theme].pageblockSubtitle,
      },
      fontSize: {
        pageblockTitle: settings?.fontSize?.pageblockTitle ?? defaultTheme.fontSize?.pageblockTitle,
        pageblockSubtitle: settings?.fontSize?.pageblockSubtitle ?? defaultTheme.fontSize?.pageblockSubtitle,
        pageblockText: settings?.fontSize?.pageblockText ?? defaultTheme.fontSize?.pageblockText,
      }
    };
  }, [clientGeneralSettingsData, isDarkTheme]);
} 