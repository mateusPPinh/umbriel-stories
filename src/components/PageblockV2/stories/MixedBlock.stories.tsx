import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MixedBlock from '../blocks/MixedBlock';
import { mockBlocks, createArticles, baseBlockConfig, baseVariantConfig } from './mockData';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';

const meta: Meta<typeof MixedBlock> = {
  title: 'Components/PageBlockV2/MixedBlock',
  component: MixedBlock,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MixedBlock>;

export const Sidebar: Story = {
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
              sidebarPosition: "right"
            }
          },
          styles: mockBlocks.grid.variants[0].config.styles,
          articles: {
            "col-0": [createArticles(1)[0]], // Main article
            "col-1": createArticles(4) // Sidebar articles
          }
        }
      }]
    }
  }
};

// Similar stories for Magazine and Newspaper variants... 