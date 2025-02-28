// src/components/PageblockV2/blocks/GridBlock/variants/NewsGrid.stories.tsx
import React from 'react';
import { Story, Meta } from '@storybook/react';
import NewsGrid from '../blocks/GridBlock/variants/NewsGrid';
import { BlockVariant } from '../types';
import { createArticles } from './mockData';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';

export default {
  title: 'PageBlockV2/Grid/NewsGrid',
  component: NewsGrid,
  decorators: [
    (Story) => (
      <ResponsiveDeviceProvider>
        <Story />
      </ResponsiveDeviceProvider>
    ),
  ],
} as Meta;

const Template: Story<{ variant: BlockVariant; isDarkTheme?: boolean }> = (args) => <NewsGrid {...args} />;

// Criar artigos mock para grid com múltiplas rows
const gridArticles = {
  // Primeira row
  'row-0-col-0': createArticles(3),
  'row-0-col-1': createArticles(3),
  'row-0-col-2': createArticles(3),
  'row-0-col-3': createArticles(3),
  'row-0-col-4': createArticles(3),
  // Segunda row
  'row-1-col-0': createArticles(3),
  'row-1-col-1': createArticles(3),
  'row-1-col-2': createArticles(3),
  'row-1-col-3': createArticles(3),
  'row-1-col-4': createArticles(3)
};

const baseGridVariant: BlockVariant = {
  variantType: 'news',
  variantPosition: 1,
  config: {
    layout: {
      columns: 5,
      gap: '24px',
      padding: '24px',
      imageSize: '100%',
      aspectRatio: '16/9',
      responsive: {
        mobile: 1,
        tablet: 3,
        desktop: 5
      },
      styles: {
        grid: {
          autoRows: 'auto',
          templateColumns: 'repeat(5, 1fr)'
        },
        width: '100%',
        backgroundColor: 'transparent',
        columnStyles: {}
      }
    },
    articles: gridArticles,
    styles: {
      theme: {
        light: {
          columnStyle: {
            background: "#ffffff"
          },
          headingProps: {
            fontSize: "lg",
            fontWeight: 600,
            color: "#1a1a1a"
          },
          subtitleProps: {
            fontSize: "base",
            color: "#4a5568"
          }
        },
        dark: {
          columnStyle: {
            background: "#1a1a1a"
          },
          headingProps: {
            fontSize: "lg",
            fontWeight: 600,
            color: "#ffffff"
          },
          subtitleProps: {
            fontSize: "base",
            color: "#a0aec0"
          }
        }
      },
      titleSize: "lg",
      columnStyle: {},
      imageHeight: "300px",
      showExcerpt: false,
      showMetadata: false
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
              fontSize: "base",
              fontWeight: "medium",
              color: "#1a1a1a"
            }
          },
          dark: {
            ...baseGridVariant.config.styles.theme.dark,
            headingProps: {
              fontSize: "base",
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

// MultiRow version (2 rows completas)
export const MultiRow = Template.bind({});
MultiRow.args = {
  variant: baseGridVariant,
  isDarkTheme: false
};

// Extended MultiRow (3 rows, última incompleta)
export const ExtendedMultiRow = Template.bind({});
ExtendedMultiRow.args = {
  variant: {
    ...baseGridVariant,
    config: {
      ...baseGridVariant.config,
      articles: {
        ...gridArticles,
        // Adiciona uma terceira row parcial
        'row-2-col-0': createArticles(3),
        'row-2-col-1': createArticles(3),
        'row-2-col-2': createArticles(3)
      }
    }
  },
  isDarkTheme: false
};