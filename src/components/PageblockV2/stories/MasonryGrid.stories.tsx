import React from 'react';
import { Story, Meta } from '@storybook/react';
import MasonryGrid from '../blocks/GridBlock/variants/MasonryGrid';
import { BlockVariant, ClientTheme } from '../types';
import { createArticles } from './mockData';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';
import { mockClientTheme } from './mockClientTheme';

export default {
  title: 'PageBlockV2/Grid/MasonryGrid',
  component: MasonryGrid,
  decorators: [
    (Story) => (
      <ResponsiveDeviceProvider>
        <Story />
      </ResponsiveDeviceProvider>
    ),
  ],
} as Meta;

const Template: Story<{ variant: BlockVariant; isDarkTheme?: boolean; clientGeneralSettingsData: ClientTheme }> = (args) => <MasonryGrid {...args} clientGeneralSettingsData={mockClientTheme} />;

// Criar artigos mock para masonry
const masonryArticles = {
  'col-0': createArticles(3),
  'col-1': createArticles(3),
  'col-2': createArticles(3)
};

// Mock base para MasonryGrid variant
const baseMasonryVariant: BlockVariant = {
  variantType: 'masonry',
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
    articles: masonryArticles,
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
      showExcerpt: true,
      imageVariations: ['square', 'portrait', 'landscape'],
      hoverEffect: 'scale'
    }
  }
};

// Default variant
export const Default = Template.bind({});
Default.args = {
  variant: baseMasonryVariant,
  isDarkTheme: false
};

// Custom styles with lift effect
export const CustomWithLift = Template.bind({});
CustomWithLift.args = {
  variant: {
    ...baseMasonryVariant,
    config: {
      ...baseMasonryVariant.config,
      styles: {
        ...baseMasonryVariant.config.styles,
        theme: {
          light: {
            columnStyle: {
              background: "#f7fafc",
              padding: 20,
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
              padding: 20,
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
        },
        hoverEffect: 'lift'
      }
    }
  },
  isDarkTheme: false
};

// Portrait focused
export const PortraitFocused = Template.bind({});
PortraitFocused.args = {
  variant: {
    ...baseMasonryVariant,
    config: {
      ...baseMasonryVariant.config,
      styles: {
        ...baseMasonryVariant.config.styles,
        imageVariations: ['portrait', 'portrait', 'square']
      }
    }
  },
  isDarkTheme: false
};

// Dark theme
export const DarkTheme = Template.bind({});
DarkTheme.args = {
  ...CustomWithLift.args,
  isDarkTheme: true
}; 