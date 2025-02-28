import React from 'react';
import { Story, Meta } from '@storybook/react';
import BlockManagerDragDrop from '../index';
import { createArticles } from '../../PageblockV2/stories/mockData';

interface BlockManagerDragDropProps {
  articles: any[];
  blockType: 'grid' | 'list' | 'featured';
  isDarkTheme?: boolean;
  onSave: (columns: { [key: string]: any[] }) => void;
}

export default {
  title: 'Components/BlockManager/DragDrop',
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
export const Grid_Standard = Template.bind({});
Grid_Standard.args = {
  blockType: 'grid',
  articles: mockArticles,
  isDarkTheme: false,
  onSave: (columns) => console.log('Updated columns:', columns),
};
Grid_Standard.storyName = 'Grid/Standard';

export const Grid_Featured = Template.bind({});
Grid_Featured.args = {
  ...Grid_Standard.args,
  blockType: 'grid',
};
Grid_Featured.storyName = 'Grid/Featured';

export const Grid_Masonry = Template.bind({});
Grid_Masonry.args = {
  ...Grid_Standard.args,
  blockType: 'grid',
};
Grid_Masonry.storyName = 'Grid/Masonry';

export const Grid_Sidebar = Template.bind({});
Grid_Sidebar.args = {
  ...Grid_Standard.args,
  blockType: 'grid',
};
Grid_Sidebar.storyName = 'Grid/Sidebar';

export const Grid_News = Template.bind({});
Grid_News.args = {
  ...Grid_Standard.args,
  blockType: 'grid',
};
Grid_News.storyName = 'Grid/News';

export const Grid_NewsFeed = Template.bind({});
Grid_NewsFeed.args = {
  ...Grid_Standard.args,
  blockType: 'grid',
};
Grid_NewsFeed.storyName = 'Grid/News Feed';

// List Variants
export const List_Chronological = Template.bind({});
List_Chronological.args = {
  blockType: 'list',
  articles: mockArticles,
  isDarkTheme: false,
  onSave: (columns) => console.log('Updated columns:', columns),
};
List_Chronological.storyName = 'List/Chronological';

export const List_Compact = Template.bind({});
List_Compact.args = {
  ...List_Chronological.args,
  blockType: 'list',
};
List_Compact.storyName = 'List/Compact';

export const List_Card = Template.bind({});
List_Card.args = {
  ...List_Chronological.args,
  blockType: 'list',
};
List_Card.storyName = 'List/Card';

// Featured Variants
export const Featured_Hero = Template.bind({});
Featured_Hero.args = {
  blockType: 'featured',
  articles: mockArticles,
  isDarkTheme: false,
  onSave: (columns) => console.log('Updated columns:', columns),
};
Featured_Hero.storyName = 'Featured/Hero';

export const Featured_Split = Template.bind({});
Featured_Split.args = {
  ...Featured_Hero.args,
  blockType: 'featured',
};
Featured_Split.storyName = 'Featured/Split';

export const Featured_Triple = Template.bind({});
Featured_Triple.args = {
  ...Featured_Hero.args,
  blockType: 'featured',
};
Featured_Triple.storyName = 'Featured/Triple';

// Dark Theme Examples
export const Theme_Dark_Grid = Template.bind({});
Theme_Dark_Grid.args = {
  ...Grid_Standard.args,
  isDarkTheme: true,
};
Theme_Dark_Grid.storyName = 'Theme/Dark/Grid';

export const Theme_Dark_List = Template.bind({});
Theme_Dark_List.args = {
  ...List_Chronological.args,
  isDarkTheme: true,
};
Theme_Dark_List.storyName = 'Theme/Dark/List';

export const Theme_Dark_Featured = Template.bind({});
Theme_Dark_Featured.args = {
  ...Featured_Hero.args,
  isDarkTheme: true,
};
Theme_Dark_Featured.storyName = 'Theme/Dark/Featured'; 