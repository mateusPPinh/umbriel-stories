import React from 'react';
import { Story, Meta } from '@storybook/react';
import BlockManagerDragDrop from '../index';
import { createArticles } from '../../PageblockV2/stories/mockData';

interface BlockManagerDragDropProps {
  articles: any[];
  blockType: 'grid' | 'list';
  isDarkTheme?: boolean;
  onSave: (columns: { [key: string]: any[] }) => void;
}

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

// Grid Variants
export const StandardGrid = Template.bind({});
StandardGrid.args = {
  blockType: 'grid',
  articles: mockArticles,
  isDarkTheme: false,
  onSave: (columns) => console.log('Updated columns:', columns),
};

export const FeaturedGrid = Template.bind({});
FeaturedGrid.args = {
  ...StandardGrid.args,
  blockType: 'grid',
};

export const MasonryGrid = Template.bind({});
MasonryGrid.args = {
  ...StandardGrid.args,
  blockType: 'grid',
};

export const SidebarGrid = Template.bind({});
SidebarGrid.args = {
  ...StandardGrid.args,
  blockType: 'grid',
};

export const NewsGrid = Template.bind({});
NewsGrid.args = {
  ...StandardGrid.args,
  blockType: 'grid',
};

export const NewsFeed = Template.bind({});
NewsFeed.args = {
  ...StandardGrid.args,
  blockType: 'grid',
};

// List Variants
export const ChronologicalList = Template.bind({});
ChronologicalList.args = {
  blockType: 'list',
  articles: mockArticles,
  isDarkTheme: false,
  onSave: (columns) => console.log('Updated columns:', columns),
};

export const CompactList = Template.bind({});
CompactList.args = {
  ...ChronologicalList.args,
  blockType: 'list',
};

export const CardList = Template.bind({});
CardList.args = {
  ...ChronologicalList.args,
  blockType: 'list',
};

// Dark Theme Examples
export const DarkThemeGrid = Template.bind({});
DarkThemeGrid.args = {
  ...StandardGrid.args,
  isDarkTheme: true,
};

export const DarkThemeList = Template.bind({});
DarkThemeList.args = {
  ...ChronologicalList.args,
  isDarkTheme: true,
}; 