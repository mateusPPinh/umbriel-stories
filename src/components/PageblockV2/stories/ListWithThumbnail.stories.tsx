import React from 'react';
import { Story, Meta } from '@storybook/react';
import ListWithThumbnail from '../blocks/ListBlock/variants/ListWithThumbnail';
import { BlockVariant } from '../types';
import { createArticles } from './mockData';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';

export default {
  title: 'PageBlockV2/List/ListWithThumbnail',
  component: ListWithThumbnail,
  decorators: [
    (Story) => (
      <ResponsiveDeviceProvider>
        <Story />
      </ResponsiveDeviceProvider>
    ),
  ],
} as Meta;

const Template: Story<{ variant: BlockVariant; isDarkTheme?: boolean }> = (args) => <ListWithThumbnail {...args} />;

// Criar artigos mock para lista
const listArticles = {
  'col-0': createArticles(4)
};

// Mock base para ListWithThumbnail variant
const baseThumbnailVariant: BlockVariant = {
  variantType: 'thumbnail',
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
    articles: listArticles,
    styles: {
      theme: {
        light: {
          columnStyle: {
            background: "#ffffff",
            padding: "16px",
            borderBottom: "1px solid #e2e8f0"
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
            background: "#1a1a1a",
            padding: "16px",
            borderBottom: "1px solid #2d3748"
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
      thumbnailSize: {
        width: '120px',
        height: '120px'
      },
      thumbnailShape: 'square',
      showExcerpt: true,
      showMetadata: true,
      hoverEffect: 'scale',
      imagePosition: 'left'
    }
  }
};

// Default variant
export const Default = Template.bind({});
Default.args = {
  variant: baseThumbnailVariant,
  isDarkTheme: false
};

// Rounded thumbnails with right position
export const RoundedRight = Template.bind({});
RoundedRight.args = {
  variant: {
    ...baseThumbnailVariant,
    config: {
      ...baseThumbnailVariant.config,
      styles: {
        ...baseThumbnailVariant.config.styles,
        thumbnailShape: 'rounded',
        imagePosition: 'right',
        thumbnailSize: {
          width: '150px',
          height: '150px'
        },
        theme: {
          light: {
            columnStyle: {
              background: "#f7fafc",
              padding: "20px",
              borderRadius: '12px',
              marginBottom: '16px'
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
              background: "#2d3748",
              padding: "20px",
              borderRadius: '12px',
              marginBottom: '16px'
            },
            headingProps: {
              fontSize: "xl",
              fontWeight: "bold",
              color: "#f7fafc"
            },
            subtitleProps: {
              fontSize: "md",
              color: "#e2e8f0"
            }
          }
        }
      }
    }
  },
  isDarkTheme: false
};

// Circular thumbnails with glow effect
export const CircularGlow = Template.bind({});
CircularGlow.args = {
  variant: {
    ...baseThumbnailVariant,
    config: {
      ...baseThumbnailVariant.config,
      styles: {
        ...baseThumbnailVariant.config.styles,
        thumbnailShape: 'circle',
        hoverEffect: 'glow',
        thumbnailSize: {
          width: '100px',
          height: '100px'
        }
      }
    }
  },
  isDarkTheme: false
};

// Dark theme
export const DarkTheme = Template.bind({});
DarkTheme.args = {
  ...RoundedRight.args,
  isDarkTheme: true
}; 