import React from 'react';
import { Story, Meta } from '@storybook/react';
import Showcase from '../blocks/MixedBlock/variants/Showcase';
import { BlockVariant } from '../types';
import { createArticles, baseVariantConfig } from './mockData';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';

export default {
  title: 'PageBlockV2/Mixed/Showcase',
  component: Showcase,
  decorators: [
    (Story) => (
      <ResponsiveDeviceProvider>
        <Story />
      </ResponsiveDeviceProvider>
    ),
  ],
} as Meta;

const Template: Story<{ variant: BlockVariant; isDarkTheme?: boolean }> = (args) => <Showcase {...args} />;

// Criar artigos mock
const showcaseArticles = {
  'col-0': createArticles(1),  // Featured article
  'col-1': createArticles(4),  // Grid articles
  'col-2': createArticles(5)   // List articles
};

// Mock base para Showcase variant
const baseShowcaseVariant: BlockVariant = {
  variantType: 'showcase',
  variantPosition: 1,
  config: {
    layout: {
      columns: 12,
      gap: '24px',
      padding: '24px',
      imageSize: '100%',
      aspectRatio: '16/9',
      responsive: {
        mobile: 12,
        tablet: 12,
        desktop: 12
      },
      styles: {
        grid: {
          autoRows: 'auto',
          templateColumns: 'repeat(12, 1fr)'
        },
        width: '100%',
        backgroundColor: 'transparent',
        columnStyles: {}
      }
    },
    articles: showcaseArticles,
    styles: {
      theme: {
        light: {
          columnStyle: {
            background: '#ffffff'
          },
          headingProps: {
            fontSize: 'xl',
            fontWeight: 700,
            color: '#1a1a1a'
          },
          subtitleProps: {
            fontSize: 'lg',
            color: '#4a5568'
          }
        },
        dark: {
          columnStyle: {
            background: '#1a1a1a'
          },
          headingProps: {
            fontSize: 'xl',
            fontWeight: 700,
            color: '#ffffff'
          },
          subtitleProps: {
            fontSize: 'lg',
            color: '#a0aec0'
          }
        }
      },
      titleSize: 'xl',
      columnStyle: {},
      imageHeight: '300px',
      showExcerpt: true,
      showMetadata: false
    },
    mediaConfig: {
      type: "image",
      customUrl: "",
      useArticleMedia: true
    }
  }
};

// Default variant
export const Default = Template.bind({});
Default.args = {
  variant: baseShowcaseVariant,
  isDarkTheme: false
};

// Modern style
export const ModernStyle = Template.bind({});
ModernStyle.args = {
  variant: {
    ...baseShowcaseVariant,
    config: {
      ...baseShowcaseVariant.config,
      styles: {
        ...baseShowcaseVariant.config.styles,
        theme: {
          light: {
            columnStyle: {
              background: '#ffffff'
            },
            headingProps: {
              fontSize: '2xl',
              fontWeight: 700,
              color: '#1a1a1a'
            },
            subtitleProps: {
              fontSize: 'xl',
              color: '#4a5568'
            }
          },
          dark: {
            columnStyle: {
              background: '#1a1a1a'
            },
            headingProps: {
              fontSize: '2xl',
              fontWeight: 700,
              color: '#ffffff'
            },
            subtitleProps: {
              fontSize: 'xl',
              color: '#a0aec0'
            }
          }
        }
      }
    }
  },
  isDarkTheme: false
};

// Minimal style
export const MinimalStyle = Template.bind({});
MinimalStyle.args = {
  variant: {
    ...baseShowcaseVariant,
    config: {
      ...baseShowcaseVariant.config,
      styles: {
        ...baseShowcaseVariant.config.styles,
        theme: {
          light: {
            columnStyle: {
              background: 'transparent'
            },
            headingProps: {
              fontSize: 'xl',
              fontWeight: 600,
              color: '#1a1a1a'
            },
            subtitleProps: {
              fontSize: 'lg',
              color: '#4a5568'
            }
          },
          dark: {
            columnStyle: {
              background: 'transparent'
            },
            headingProps: {
              fontSize: 'xl',
              fontWeight: 600,
              color: '#ffffff'
            },
            subtitleProps: {
              fontSize: 'lg',
              color: '#a0aec0'
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
  ...Default.args,
  isDarkTheme: true
}; 