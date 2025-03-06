import React from 'react';
import { Story, Meta } from '@storybook/react';
import Sidebar from '../blocks/MixedBlock/variants/Sidebar';
import { BlockVariant } from '../types';
import { createArticles } from './mockData';
import { mockClientTheme } from './mockClientTheme';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';

export default {
  title: 'PageBlockV2/Mixed/Sidebar',
  component: Sidebar,
  decorators: [
    (Story) => (
      <ResponsiveDeviceProvider>
        <Story />
      </ResponsiveDeviceProvider>
    ),
  ],
} as Meta;

const Template: Story<{ variant: BlockVariant; isDarkTheme?: boolean }> = (args) => (
  <Sidebar {...args} clientGeneralSettingsData={mockClientTheme} />
);

const baseSidebarVariant: BlockVariant = {
  variantType: 'sidebar',
  variantPosition: 1,
  config: {
    mediaConfig: {
      type: 'image',
      customUrl: '',
      useArticleMedia: true
    },
    layout: {
      columns: 12,
      gap: '24px',
      padding: '24px',
      imageSize: 'medium',
      aspectRatio: '16/9',
      responsive: {
        mobile: 1,
        tablet: 2,
        desktop: 3
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
      showExcerpt: true,
      showMetadata: false,
      titleSize: 'xl',
      columnStyle: {},
      imageHeight: '300px'
    },
    articles: {
      'col-0': [createArticles(1)[0]].map(article => ({
        ...article,
        content: {
          ...article.content,
          image: {
            desktop_image_path: article.content?.image?.desktop_image_path || undefined,
            mobile_image_path: article.content?.image?.image_mobile_path || undefined
          }
        }
      })),
      'col-1': createArticles(4).map(article => ({
        ...article,
        content: {
          ...article.content,
          image: {
            desktop_image_path: article.content?.image?.desktop_image_path || undefined,
            mobile_image_path: article.content?.image?.image_mobile_path || undefined
          }
        }
      }))
    }
  }
};

export const Default = Template.bind({});
Default.args = {
  variant: baseSidebarVariant,
  isDarkTheme: false
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  variant: baseSidebarVariant,
  isDarkTheme: true
};

export const WithoutExcerpt = Template.bind({});
WithoutExcerpt.args = {
  variant: {
    ...baseSidebarVariant,
    config: {
      ...baseSidebarVariant.config,
      styles: {
        ...baseSidebarVariant.config.styles,
        showExcerpt: false
      }
    }
  },
  isDarkTheme: false
};

export const ModernStyle = Template.bind({});
ModernStyle.args = {
  variant: {
    ...baseSidebarVariant,
    config: {
      ...baseSidebarVariant.config,
      styles: {
        ...baseSidebarVariant.config.styles,
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
              fontSize: 'lg',
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