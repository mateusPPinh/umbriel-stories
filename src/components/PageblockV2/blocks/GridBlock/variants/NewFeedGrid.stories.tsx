// src/components/PageblockV2/blocks/GridBlock/variants/NewsFeedGrid.stories.tsx
import React from 'react';
import { Story, Meta } from '@storybook/react';
import NewsFeedGrid from './NewsFeedGrid';
import { BlockVariant } from '../../../types';
import { createArticles } from '../../../stories/mockData';
import { ResponsiveDeviceProvider } from '../../../contexts/ResponsiveDeviceContext';

export default {
  title: 'PageBlock/Grid/NewsFeedGrid',
  component: NewsFeedGrid,
  decorators: [
    (Story) => (
      <ResponsiveDeviceProvider>
        <Story />
      </ResponsiveDeviceProvider>
    ),
  ],
} as Meta;

const Template: Story<{ variant: BlockVariant; isDarkTheme?: boolean }> = (args) => <NewsFeedGrid {...args} />;

// Criar artigos mock para grid
const gridArticles = {
  'col-0': createArticles(6), // Uma única coluna com 6 artigos
};

// Mock base para NewsFeedGrid variant
const baseGridVariant: BlockVariant = {
  variantType: 'newsfeed',
  variantPosition: 1,
  config: {
    layout: {
      columns: 1,
      gap: '16px',
      padding: '24px',
      responsive: {
        mobile: 1,
        tablet: 1,
        desktop: 1
      }
    },
    articles: gridArticles,
    styles: {
      theme: {
        light: {
          columnStyle: {
            background: "#ffffff",
          },
          headingProps: {
            fontSize: "xl",
            fontWeight: "semibold",
            color: "#1a1a1a"
          },
          subtitleProps: {
            fontSize: "base",
            color: "#4a5568"
          }
        },
        dark: {
          columnStyle: {
            background: "#1a1a1a",
          },
          headingProps: {
            fontSize: "xl",
            fontWeight: "semibold",
            color: "#ffffff"
          },
          subtitleProps: {
            fontSize: "base",
            color: "#a0aec0"
          }
        }
      },
      showExcerpt: true,
      showMetadata: true
    }
  }
};

// Default variant
export const Default = Template.bind({});
Default.args = {
  variant: baseGridVariant,
  isDarkTheme: false
};

// Dark theme
export const DarkTheme = Template.bind({});
DarkTheme.args = {
  ...Default.args,
  isDarkTheme: true
};

// Compact version
export const Compact = Template.bind({});
Compact.args = {
  variant: {
    ...baseGridVariant,
    config: {
      ...baseGridVariant.config,
      styles: {
        ...baseGridVariant.config.styles,
        theme: {
          light: {
            ...baseGridVariant.config.styles.theme.light,
            headingProps: {
              fontSize: "lg",
              fontWeight: "medium",
              color: "#1a1a1a"
            }
          },
          dark: {
            ...baseGridVariant.config.styles.theme.dark,
            headingProps: {
              fontSize: "lg",
              fontWeight: "medium",
              color: "#ffffff"
            }
          }
        }
      }
    }
  },
  isDarkTheme: false
};