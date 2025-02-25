import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import GridBlock from '../blocks/GridBlock';
import { mockBlocks, createArticles, baseBlockConfig, baseVariantConfig } from './mockData';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';

const meta: Meta<typeof GridBlock> = {
  title: 'Blocks/PageBlock/GridBlock',
  component: GridBlock,
  argTypes: {
    isDarkTheme: {
      control: { type: 'boolean' },
      description: 'Toggle between light and dark theme',
      defaultValue: false
    }
  }
};

export default meta;

type Story = StoryObj<typeof GridBlock>;

const Template: Story = {
  render: (args) => (
    <ResponsiveDeviceProvider>
      <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900">
        <GridBlock {...args} />
      </div>
    </ResponsiveDeviceProvider>
  ),
};

export const Standard: Story = {
  ...Template,
  args: {
    block: mockBlocks.grid,
    isDarkTheme: false
  }
};

export const Masonry: Story = {
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

export const Featured: Story = {
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