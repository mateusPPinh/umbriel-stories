import React from 'react';
import { Story, Meta } from '@storybook/react';
import Showcase from './Showcase';
import { BlockVariant } from '../../../types';
import { createArticles } from '../../../stories/mockData';
import { ResponsiveDeviceProvider } from '../../../contexts/ResponsiveDeviceContext';

export default {
  title: 'PageBlock/Mixed/Showcase',
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
      columns: 3,
      gap: '24px',
      padding: '24px',
      responsive: {
        mobile: 1,
        tablet: 2,
        desktop: 3
      }
    },
    articles: showcaseArticles,
    styles: {
      theme: {
        light: {
          featuredStyle: {
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
            padding: "24px",
            borderRadius: "16px"
          },
          gridStyle: {
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          },
          listStyle: {
            background: "#f8fafc",
            padding: "16px",
            borderRadius: "8px"
          }
        },
        dark: {
          featuredStyle: {
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)",
            padding: "24px",
            borderRadius: "16px"
          },
          gridStyle: {
            background: "#1a1a1a",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)"
          },
          listStyle: {
            background: "#2d3748",
            padding: "16px",
            borderRadius: "8px"
          }
        }
      },
      showExcerpt: {
        featured: true,
        grid: true,
        list: true
      },
      showImage: {
        featured: true,
        grid: true,
        list: false
      },
      imageStyle: {
        featured: {
          aspectRatio: '21/9',
          borderRadius: '16px'
        },
        grid: {
          aspectRatio: '16/9',
          borderRadius: '8px'
        }
      },
      hoverEffect: {
        featured: 'scale',
        grid: 'lift',
        list: 'highlight'
      }
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
            featuredStyle: {
              background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)",
              padding: "32px",
              borderRadius: "24px"
            },
            gridStyle: {
              background: "#ffffff",
              padding: "24px",
              borderRadius: "16px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
            },
            listStyle: {
              background: "#f8fafc",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }
          },
          dark: {
            featuredStyle: {
              background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
              padding: "32px",
              borderRadius: "24px"
            },
            gridStyle: {
              background: "#1a1a1a",
              padding: "24px",
              borderRadius: "16px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.3)"
            },
            listStyle: {
              background: "#2d3748",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
            }
          }
        },
        imageStyle: {
          featured: {
            aspectRatio: '2/1',
            borderRadius: '24px'
          },
          grid: {
            aspectRatio: '16/9',
            borderRadius: '12px'
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
        showExcerpt: {
          featured: true,
          grid: false,
          list: false
        },
        theme: {
          light: {
            featuredStyle: {
              background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)",
              padding: "24px",
              borderRadius: "0"
            },
            gridStyle: {
              background: "transparent",
              padding: "16px",
              borderRadius: "0"
            },
            listStyle: {
              background: "transparent",
              padding: "16px",
              borderRadius: "0",
              borderLeft: "1px solid #e2e8f0"
            }
          },
          dark: {
            featuredStyle: {
              background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
              padding: "24px",
              borderRadius: "0"
            },
            gridStyle: {
              background: "transparent",
              padding: "16px",
              borderRadius: "0"
            },
            listStyle: {
              background: "transparent",
              padding: "16px",
              borderRadius: "0",
              borderLeft: "1px solid #4a5568"
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