import React from 'react';
import { Story, Meta } from '@storybook/react';
import Chronological from '../blocks/ListBlock/variants/Chronological';
import { BlockVariant } from '../types';
import { createArticles } from './mockData';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';

export default {
  title: 'PageBlockV2/List/Chronological',
  component: Chronological,
  decorators: [
    (Story) => (
      <ResponsiveDeviceProvider>
        <Story />
      </ResponsiveDeviceProvider>
    ),
  ],
} as Meta;

const Template: Story = (args) => <Chronological {...args} />;

// Criar artigos mock para lista
const listArticles = {
  'col-0': createArticles(5).map((article, index) => ({
    ...article,
    created_at: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)).toISOString() // Cada artigo é 1 dia mais antigo
  }))
};

// Mock base para Chronological variant
const baseChronologicalVariant = {
  variantType: 'chronological',
  variantPosition: 1,
  config: {
    layout: {
      columns: 1,
      gap: '0px',
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
            background: "transparent",
            padding: "16px"
          },
          headingProps: {
            fontSize: "lg",
            fontWeight: "medium",
            color: "#1a1a1a"
          },
          subtitleProps: {
            fontSize: "sm",
            color: "#4a5568"
          },
          timelineProps: {
            color: "#3182ce",
            width: "2px",
            markerSize: "12px",
            markerColor: "#3182ce"
          }
        },
        dark: {
          columnStyle: {
            background: "transparent",
            padding: "16px"
          },
          headingProps: {
            fontSize: "lg",
            fontWeight: "medium",
            color: "#ffffff"
          },
          subtitleProps: {
            fontSize: "sm",
            color: "#a0aec0"
          },
          timelineProps: {
            color: "#63b3ed",
            width: "2px",
            markerSize: "12px",
            markerColor: "#63b3ed"
          }
        }
      },
      showExcerpt: true,
      showMetadata: true,
      showDate: true,
      timelineStyle: 'solid',
      markerStyle: 'circle',
      hoverEffect: 'highlight'
    }
  }
};

// Default variant
export const Default = Template.bind({});
Default.args = {
  variant: baseChronologicalVariant,
  isDarkTheme: false
};

// Custom timeline style
export const CustomTimeline = Template.bind({});
CustomTimeline.args = {
  variant: {
    ...baseChronologicalVariant,
    config: {
      ...baseChronologicalVariant.config,
      styles: {
        ...baseChronologicalVariant.config.styles,
        timelineStyle: 'dashed',
        markerStyle: 'diamond',
        theme: {
          light: {
            columnStyle: {
              background: "transparent",
              padding: "20px"
            },
            headingProps: {
              fontSize: "xl",
              fontWeight: "bold",
              color: "#2d3748"
            },
            subtitleProps: {
              fontSize: "md",
              color: "#4a5568"
            },
            timelineProps: {
              color: "#805ad5",
              width: "3px",
              markerSize: "16px",
              markerColor: "#805ad5"
            }
          },
          dark: {
            columnStyle: {
              background: "transparent",
              padding: "20px"
            },
            headingProps: {
              fontSize: "xl",
              fontWeight: "bold",
              color: "#f7fafc"
            },
            subtitleProps: {
              fontSize: "md",
              color: "#e2e8f0"
            },
            timelineProps: {
              color: "#9f7aea",
              width: "3px",
              markerSize: "16px",
              markerColor: "#9f7aea"
            }
          }
        }
      }
    }
  },
  isDarkTheme: false
};

// Minimal style
export const Minimal = Template.bind({});
Minimal.args = {
  variant: {
    ...baseChronologicalVariant,
    config: {
      ...baseChronologicalVariant.config,
      styles: {
        ...baseChronologicalVariant.config.styles,
        showExcerpt: false,
        showMetadata: false,
        timelineStyle: 'dotted',
        markerStyle: 'square',
        theme: {
          light: {
            columnStyle: {
              background: "transparent",
              padding: "16px"
            },
            headingProps: {
              fontSize: "lg",
              fontWeight: "medium",
              color: "#1a1a1a"
            },
            subtitleProps: {
              fontSize: "sm",
              color: "#4a5568"
            },
            timelineProps: {
              color: "#cbd5e0",
              width: "1px",
              markerSize: "8px",
              markerColor: "#cbd5e0"
            }
          },
          dark: {
            columnStyle: {
              background: "transparent",
              padding: "16px"
            },
            headingProps: {
              fontSize: "lg",
              fontWeight: "medium",
              color: "#f7fafc"
            },
            subtitleProps: {
              fontSize: "sm",
              color: "#e2e8f0"
            },
            timelineProps: {
              color: "#4a5568",
              width: "1px",
              markerSize: "8px",
              markerColor: "#4a5568"
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
  ...CustomTimeline.args,
  isDarkTheme: true
}; 