import React from 'react';
import { Story, Meta } from '@storybook/react';
import StandardGrid from '../blocks/GridBlock/variants/StandardGrid';
import { BlockVariant } from '../types';
import { createArticles } from './mockData';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';

export default {
  title: 'PageBlockV2/Grid/StandardGrid',
  component: StandardGrid,
  decorators: [
    (Story) => (
      <ResponsiveDeviceProvider>
        <Story />
      </ResponsiveDeviceProvider>
    ),
  ],
} as Meta;

const Template: Story<{ variant: BlockVariant; isDarkTheme?: boolean }> = (args) => <StandardGrid {...args} />;

// Criar artigos mock para grid
const gridArticles = {
  'col-0': createArticles(1),
  'col-1': createArticles(1),
  'col-2': createArticles(1),
  'col-3': createArticles(1)
};

// Mock base para StandardGrid variant
const baseGridVariant: BlockVariant = {
  variantType: 'standard',
  variantPosition: 1,
  config: {
    layout: {
      columns: 4,
      gap: '24px',
      padding: '24px',
      responsive: {
        mobile: 1,
        tablet: 2,
        desktop: 4
      }
    },
    articles: gridArticles,
    styles: {
      theme: {
        light: {
          columnStyle: {
            background: "#ffffff",
            padding: 16,
            borderRadius: '8px'
          },
          headingProps: {
            fontSize: "xl",
            fontWeight: "semibold",
            color: "#1a1a1a"
          },
          subtitleProps: {
            fontSize: "md",
            color: "#4a4a4a"
          }
        },
        dark: {
          columnStyle: {
            background: "#1a1a1a",
            padding: 16,
            borderRadius: '8px'
          },
          headingProps: {
            fontSize: "xl",
            fontWeight: "semibold",
            color: "#ffffff"
          },
          subtitleProps: {
            fontSize: "md",
            color: "#e0e0e0"
          }
        }
      },
      showExcerpt: true
    }
  }
};

// Default variant
export const Default = Template.bind({});
Default.args = {
  variant: baseGridVariant,
  isDarkTheme: false
};

// Custom styles
export const CustomStyles = Template.bind({});
CustomStyles.args = {
  variant: {
    ...baseGridVariant,
    config: {
      ...baseGridVariant.config,
      styles: {
        ...baseGridVariant.config.styles,
        theme: {
          light: {
            columnStyle: {
              background: "#f7fafc",
              padding: 24,
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            },
            headingProps: {
              fontSize: "2xl",
              fontWeight: "bold",
              color: "#2d3748"
            },
            subtitleProps: {
              fontSize: "lg",
              color: "#4a5568"
            }
          },
          dark: {
            columnStyle: {
              background: "#2d3748",
              padding: 24,
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            },
            headingProps: {
              fontSize: "2xl",
              fontWeight: "bold",
              color: "#f7fafc"
            },
            subtitleProps: {
              fontSize: "lg",
              color: "#e2e8f0"
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
  ...CustomStyles.args,
  isDarkTheme: true
};

// Hover effects
export const WithHoverEffects = Template.bind({});
WithHoverEffects.args = {
  variant: {
    ...baseGridVariant,
    config: {
      ...baseGridVariant.config,
      styles: {
        ...baseGridVariant.config.styles,
        theme: {
          light: {
            columnStyle: {
              background: "#ffffff",
              padding: 16,
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
              }
            }
          },
          dark: {
            columnStyle: {
              background: "#1a1a1a",
              padding: 16,
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 15px rgba(0,0,0,0.3)'
              }
            }
          }
        }
      }
    }
  },
  isDarkTheme: false
}; 