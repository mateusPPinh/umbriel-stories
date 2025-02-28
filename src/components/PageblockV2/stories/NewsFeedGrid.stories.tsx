import React from 'react';
import { Story, Meta } from '@storybook/react';
import NewsFeedGrid from '../blocks/GridBlock/variants/NewsFeedGrid';
import { BlockVariant } from '../types';
import { createArticles } from './mockData';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';

export default {
  title: 'PageBlockV2/Grid/NewsFeedGrid',
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
  'col-0': createArticles(3).map(article => ({
    ...article,
    content: {
      ...article.content,
      image: {
        desktop_image_path: 'https://barzuputru.local.api.umbrielcms.com.br:3001/uploads/6370ab4d976b0a5a95ea-24putin-anniversary-hvgm-superJumbo.webp?width=2048&height=1365'
      }
    }
  })), // Coluna principal com 3 artigos (incluindo imagem do primeiro)
  'col-1': createArticles(4) // Coluna lateral com 3 artigos
};

// Mock base para NewsFeedGrid variant
const baseGridVariant: BlockVariant = {
  variantType: 'newsfeed',
  variantPosition: 1,
  config: {
    layout: {
      gap: '24px',
      styles: {
        grid: {
          autoRows: 'auto',
          templateColumns: 'repeat(4, 1fr)'
        },
        width: '100%',
        columnStyles: {},
        backgroundColor: 'transparent'
      },
      imageSize: 'large',
      aspectRatio: '16/9',
      columns: 4,
      padding: '0',
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
            background: 'transparent'
          },
          headingProps: {
            fontSize: "xl",
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
            background: 'transparent'
          },
          headingProps: {
            fontSize: "xl",
            fontWeight: 600,
            color: "#ffffff"
          },
          subtitleProps: {
            fontSize: "base",
            color: "#a0aec0"
          }
        }
      },
      titleSize: 'xl',
      columnStyle: {
        background: 'transparent'
      },
      imageHeight: '400px',
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

// Mobile version
export const Mobile = Template.bind({});
Mobile.args = {
  variant: {
    ...baseGridVariant,
    config: {
      ...baseGridVariant.config,
      layout: {
        ...baseGridVariant.config.layout,
        styles: {
          ...baseGridVariant.config.layout.styles,
          grid: {
            ...baseGridVariant.config.layout.styles.grid,
            templateColumns: 'repeat(1, 1fr)'
          }
        }
      }
    }
  },
  isDarkTheme: false
};

// Tablet version
export const Tablet = Template.bind({});
Tablet.args = {
  variant: {
    ...baseGridVariant,
    config: {
      ...baseGridVariant.config,
      layout: {
        ...baseGridVariant.config.layout,
        styles: {
          ...baseGridVariant.config.layout.styles,
          grid: {
            ...baseGridVariant.config.layout.styles.grid,
            templateColumns: 'repeat(2, 1fr)'
          }
        }
      }
    }
  },
  isDarkTheme: false
}; 