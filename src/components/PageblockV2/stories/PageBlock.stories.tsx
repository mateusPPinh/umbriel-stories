import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PageBlockV2 from '../index';
import { mockBlocks, createArticles, baseBlockConfig, baseVariantConfig, baseLayoutConfig } from './mockData';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';

const meta: Meta<typeof PageBlockV2> = {
  title: 'Blocks/PageBlock',
  component: PageBlockV2,
  argTypes: {
    isDarkTheme: {
      control: { type: 'boolean' },
      description: 'Toggle between light and dark theme',
      defaultValue: false
    }
  }
};

export default meta;

type Story = StoryObj<typeof PageBlockV2>;

const Template: Story = {
  render: (args) => (
    <ResponsiveDeviceProvider>
      <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900">
        <PageBlockV2 {...args} />
      </div>
    </ResponsiveDeviceProvider>
  ),
};

// Grid Block Stories
export const GridStandard: Story = {
  ...Template,
  args: {
    block: mockBlocks.grid,
    isDarkTheme: false
  }
};

export const GridMasonry: Story = {
  ...Template,
  args: {
    block: {
      ...baseBlockConfig,
      id: "grid-masonry-block",
      blockType: "articles",
      template: "grid",
      variants: [{
        variantType: "masonry",
        variantPosition: 1,
        config: {
          ...baseVariantConfig,
          layout: {
            ...mockBlocks.grid.variants[0].config.layout,
            columns: 3
          },
          styles: mockBlocks.grid.variants[0].config.styles,
          articles: {
            "col-0": createArticles(6)
          }
        }
      }]
    },
    isDarkTheme: false
  }
};

export const GridFeatured: Story = {
  ...Template,
  args: {
    block: {
      ...baseBlockConfig,
      id: "grid-featured-block",
      blockType: "articles",
      template: "grid",
      variants: [{
        variantType: "featured",
        variantPosition: 1,
        config: {
          ...baseVariantConfig,
          layout: {
            ...mockBlocks.grid.variants[0].config.layout,
            columns: 2
          },
          styles: mockBlocks.grid.variants[0].config.styles,
          articles: {
            "col-0": [createArticles(1)[0]],
            "col-1": createArticles(3)
          }
        }
      }]
    },
    isDarkTheme: false
  }
};

// Featured Block Stories
export const FeaturedHero: Story = {
  ...Template,
  args: {
    block: mockBlocks.featured,
    isDarkTheme: false
  }
};

// Mixed Block Stories
export const MixedSidebar: Story = {
  ...Template,
  args: {
    block: {
      ...baseBlockConfig,
      id: "mixed-sidebar-block",
      blockType: "articles",
      template: "mixed",
      variants: [{
        variantType: "sidebar",
        variantPosition: 1,
        config: {
          ...baseVariantConfig,
          layout: {
            ...mockBlocks.grid.variants[0].config.layout,
            styles: {
              ...mockBlocks.grid.variants[0].config.layout.styles,
              columnStyles: {
                sidebarPosition: "right"
              }
            }
          },
          styles: mockBlocks.grid.variants[0].config.styles,
          articles: {
            "col-0": [createArticles(1)[0]], // Main article
            "col-1": createArticles(4) // Sidebar articles
          }
        }
      }]
    },
    isDarkTheme: false
  }
};

export const MixedMagazine: Story = {
  ...Template,
  args: {
    block: {
      ...baseBlockConfig,
      id: "mixed-magazine-block",
      blockType: "articles",
      template: "mixed",
      variants: [{
        variantType: "magazine",
        variantPosition: 1,
        config: {
          ...baseVariantConfig,
          layout: {
            ...baseLayoutConfig,
            columns: 3,
            styles: {
              ...baseLayoutConfig.styles,
              backgroundColor: 'transparent',
              columnStyles: {}
            }
          },
          styles: mockBlocks.grid.variants[0].config.styles,
          articles: {
            "col-0": [createArticles(1)[0]], // Main article
            "col-1": [createArticles(1)[0]], // Secondary 1
            "col-2": [createArticles(1)[0]], // Secondary 2
            "col-3": [createArticles(1)[0]], // Bottom 1
            "col-4": [createArticles(1)[0]], // Bottom 2
            "col-5": [createArticles(1)[0]]  // Bottom 3
          }
        }
      }]
    },
    isDarkTheme: false
  }
};

export const MixedNewspaper: Story = {
  ...Template,
  args: {
    block: {
      ...baseBlockConfig,
      id: "mixed-newspaper-block",
      blockType: "articles",
      template: "mixed",
      variants: [{
        variantType: "newspaper",
        variantPosition: 1,
        config: {
          ...baseVariantConfig,
          layout: {
            ...baseLayoutConfig,
            columns: 3,
            styles: {
              ...baseLayoutConfig.styles,
              backgroundColor: 'transparent',
              columnStyles: {}
            }
          },
          styles: mockBlocks.grid.variants[0].config.styles,
          articles: {
            "col-0": [createArticles(1)[0]], // Main article
            "col-1": [createArticles(1)[0]], // Small 1
            "col-2": [createArticles(1)[0]], // Small 2
            "col-3": [createArticles(1)[0]], // Bottom 1
            "col-4": [createArticles(1)[0]], // Bottom 2
            "col-5": [createArticles(1)[0]], // Bottom 3
            "col-6": [createArticles(1)[0]]  // Bottom 4
          }
        }
      }]
    },
    isDarkTheme: false
  }
};

// List Block Stories
export const ListCompact: Story = {
  ...Template,
  args: {
    block: {
      ...baseBlockConfig,
      id: "list-compact-block",
      blockType: "articles",
      template: "list",
      variants: [{
        variantType: "compact",
        variantPosition: 1,
        config: {
          ...baseVariantConfig,
          layout: {
            ...baseLayoutConfig,
            columns: 1,
            styles: {
              ...baseLayoutConfig.styles,
              backgroundColor: 'transparent',
              columnStyles: {}
            }
          },
          styles: mockBlocks.grid.variants[0].config.styles,
          articles: {
            "col-0": createArticles(5)
          }
        }
      }]
    },
    isDarkTheme: false
  }
};

export const ListWithThumbnail: Story = {
  ...Template,
  args: {
    block: {
      ...baseBlockConfig,
      id: "list-thumbnail-block",
      blockType: "articles",
      template: "list",
      variants: [{
        variantType: "thumbnail",
        variantPosition: 1,
        config: {
          ...baseVariantConfig,
          layout: {
            ...baseLayoutConfig,
            columns: 1,
            styles: {
              ...baseLayoutConfig.styles,
              backgroundColor: 'transparent',
              columnStyles: {}
            }
          },
          styles: mockBlocks.grid.variants[0].config.styles,
          articles: {
            "col-0": createArticles(4)
          }
        }
      }]
    },
    isDarkTheme: false
  }
};

export const ListChronological: Story = {
  ...Template,
  args: {
    block: {
      ...baseBlockConfig,
      id: "list-chronological-block",
      blockType: "articles",
      template: "list",
      variants: [{
        variantType: "chronological",
        variantPosition: 1,
        config: {
          ...baseVariantConfig,
          layout: {
            ...baseLayoutConfig,
            columns: 1,
            styles: {
              ...baseLayoutConfig.styles,
              backgroundColor: 'transparent',
              columnStyles: {}
            }
          },
          styles: mockBlocks.grid.variants[0].config.styles,
          articles: {
            "col-0": createArticles(6)
          }
        }
      }]
    },
    isDarkTheme: false
  }
}; 