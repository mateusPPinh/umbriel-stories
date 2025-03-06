import React from 'react';
import { Story, Meta } from '@storybook/react';
import Newspaper from '../blocks/MixedBlock/variants/Newspaper';
import { BlockVariant } from '../types';
import { createArticles } from './mockData';
import { mockClientTheme } from './mockClientTheme';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';

export default {
  title: 'PageBlockV2/Mixed/Newspaper',
  component: Newspaper,
  decorators: [
    (Story) => (
      <ResponsiveDeviceProvider>
        <Story />
      </ResponsiveDeviceProvider>
    ),
  ],
} as Meta;

const Template: Story<{ variant: BlockVariant; isDarkTheme?: boolean }> = (args) => (
  <Newspaper {...args} clientGeneralSettingsData={mockClientTheme} />
);

const baseNewspaperVariant: BlockVariant = {
  variantType: 'newspaper',
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
      })),
      'col-2': createArticles(4).map(article => ({
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
  variant: baseNewspaperVariant,
  isDarkTheme: false
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  variant: baseNewspaperVariant,
  isDarkTheme: true
};

export const WithoutExcerpt = Template.bind({});
WithoutExcerpt.args = {
  variant: {
    ...baseNewspaperVariant,
    config: {
      ...baseNewspaperVariant.config,
      styles: {
        ...baseNewspaperVariant.config.styles,
        showExcerpt: false
      }
    }
  },
  isDarkTheme: false
};

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
            columnStyle: {
              background: '#f8fafc'
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