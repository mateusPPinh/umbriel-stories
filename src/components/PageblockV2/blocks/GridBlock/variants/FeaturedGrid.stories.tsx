import React from 'react';
import { Story, Meta } from '@storybook/react';
import FeaturedGrid from './FeaturedGrid';
import { BlockVariant } from '../../../types';
import { createArticles } from '../../../stories/mockData';
import { ResponsiveDeviceProvider } from '../../../contexts/ResponsiveDeviceContext';

export default {
  title: 'PageBlock/Grid/FeaturedGrid',
  component: FeaturedGrid,
  decorators: [
    (Story) => (
      <ResponsiveDeviceProvider>
        <Story />
      </ResponsiveDeviceProvider>
    ),
  ],
} as Meta;

const Template: Story<{ variant: BlockVariant; isDarkTheme?: boolean }> = (args) => <FeaturedGrid {...args} />;

// Criar artigos mock para grid
const gridArticles = {
  'col-0': createArticles(1),
  'col-1': createArticles(1),
  'col-2': createArticles(1)
};

// Mock base para FeaturedGrid variant
const baseFeaturedVariant: BlockVariant = {
  variantType: 'featured',
  variantPosition: 1,
  config: {
    layout: {
      columns: 3,
      gap: '32px',
      padding: '24px',
      responsive: {
        mobile: 1,
        tablet: 2,
        desktop: 3
      }
    },
    articles: gridArticles,
    styles: {
      theme: {
        light: {
          columnStyle: {
            background: "#ffffff",
            borderRadius: '12px',
            overflow: 'hidden'
          },
          headingProps: {
            fontSize: "2xl",
            fontWeight: "bold",
            color: "#ffffff"
          },
          subtitleProps: {
            fontSize: "lg",
            color: "rgba(255,255,255,0.8)"
          }
        },
        dark: {
          columnStyle: {
            background: "#1a1a1a",
            borderRadius: '12px',
            overflow: 'hidden'
          },
          headingProps: {
            fontSize: "2xl",
            fontWeight: "bold",
            color: "#ffffff"
          },
          subtitleProps: {
            fontSize: "lg",
            color: "rgba(255,255,255,0.8)"
          }
        }
      },
      featuredImageOverlay: true,
      overlayGradient: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
      showExcerpt: true
    }
  }
};

// Default variant
export const Default = Template.bind({});
Default.args = {
  variant: baseFeaturedVariant,
  isDarkTheme: false
};

// Custom styles
export const CustomStyles = Template.bind({});
CustomStyles.args = {
  variant: {
    ...baseFeaturedVariant,
    config: {
      ...baseFeaturedVariant.config,
      styles: {
        ...baseFeaturedVariant.config.styles,
        theme: {
          light: {
            columnStyle: {
              background: "#ffffff",
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            },
            headingProps: {
              fontSize: "3xl",
              fontWeight: "bold",
              color: "#ffffff"
            },
            subtitleProps: {
              fontSize: "xl",
              color: "rgba(255,255,255,0.9)"
            }
          },
          dark: {
            columnStyle: {
              background: "#1a1a1a",
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
            },
            headingProps: {
              fontSize: "3xl",
              fontWeight: "bold",
              color: "#ffffff"
            },
            subtitleProps: {
              fontSize: "xl",
              color: "rgba(255,255,255,0.9)"
            }
          }
        },
        overlayGradient: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)'
      }
    }
  },
  isDarkTheme: false
};

// Alternative overlay
export const AlternativeOverlay = Template.bind({});
AlternativeOverlay.args = {
  variant: {
    ...baseFeaturedVariant,
    config: {
      ...baseFeaturedVariant.config,
      styles: {
        ...baseFeaturedVariant.config.styles,
        overlayGradient: 'linear-gradient(45deg, rgba(76,29,149,0.8) 0%, rgba(219,39,119,0.8) 100%)'
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