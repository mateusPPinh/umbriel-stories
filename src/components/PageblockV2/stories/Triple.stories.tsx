import React from 'react';
import { Story, Meta } from '@storybook/react';
import Triple from '../blocks/FeaturedBlock/variants/Triple';
import { BlockVariant } from '../types';
import { mockBlocks, createArticles, baseBlockConfig, baseVariantConfig } from './mockData';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';

export default {
  title: 'PageBlockV2/Featured/Triple',
  component: Triple,
  decorators: [
    (Story) => (
      <ResponsiveDeviceProvider>
        <Story />
      </ResponsiveDeviceProvider>
    ),
  ],
} as Meta;

const Template: Story<{ variant: BlockVariant; isDarkTheme?: boolean }> = (args) => <Triple {...args} />;

// Criar artigos mock para 3 colunas
const tripleArticles = {
  'col-0': createArticles(1),
  'col-1': createArticles(1),
  'col-2': createArticles(1)
};

// Mock base para Triple variant
const baseTripleVariant: BlockVariant = {
  variantType: 'triple',
  variantPosition: 1,
  config: {
    layout: {
      columns: 3,
      gap: '16px',
      padding: '24px',
      responsive: {
        mobile: 1,
        tablet: 2,
        desktop: 3
      }
    },
    articles: tripleArticles,
    styles: {
      theme: {
        light: {
          columnStyle: {
            background: "#ffffff",
            padding: 16
          },
          headingProps: {
            fontSize: "lg",
            fontWeight: "medium",
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
            padding: 16
          },
          headingProps: {
            fontSize: "lg",
            fontWeight: "medium",
            color: "#ffffff"
          },
          subtitleProps: {
            fontSize: "md",
            color: "#e0e0e0"
          }
        }
      },
      titleSize: 'lg',
      columnStyle: {},
      imageHeight: '200px',
      showExcerpt: true,
      showMetadata: false
    }
  }
};

// Default variant
export const Default = Template.bind({});
Default.args = {
  variant: baseTripleVariant,
  isDarkTheme: false
};

// With custom styles
export const CustomStyles = Template.bind({});
CustomStyles.args = {
  variant: {
    ...baseTripleVariant,
    config: {
      ...baseTripleVariant.config,
      styles: {
        ...baseTripleVariant.config.styles,
        theme: {
          light: {
            columnStyle: {
              background: "#f0f0f0",
              padding: 24,
              borderRadius: '8px'
            },
            headingProps: {
              fontSize: "2xl",
              fontWeight: "bold",
              color: "#2c5282"
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
              borderRadius: '8px'
            },
            headingProps: {
              fontSize: "2xl",
              fontWeight: "bold",
              color: "#90cdf4"
            },
            subtitleProps: {
              fontSize: "lg",
              color: "#e2e8f0"
            }
          }
        },
        columnStyles: {
          'col-0': { backgroundColor: "#edf2f7" },
          'col-1': { backgroundColor: "#e2e8f0" },
          'col-2': { backgroundColor: "#edf2f7" }
        }
      }
    }
  },
  isDarkTheme: false
};

// Dark theme with custom styles
export const DarkThemeCustom = Template.bind({});
DarkThemeCustom.args = {
  ...CustomStyles.args,
  isDarkTheme: true
};

// With different column styles
export const CustomColumnStyles = Template.bind({});
CustomColumnStyles.args = {
  variant: {
    ...baseTripleVariant,
    config: {
      ...baseTripleVariant.config,
      styles: {
        ...baseTripleVariant.config.styles,
        columnStyles: {
          'col-0': {
            backgroundColor: "#f7fafc",
            borderLeft: "4px solid #4299e1"
          },
          'col-1': {
            backgroundColor: "#f7fafc",
            borderLeft: "4px solid #48bb78"
          },
          'col-2': {
            backgroundColor: "#f7fafc",
            borderLeft: "4px solid #ed8936"
          }
        }
      }
    }
  },
  isDarkTheme: false
};

// Responsive behavior
export const ResponsiveLayout = Template.bind({});
ResponsiveLayout.args = {
  variant: {
    ...baseTripleVariant,
    config: {
      ...baseTripleVariant.config,
      layout: {
        ...baseTripleVariant.config.layout,
        responsive: {
          mobile: 1,
          tablet: 2,
          desktop: 3
        }
      },
      styles: {
        ...baseTripleVariant.config.styles,
        theme: {
          light: {
            columnStyle: {
              background: "#ffffff",
              padding: 16,
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
            }
          },
          dark: {
            columnStyle: {
              background: "#1a1a1a",
              padding: 16,
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.24)'
            }
          }
        }
      }
    }
  },
  isDarkTheme: false
}; 