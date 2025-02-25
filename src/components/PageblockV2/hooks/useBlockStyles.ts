import { UseBlockStylesProps, StyleProps } from '../types/index';

const defaultTheme = {
  light: {
    columnStyle: {
      background: '#ffffff',
      padding: 16
    },
    borderBottom: {
      enabled: false,
      color: '#e5e5e5',
      width: '1px',
      style: 'solid'
    },
    headingProps: {
      fontSize: 'lg',
      fontWeight: 'medium',
      color: '#1a1a1a'
    },
    subtitleProps: {
      fontSize: 'md',
      fontWeight: 'normal',
      color: '#4a4a4a'
    },
    bodyProps: {
      fontSize: 'md',
      fontWeight: 'normal',
      color: '#1a1a1a'
    },
    linkProps: {
      color: '#0066cc',
      hoverColor: '#004999'
    }
  },
  dark: {
    columnStyle: {
      background: '#1a1a1a',
      padding: 16
    },
    borderBottom: {
      enabled: false,
      color: '#333333',
      width: '1px',
      style: 'solid'
    },
    headingProps: {
      fontSize: 'lg',
      fontWeight: 'medium',
      color: '#ffffff'
    },
    subtitleProps: {
      fontSize: 'md',
      fontWeight: 'normal',
      color: '#e0e0e0'
    },
    bodyProps: {
      fontSize: 'md',
      fontWeight: 'normal',
      color: '#ffffff'
    },
    linkProps: {
      color: '#66b3ff',
      hoverColor: '#99ccff'
    }
  }
} as const;

const getFontSize = (size?: string) => {
  switch (size) {
    case 'sm': return '0.875rem';
    case 'md': return '1rem';
    case 'lg': return '1.125rem';
    case 'xl': return '1.25rem';
    default: return '1rem';
  }
};

const getFontWeight = (weight?: string) => {
  switch (weight) {
    case 'normal': return 400;
    case 'medium': return 500;
    case 'bold': return 700;
    default: return 400;
  }
};

export const useBlockStyles = ({ config, isDarkTheme }: UseBlockStylesProps) => {
  const themeConfig = config?.styles?.theme || defaultTheme;
  const currentTheme = isDarkTheme ? 'dark' : 'light';
  const themeStyles = themeConfig[currentTheme] || defaultTheme[currentTheme];

  const getColumnStyle = (colKey?: string): React.CSSProperties => {
    const baseStyle = {
      backgroundColor: themeStyles?.columnStyle?.background || defaultTheme[currentTheme].columnStyle.background,
      padding: themeStyles?.columnStyle?.padding ? `${themeStyles.columnStyle.padding}px` : '16px',
      ...config.styles?.columnStyles?.default
    } as React.CSSProperties;

    if (colKey && config.styles?.columnStyles?.[colKey]) {
      const colStyle = config.styles.columnStyles[colKey];
      const style = {
        ...baseStyle,
        backgroundColor: colStyle.background || baseStyle.backgroundColor,
        padding: colStyle.padding ? `${colStyle.padding}px` : baseStyle.padding,
      } as React.CSSProperties;

      if (colStyle.border) {
        style.borderWidth = `${colStyle.border.width}px`;
        style.borderStyle = colStyle.border.style;
        style.borderColor = colStyle.border.color;
      }

      return style;
    }

    return baseStyle;
  };

  const getStyleProps = (props?: StyleProps, defaultProps?: StyleProps) => ({
    fontSize: getFontSize(props?.fontSize || defaultProps?.fontSize || 'md'),
    fontWeight: getFontWeight(props?.fontWeight || defaultProps?.fontWeight || 'normal'),
    color: props?.color || defaultProps?.color || (isDarkTheme ? '#ffffff' : '#1a1a1a')
  });

  return {
    containerStyle: {
      backgroundColor: config.styles?.backgroundColor || 'transparent'
    } as React.CSSProperties,
    columnStyle: getColumnStyle,
    headingStyle: getStyleProps(
      config.styles?.headingProps, 
      themeStyles?.headingProps || defaultTheme[currentTheme].headingProps
    ),
    subtitleStyle: getStyleProps(
      config.styles?.subtitleProps, 
      themeStyles?.subtitleProps || defaultTheme[currentTheme].subtitleProps
    ),
    bodyStyle: getStyleProps(
      config.styles?.bodyProps, 
      themeStyles?.bodyProps || defaultTheme[currentTheme].bodyProps
    ),
    linkStyle: {
      color: config.styles?.linkProps?.color || themeStyles?.linkProps?.color || defaultTheme[currentTheme].linkProps.color,
      '&:hover': {
        color: config.styles?.linkProps?.hoverColor || themeStyles?.linkProps?.hoverColor || defaultTheme[currentTheme].linkProps.hoverColor
      }
    }
  };
}; 