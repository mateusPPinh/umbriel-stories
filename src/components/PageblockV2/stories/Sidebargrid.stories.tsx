import React from 'react';
import { Story, Meta } from '@storybook/react';
import SidebarGrid from '../blocks/GridBlock/variants/SidebarGrid';
import { BlockVariant, ClientTheme } from '../types';
import { createArticles } from './mockData';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';
import { mockClientTheme } from './mockClientTheme';

export default {
  title: 'PageBlockV2/Grid/SidebarGrid',
  component: SidebarGrid,
  decorators: [
    (Story) => (
      <ResponsiveDeviceProvider>
        <Story />
      </ResponsiveDeviceProvider>
    ),
  ],
} as Meta;

const Template: Story<{ variant: BlockVariant; isDarkTheme?: boolean; clientGeneralSettingsData: ClientTheme }> = (args) => <SidebarGrid {...args} clientGeneralSettingsData={mockClientTheme} />;

// Criar artigos mock para grid
const gridArticles = {
  'col-0': createArticles(2), // Coluna principal com 2 artigos
  'col-1': createArticles(3)  // Sidebar com 3 artigos
};

// Mock base para SidebarGrid variant
const baseGridVariant: BlockVariant = {
  variantType: 'sidebar',
  variantPosition: 1,
  config: {
    layout: {
      columns: 2,
      gap: '24px',
      padding: '24px',
      responsive: {
        mobile: 1,
        tablet: 1,
        desktop: 2
      },
      styles: {
        grid: {
          autoRows: '',
          templateColumns: ''
        },
        width: '',
        columnStyles: {},
        backgroundColor: '',
        gridFlow: '',
        minColumnWidth: ''
      },
      imageSize: '',
      aspectRatio: ''
    },
    articles: gridArticles,
    styles: {
      theme: {
        light: {
          columnStyle: {
            background: "#ffffff",
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
      showExcerpt: true
    }
  }
};

// Default variant
export const Default = Template.bind({});
Default.args = {
  variant: baseGridVariant,
  isDarkTheme: false
};

// Custom styles
export const CustomStyles = Template.bind({});
CustomStyles.args = {
  variant: {
    ...baseGridVariant,
    config: {
      ...baseGridVariant.config,
      styles: {
        ...baseGridVariant.config.styles,
        theme: {
          light: {
            columnStyle: {
              background: "#f7fafc",
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

// Extended Sidebar (mais artigos na sidebar)
export const ExtendedSidebar = Template.bind({});
ExtendedSidebar.args = {
  variant: {
    ...baseGridVariant,
    config: {
      ...baseGridVariant.config,
      articles: {
        'col-0': createArticles(2),
        'col-1': createArticles(5) // Sidebar com 5 artigos
      }
    }
  },
  isDarkTheme: false
};