import React from 'react';
import { Story, Meta } from '@storybook/react';
import Newspaper from './Newspaper';
import { BlockVariant } from '../../../types';
import { createArticles } from '../../../stories/mockData';
import { ResponsiveDeviceProvider } from '../../../contexts/ResponsiveDeviceContext';

export default {
  title: 'PageBlock/Mixed/Newspaper',
  component: Newspaper,
  decorators: [
    (Story) => (
      <ResponsiveDeviceProvider>
        <Story />
      </ResponsiveDeviceProvider>
    ),
  ],
} as Meta;

const Template: Story<{ variant: BlockVariant; isDarkTheme?: boolean }> = (args) => <Newspaper {...args} />;

// Criar artigos mock
const newspaperArticles = {
  'col-0': createArticles(1),  // Main article
  'col-1': createArticles(3),  // Column articles
  'col-2': createArticles(5)   // Secondary articles
};

// Mock base para Newspaper variant
const baseNewspaperVariant: BlockVariant = {
  variantType: 'newspaper',
  variantPosition: 1,
  config: {
    layout: {
      columns: 3,
      gap: '0',
      padding: '0',
      responsive: {
        mobile: 1,
        tablet: 2,
        desktop: 3
      }
    },
    articles: newspaperArticles,
    styles: {
      theme: {
        light: {
          mainArticleStyle: {
            background: "#ffffff",
            padding: "32px",
            borderRight: "1px solid #e2e8f0"
          },
          columnStyle: {
            background: "#ffffff",
            padding: "24px",
            borderRight: "1px solid #e2e8f0"
          },
          headingProps: {
            fontSize: {
              main: "4xl",
              column: "xl",
              secondary: "lg"
            },
            fontWeight: {
              main: "bold",
              column: "semibold",
              secondary: "medium"
            },
            fontFamily: {
              main: "serif",
              column: "serif",
              secondary: "sans"
            },
            color: "#1a1a1a"
          },
          subtitleProps: {
            fontSize: {
              main: "xl",
              column: "lg",
              secondary: "base"
            },
            color: "#4a5568",
            fontFamily: "serif"
          }
        },
        dark: {
          mainArticleStyle: {
            background: "#1a1a1a",
            padding: "32px",
            borderRight: "1px solid #2d3748"
          },
          columnStyle: {
            background: "#1a1a1a",
            padding: "24px",
            borderRight: "1px solid #2d3748"
          },
          headingProps: {
            fontSize: {
              main: "4xl",
              column: "xl",
              secondary: "lg"
            },
            fontWeight: {
              main: "bold",
              column: "semibold",
              secondary: "medium"
            },
            fontFamily: {
              main: "serif",
              column: "serif",
              secondary: "sans"
            },
            color: "#ffffff"
          },
          subtitleProps: {
            fontSize: {
              main: "xl",
              column: "lg",
              secondary: "base"
            },
            color: "#a0aec0",
            fontFamily: "serif"
          }
        }
      },
      showExcerpt: {
        main: true,
        column: true,
        secondary: true
      },
      showImage: {
        main: true,
        column: true,
        secondary: false
      },
      imageStyle: {
        main: {
          aspectRatio: '16/9',
          borderRadius: '0'
        },
        column: {
          aspectRatio: '4/3',
          borderRadius: '0'
        }
      },
      showDate: true,
      dateFormat: {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    }
  }
};

// Default variant
export const Default = Template.bind({});
Default.args = {
  variant: baseNewspaperVariant,
  isDarkTheme: false
};

// Classic style
export const ClassicStyle = Template.bind({});
ClassicStyle.args = {
  variant: {
    ...baseNewspaperVariant,
    config: {
      ...baseNewspaperVariant.config,
      styles: {
        ...baseNewspaperVariant.config.styles,
        theme: {
          light: {
            mainArticleStyle: {
              background: "#f8fafc",
              padding: "40px",
              borderRight: "2px solid #cbd5e0"
            },
            columnStyle: {
              background: "#f8fafc",
              padding: "32px",
              borderRight: "2px solid #cbd5e0"
            },
            headingProps: {
              fontSize: {
                main: "5xl",
                column: "2xl",
                secondary: "xl"
              },
              fontWeight: {
                main: "black",
                column: "bold",
                secondary: "semibold"
              },
              fontFamily: {
                main: "serif",
                column: "serif",
                secondary: "serif"
              },
              color: "#000000"
            }
          },
          dark: {
            mainArticleStyle: {
              background: "#1a1a1a",
              padding: "40px",
              borderRight: "2px solid #4a5568"
            },
            columnStyle: {
              background: "#1a1a1a",
              padding: "32px",
              borderRight: "2px solid #4a5568"
            },
            headingProps: {
              fontSize: {
                main: "5xl",
                column: "2xl",
                secondary: "xl"
              },
              fontWeight: {
                main: "black",
                column: "bold",
                secondary: "semibold"
              },
              fontFamily: {
                main: "serif",
                column: "serif",
                secondary: "serif"
              },
              color: "#ffffff"
            }
          }
        }
      }
    }
  },
  isDarkTheme: false
};

// Modern style
export const ModernStyle = Template.bind({});
ModernStyle.args = {
  variant: {
    ...baseNewspaperVariant,
    config: {
      ...baseNewspaperVariant.config,
      styles: {
        ...baseNewspaperVariant.config.styles,
        theme: {
          light: {
            mainArticleStyle: {
              background: "#ffffff",
              padding: "32px",
              borderRight: "none",
              boxShadow: "1px 0 0 0 #e2e8f0"
            },
            columnStyle: {
              background: "#ffffff",
              padding: "24px",
              borderRight: "none",
              boxShadow: "1px 0 0 0 #e2e8f0"
            },
            headingProps: {
              fontSize: {
                main: "4xl",
                column: "xl",
                secondary: "lg"
              },
              fontWeight: {
                main: "bold",
                column: "semibold",
                secondary: "medium"
              },
              fontFamily: {
                main: "sans",
                column: "sans",
                secondary: "sans"
              }
            }
          },
          dark: {
            mainArticleStyle: {
              background: "#1a1a1a",
              padding: "32px",
              borderRight: "none",
              boxShadow: "1px 0 0 0 #2d3748"
            },
            columnStyle: {
              background: "#1a1a1a",
              padding: "24px",
              borderRight: "none",
              boxShadow: "1px 0 0 0 #2d3748"
            },
            headingProps: {
              fontSize: {
                main: "4xl",
                column: "xl",
                secondary: "lg"
              },
              fontWeight: {
                main: "bold",
                column: "semibold",
                secondary: "medium"
              },
              fontFamily: {
                main: "sans",
                column: "sans",
                secondary: "sans"
              }
            }
          }
        },
        imageStyle: {
          main: {
            aspectRatio: '21/9',
            borderRadius: '8px'
          },
          column: {
            aspectRatio: '16/9',
            borderRadius: '6px'
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