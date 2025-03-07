import React from 'react';
import { Story, Meta } from '@storybook/react';
import ListWithThumbnail from '../blocks/ListBlock/variants/ListWithThumbnail';
import { BlockVariant, ClientTheme } from '../types';
import { createArticles } from './mockData';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';
import { mockClientTheme } from './mockClientTheme';

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
  parameters: {
    controls: {
      expanded: true
    }
  },
  argTypes: {
    layout: {
      control: { type: 'radio' },
      options: ['single', 'grid'],
      defaultValue: 'single',
      description: 'Layout type for the list'
    },
    isDarkTheme: {
      control: 'boolean'
    }
  }
} as Meta;

// Componente wrapper para garantir que a prop layout seja passada corretamente
const TemplateWithControls: Story<{ 
  variant: BlockVariant; 
  isDarkTheme?: boolean; 
  clientGeneralSettingsData: ClientTheme;
  layout: 'single' | 'grid';
}> = (args) => {
  console.log('Storybook rendering with layout:', args.layout);
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
      <h2 className="mb-4 text-lg font-semibold">Layout: {args.layout}</h2>
      <ListWithThumbnail {...args} clientGeneralSettingsData={mockClientTheme} />
    </div>
  );
};

// Create mock articles for the list - increased for better grid visualization
const listArticles = {
  'col-0': createArticles(6)
};

// Base thumbnail variant mock
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

// Single Column Layout (Default)
export const SingleColumn = TemplateWithControls.bind({});
SingleColumn.args = {
  variant: baseThumbnailVariant,
  isDarkTheme: false,
  layout: 'single'
};

// Grid Layout
export const GridLayout = TemplateWithControls.bind({});
GridLayout.args = {
  variant: baseThumbnailVariant,
  isDarkTheme: false,
  layout: 'grid'
};

// Rounded thumbnails with right position (Grid)
export const RoundedRightGrid = TemplateWithControls.bind({});
RoundedRightGrid.args = {
  variant: {
    ...baseThumbnailVariant,
    config: {
      ...baseThumbnailVariant.config,
      styles: {
        ...baseThumbnailVariant.config.styles,
        thumbnailShape: 'rounded',
        imagePosition: 'right',
        thumbnailSize: {
          width: '180px',
          height: '120px'
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
  isDarkTheme: false,
  layout: 'grid'
};

// Dark theme with grid
export const DarkThemeGrid = TemplateWithControls.bind({});
DarkThemeGrid.args = {
  ...RoundedRightGrid.args,
  isDarkTheme: true,
  layout: 'grid'
}; 