import React from 'react';
import { Story, Meta } from '@storybook/react';
import BlockManagerDragDrop, { BlockManagerDragDropProps } from '../index';
import { createArticles } from '../../PageblockV2/stories/mockData';

export default {
  title: 'Components/BlockManagerDragDrop',
  component: BlockManagerDragDrop,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' }
      ]
    }
  },
  decorators: [
    (Story) => (
      <div className="h-[calc(100vh-400px)] p-4">
        <Story />
      </div>
    )
  ]
} as Meta;

const mockArticles = createArticles(15);

const Template: Story<BlockManagerDragDropProps> = (args) => (
  <BlockManagerDragDrop {...args} />
);

// NewsGrid Variant
export const NewsGridVariant = Template.bind({});
NewsGridVariant.args = {
  blockType: 'grid',
  variantType: 'newsgrid',
  articles: mockArticles,
  isDarkTheme: false,
  onUpdateBlock: (config) => console.log('Updated config:', config),
};

// NewsFeed Variant
export const NewsFeedVariant = Template.bind({});
NewsFeedVariant.args = {
  ...NewsGridVariant.args,
  variantType: 'newsfeed',
};

// Standard Grid Variant
export const StandardGridVariant = Template.bind({});
StandardGridVariant.args = {
  ...NewsGridVariant.args,
  variantType: 'standard',
};

// Featured Grid Variant
export const FeaturedGridVariant = Template.bind({});
FeaturedGridVariant.args = {
  ...NewsGridVariant.args,
  variantType: 'featured',
};

// Masonry Grid Variant
export const MasonryGridVariant = Template.bind({});
MasonryGridVariant.args = {
  ...NewsGridVariant.args,
  variantType: 'masonry',
};

// Sidebar Grid Variant
export const SidebarGridVariant = Template.bind({});
SidebarGridVariant.args = {
  ...NewsGridVariant.args,
  variantType: 'sidebargrid',
};

// Dark Theme Examples
export const DarkThemeNewsGrid = Template.bind({});
DarkThemeNewsGrid.args = {
  ...NewsGridVariant.args,
  isDarkTheme: true,
};

export const DarkThemeSidebarGrid = Template.bind({});
DarkThemeSidebarGrid.args = {
  ...SidebarGridVariant.args,
  isDarkTheme: true,
}; 