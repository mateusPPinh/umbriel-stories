import React from 'react';
import { Story, Meta } from '@storybook/react';
import Sidebar from '../blocks/MixedBlock/variants/Sidebar';
import { BlockVariant } from '../types';
import { createArticles } from './mockData';
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

const Template: Story<{ variant: BlockVariant; isDarkTheme?: boolean }> = (args) => <Sidebar {...args} />;

// Criar artigos mock
const sidebarArticles = {
  'col-0': createArticles(1), // Main article
  'col-1': createArticles(4)  // Sidebar articles
};

// Mock base para Sidebar variant
const baseSidebarVariant: BlockVariant = {
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
      }
    },
    articles: sidebarArticles,
    styles: {
      theme: {
        light: {
          mainColumnStyle: {
            background: "#ffffff",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          },
          sidebarStyle: {
            background: "#f7fafc",
            padding: "20px",
            borderRadius: "8px"
          },
          headingProps: {
            fontSize: {
              main: "2xl",
              sidebar: "lg"
            },
            fontWeight: {
              main: "bold",
              sidebar: "medium"
            },
            color: "#1a1a1a"
          },
          subtitleProps: {
            fontSize: {
              main: "lg",
              sidebar: "sm"
            },
            color: "#4a5568"
          }
        },
        dark: {
          mainColumnStyle: {
            background: "#1a1a1a",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)"
          },
          sidebarStyle: {
            background: "#2d3748",
            padding: "20px",
            borderRadius: "8px"
          },
          headingProps: {
            fontSize: {
              main: "2xl",
              sidebar: "lg"
            },
            fontWeight: {
              main: "bold",
              sidebar: "medium"
            },
            color: "#ffffff"
          },
          subtitleProps: {
            fontSize: {
              main: "lg",
              sidebar: "sm"
            },
            color: "#a0aec0"
          }
        }
      },
      layout: {
        sidebarPosition: 'right',
        sidebarWidth: '300px',
        gap: '24px'
      },
      showExcerpt: {
        main: true,
        sidebar: true
      },
      showImage: {
        main: true,
        sidebar: true
      }
    }
  }
};

// Default variant
export const Default = Template.bind({});
Default.args = {
  variant: baseSidebarVariant,
  isDarkTheme: false
};

// Left sidebar
export const LeftSidebar = Template.bind({});
LeftSidebar.args = {
  variant: {
    ...baseSidebarVariant,
    config: {
      ...baseSidebarVariant.config,
      styles: {
        ...baseSidebarVariant.config.styles,
        layout: {
          ...baseSidebarVariant.config.styles.layout,
          sidebarPosition: 'left'
        }
      }
    }
  },
  isDarkTheme: false
};

// Minimal sidebar
export const MinimalSidebar = Template.bind({});
MinimalSidebar.args = {
  variant: {
    ...baseSidebarVariant,
    config: {
      ...baseSidebarVariant.config,
      styles: {
        ...baseSidebarVariant.config.styles,
        showExcerpt: {
          main: true,
          sidebar: false
        },
        showImage: {
          main: true,
          sidebar: false
        },
        theme: {
          light: {
            mainColumnStyle: {
              background: "#ffffff",
              padding: "24px",
              borderRadius: "8px"
            },
            sidebarStyle: {
              background: "transparent",
              padding: "0 0 0 24px",
              borderLeft: "1px solid #e2e8f0"
            }
          },
          dark: {
            mainColumnStyle: {
              background: "#1a1a1a",
              padding: "24px",
              borderRadius: "8px"
            },
            sidebarStyle: {
              background: "transparent",
              padding: "0 0 0 24px",
              borderLeft: "1px solid #2d3748"
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