import React from 'react';
import { Story, Meta } from '@storybook/react';
import CompactList from '../blocks/ListBlock/variants/CompactList';
import { BlockVariant } from '../types';
import { createArticles } from './mockData';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';

export default {
  title: 'PageBlockV2/List/CompactList',
  component: CompactList,
  decorators: [
    (Story) => (
      <ResponsiveDeviceProvider>
        <Story />
      </ResponsiveDeviceProvider>
    ),
  ],
} as Meta;

const Template: Story<{ variant: BlockVariant; isDarkTheme?: boolean }> = (args) => <CompactList {...args} />;

// Criar artigos mock para lista
const listArticles = {
  'col-0': createArticles(5)
};

// Mock base para CompactList variant
const baseCompactVariant: BlockVariant = {
  variantType: 'compact',
  variantPosition: 1,
  config: {
    layout: {
      columns: 1,
      gap: '0px',
      padding: '24px',
      responsive: {
        mobile: 1,
        tablet: 1,
        desktop: 1
      }
    },
    articles: listArticles,
    styles: {
      theme: {
        light: {
          columnStyle: {
            background: "transparent",
            borderBottom: "1px solid #e2e8f0",
            padding: "16px 0"
          },
          headingProps: {
            fontSize: "lg",
            fontWeight: "medium",
            color: "#1a1a1a"
          },
          subtitleProps: {
            fontSize: "sm",
            color: "#4a5568"
          }
        },
        dark: {
          columnStyle: {
            background: "transparent",
            borderBottom: "1px solid #2d3748",
            padding: "16px 0"
          },
          headingProps: {
            fontSize: "lg",
            fontWeight: "medium",
            color: "#ffffff"
          },
          subtitleProps: {
            fontSize: "sm",
            color: "#a0aec0"
          }
        }
      },
      showExcerpt: true,
      showMetadata: true,
      hoverEffect: 'background',
      dividerStyle: 'solid'
    }
  }
};

// Default variant
export const Default = Template.bind({});
Default.args = {
  variant: baseCompactVariant,
  isDarkTheme: false
};

// Custom styles with translate effect
export const CustomWithTranslate = Template.bind({});
CustomWithTranslate.args = {
  variant: {
    ...baseCompactVariant,
    config: {
      ...baseCompactVariant.config,
      styles: {
        ...baseCompactVariant.config.styles,
        theme: {
          light: {
            columnStyle: {
              background: "transparent",
              borderBottom: "2px solid #e2e8f0",
              padding: "20px 0"
            },
            headingProps: {
              fontSize: "xl",
              fontWeight: "bold",
              color: "#2d3748"
            },
            subtitleProps: {
              fontSize: "md",
              color: "#4a5568"
            }
          },
          dark: {
            columnStyle: {
              background: "transparent",
              borderBottom: "2px solid #2d3748",
              padding: "20px 0"
            },
            headingProps: {
              fontSize: "xl",
              fontWeight: "bold",
              color: "#f7fafc"
            },
            subtitleProps: {
              fontSize: "md",
              color: "#cbd5e0"
            }
          }
        },
        hoverEffect: 'translate',
        dividerStyle: 'dashed'
      }
    }
  },
  isDarkTheme: false
};

// Minimal style
export const Minimal = Template.bind({});
Minimal.args = {
  variant: {
    ...baseCompactVariant,
    config: {
      ...baseCompactVariant.config,
      styles: {
        ...baseCompactVariant.config.styles,
        theme: {
          light: {
            columnStyle: {
              background: "transparent",
              borderBottom: "1px solid #edf2f7",
              padding: "12px 0"
            },
            headingProps: {
              fontSize: "md",
              fontWeight: "normal",
              color: "#2d3748"
            },
            subtitleProps: {
              fontSize: "sm",
              color: "#718096"
            }
          },
          dark: {
            columnStyle: {
              background: "transparent",
              borderBottom: "1px solid #2d3748",
              padding: "12px 0"
            },
            headingProps: {
              fontSize: "md",
              fontWeight: "normal",
              color: "#e2e8f0"
            },
            subtitleProps: {
              fontSize: "sm",
              color: "#a0aec0"
            }
          }
        },
        showMetadata: false,
        hoverEffect: 'none'
      }
    }
  },
  isDarkTheme: false
};

// Dark theme
export const DarkTheme = Template.bind({});
DarkTheme.args = {
  ...CustomWithTranslate.args,
  isDarkTheme: true
}; 