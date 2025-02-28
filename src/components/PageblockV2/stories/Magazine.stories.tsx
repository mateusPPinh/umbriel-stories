import React from 'react';
import { Story, Meta } from '@storybook/react';
import Magazine from '../blocks/MixedBlock/variants/Magazine';
import { BlockVariant } from '../types';
import { createArticles } from './mockData';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';

export default {
  title: 'PageBlockV2/Mixed/Magazine',
  component: Magazine,
  decorators: [
    (Story) => (
      <ResponsiveDeviceProvider>
        <Story />
      </ResponsiveDeviceProvider>
    ),
  ],
} as Meta;

const Template: Story<{ variant: BlockVariant; isDarkTheme?: boolean }> = (args) => <Magazine {...args} />;

// Criar artigos mock
const magazineArticles = {
  'col-0': createArticles(1),  // Main article
  'col-1': createArticles(2),  // Secondary articles
  'col-2': createArticles(3)   // Compact list articles
};

// Mock base para Magazine variant
const baseMagazineVariant: BlockVariant = {
  variantType: 'magazine',
  variantPosition: 1,
  config: {
    layout: {
      columns: 3,
      gap: '24px',
      padding: '24px',
      responsive: {
        mobile: 1,
        tablet: 2,
        desktop: 3
      }
    },
    articles: magazineArticles,
    styles: {
      theme: {
        light: {
          mainArticleStyle: {
            background: "#ffffff",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          },
          secondaryArticleStyle: {
            background: "#f8fafc",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
          },
          compactListStyle: {
            background: "transparent",
            borderTop: "2px solid #e2e8f0"
          },
          headingProps: {
            fontSize: {
              main: "3xl",
              secondary: "xl",
              compact: "lg"
            },
            fontWeight: {
              main: "bold",
              secondary: "semibold",
              compact: "medium"
            },
            color: "#1a1a1a"
          },
          subtitleProps: {
            fontSize: {
              main: "xl",
              secondary: "lg",
              compact: "base"
            },
            color: "#4a5568"
          }
        },
        dark: {
          mainArticleStyle: {
            background: "#1a1a1a",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)"
          },
          secondaryArticleStyle: {
            background: "#2d3748",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.2)"
          },
          compactListStyle: {
            background: "transparent",
            borderTop: "2px solid #4a5568"
          },
          headingProps: {
            fontSize: {
              main: "3xl",
              secondary: "xl",
              compact: "lg"
            },
            fontWeight: {
              main: "bold",
              secondary: "semibold",
              compact: "medium"
            },
            color: "#ffffff"
          },
          subtitleProps: {
            fontSize: {
              main: "xl",
              secondary: "lg",
              compact: "base"
            },
            color: "#a0aec0"
          }
        }
      },
      showExcerpt: {
        main: true,
        secondary: true,
        compact: false
      },
      showImage: {
        main: true,
        secondary: true,
        compact: false
      },
      imageStyle: {
        main: {
          aspectRatio: '16/9',
          borderRadius: '12px'
        },
        secondary: {
          aspectRatio: '4/3',
          borderRadius: '8px'
        }
      }
    }
  }
};

// Default variant
export const Default = Template.bind({});
Default.args = {
  variant: baseMagazineVariant,
  isDarkTheme: false
};

// Modern style
export const ModernStyle = Template.bind({});
ModernStyle.args = {
  variant: {
    ...baseMagazineVariant,
    config: {
      ...baseMagazineVariant.config,
      styles: {
        ...baseMagazineVariant.config.styles,
        theme: {
          light: {
            mainArticleStyle: {
              background: "#ffffff",
              padding: "32px",
              borderRadius: "16px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
            },
            secondaryArticleStyle: {
              background: "#f8fafc",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 2px 4px -2px rgba(0,0,0,0.05)"
            },
            compactListStyle: {
              background: "transparent",
              borderTop: "3px solid #e2e8f0"
            }
          },
          dark: {
            mainArticleStyle: {
              background: "#1a1a1a",
              padding: "32px",
              borderRadius: "16px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.3)"
            },
            secondaryArticleStyle: {
              background: "#2d3748",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 2px 4px -2px rgba(0,0,0,0.2)"
            },
            compactListStyle: {
              background: "transparent",
              borderTop: "3px solid #4a5568"
            }
          }
        },
        imageStyle: {
          main: {
            aspectRatio: '21/9',
            borderRadius: '16px'
          },
          secondary: {
            aspectRatio: '16/9',
            borderRadius: '12px'
          }
        }
      }
    }
  },
  isDarkTheme: false
};

// Minimal style
export const MinimalStyle = Template.bind({});
MinimalStyle.args = {
  variant: {
    ...baseMagazineVariant,
    config: {
      ...baseMagazineVariant.config,
      styles: {
        ...baseMagazineVariant.config.styles,
        showExcerpt: {
          main: true,
          secondary: false,
          compact: false
        },
        theme: {
          light: {
            mainArticleStyle: {
              background: "transparent",
              padding: "0",
              borderRadius: "0"
            },
            secondaryArticleStyle: {
              background: "transparent",
              padding: "0",
              borderRadius: "0"
            },
            compactListStyle: {
              background: "transparent",
              borderTop: "1px solid #e2e8f0"
            }
          },
          dark: {
            mainArticleStyle: {
              background: "transparent",
              padding: "0",
              borderRadius: "0"
            },
            secondaryArticleStyle: {
              background: "transparent",
              padding: "0",
              borderRadius: "0"
            },
            compactListStyle: {
              background: "transparent",
              borderTop: "1px solid #4a5568"
            }
          }
        }
      }
    }
  },
  isDarkTheme: false
};

// Dark theme
export const DarkTheme = Template.bind({});
DarkTheme.args = {
  ...Default.args,
  isDarkTheme: true
}; 