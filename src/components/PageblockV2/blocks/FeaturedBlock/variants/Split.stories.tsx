import React from 'react';
import { Story, Meta } from '@storybook/react';
import Split from './Split';
import { BlockVariant } from '../../../types';
import { createArticles } from '../../../stories/mockData';
import { ResponsiveDeviceProvider } from '../../../contexts/ResponsiveDeviceContext';

export default {
  title: 'PageBlock/Featured/Split',
  component: Split,
  decorators: [
    (Story) => (
      <ResponsiveDeviceProvider>
        <Story />
      </ResponsiveDeviceProvider>
    ),
  ],
} as Meta;

const Template: Story<{ variant: BlockVariant; isDarkTheme?: boolean }> = (args) => <Split {...args} />;

// Criar artigos mock para Split
const splitArticles = {
  'col-0': createArticles(1),
  'col-1': createArticles(1)
};

// Mock base para Split variant
const baseSplitVariant: BlockVariant = {
  variantType: 'split',
  variantPosition: 1,
  config: {
    layout: {
      columns: 2,
      gap: '24px',
      padding: '24px',
      responsive: {
        mobile: 1,
        tablet: 2,
        desktop: 2
      }
    },
    articles: splitArticles,
    styles: {
      theme: {
        light: {
          columnStyle: {
            background: "#ffffff",
            padding: 24
          },
          headingProps: {
            fontSize: "2xl",
            fontWeight: "bold",
            color: "#1a1a1a"
          },
          subtitleProps: {
            fontSize: "lg",
            color: "#4a4a4a"
          }
        },
        dark: {
          columnStyle: {
            background: "#1a1a1a",
            padding: 24
          },
          headingProps: {
            fontSize: "2xl",
            fontWeight: "bold",
            color: "#ffffff"
          },
          subtitleProps: {
            fontSize: "lg",
            color: "#e0e0e0"
          }
        }
      },
      titleSize: '2xl',
      columnStyle: {},
      imageHeight: '400px',
      showExcerpt: true,
      showMetadata: true
    }
  }
};

// Default variant
export const Default = Template.bind({});
Default.args = {
  variant: baseSplitVariant,
  isDarkTheme: false
};

// Custom styles
export const CustomStyles = Template.bind({});
CustomStyles.args = {
  variant: {
    ...baseSplitVariant,
    config: {
      ...baseSplitVariant.config,
      styles: {
        ...baseSplitVariant.config.styles,
        theme: {
          light: {
            columnStyle: {
              background: "#f7fafc",
              padding: 32,
              borderRadius: '12px'
            },
            headingProps: {
              fontSize: "3xl",
              fontWeight: "bold",
              color: "#2d3748"
            },
            subtitleProps: {
              fontSize: "xl",
              color: "#4a5568"
            }
          },
          dark: {
            columnStyle: {
              background: "#2d3748",
              padding: 32,
              borderRadius: '12px'
            },
            headingProps: {
              fontSize: "3xl",
              fontWeight: "bold",
              color: "#f7fafc"
            },
            subtitleProps: {
              fontSize: "xl",
              color: "#e2e8f0"
            }
          }
        },
        columnStyles: {
          'col-0': {
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          },
          'col-1': {
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
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

// Asymmetric layout
export const AsymmetricLayout = Template.bind({});
AsymmetricLayout.args = {
  variant: {
    ...baseSplitVariant,
    config: {
      ...baseSplitVariant.config,
      layout: {
        ...baseSplitVariant.config.layout,
        columns: 2,
        gap: '32px',
        responsive: {
          mobile: 1,
          tablet: 2,
          desktop: 2
        }
      },
      styles: {
        ...baseSplitVariant.config.styles,
        columnStyles: {
          'col-0': {
            flex: '2',
            backgroundColor: "#edf2f7"
          },
          'col-1': {
            flex: '1',
            backgroundColor: "#e2e8f0"
          }
        }
      }
    }
  },
  isDarkTheme: false
}; 