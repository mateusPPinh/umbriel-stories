import React from 'react';
import { Story, Meta } from '@storybook/react';
import Hero from '../blocks/FeaturedBlock/variants/Hero';
import { BlockVariant } from '../types';
import { createArticles } from './mockData';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';

export default {
  title: 'PageBlockV2/Featured/Hero',
  component: Hero,
  decorators: [
    (Story) => (
      <ResponsiveDeviceProvider>
        <Story />
      </ResponsiveDeviceProvider>
    ),
  ],
} as Meta;

const Template: Story<{ variant: BlockVariant; isDarkTheme?: boolean }> = (args) => <Hero {...args} />;

// Criar artigos mock para Hero
const heroArticles = {
  'col-0': createArticles(1)
};

// Mock base para Hero variant
const baseHeroVariant: BlockVariant = {
  variantType: 'hero',
  variantPosition: 1,
  config: {
    layout: {
      columns: 1,
      gap: '0px',
      padding: '0px',
      responsive: {
        mobile: 1,
        tablet: 1,
        desktop: 1
      }
    },
    articles: heroArticles,
    styles: {
      theme: {
        light: {
          columnStyle: {
            background: "transparent",
            padding: 0
          },
          headingProps: {
            fontSize: "4xl",
            fontWeight: "bold",
            color: "#1a1a1a"
          },
          subtitleProps: {
            fontSize: "xl",
            color: "#4a4a4a"
          }
        },
        dark: {
          columnStyle: {
            background: "transparent",
            padding: 0
          },
          headingProps: {
            fontSize: "4xl",
            fontWeight: "bold",
            color: "#ffffff"
          },
          subtitleProps: {
            fontSize: "xl",
            color: "#e0e0e0"
          }
        }
      },
      titleSize: '4xl',
      imageHeight: '600px',
      showExcerpt: true,
      showMetadata: true
    }
  }
};

// Default variant
export const Default = Template.bind({});
Default.args = {
  variant: baseHeroVariant,
  isDarkTheme: false
};

// Custom styles
export const CustomStyles = Template.bind({});
CustomStyles.args = {
  variant: {
    ...baseHeroVariant,
    config: {
      ...baseHeroVariant.config,
      styles: {
        ...baseHeroVariant.config.styles,
        theme: {
          light: {
            columnStyle: {
              background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)",
              padding: 32
            },
            headingProps: {
              fontSize: "5xl",
              fontWeight: "bold",
              color: "#ffffff"
            },
            subtitleProps: {
              fontSize: "2xl",
              color: "#f7fafc"
            }
          },
          dark: {
            columnStyle: {
              background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)",
              padding: 32
            },
            headingProps: {
              fontSize: "5xl",
              fontWeight: "bold",
              color: "#ffffff"
            },
            subtitleProps: {
              fontSize: "2xl",
              color: "#f7fafc"
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