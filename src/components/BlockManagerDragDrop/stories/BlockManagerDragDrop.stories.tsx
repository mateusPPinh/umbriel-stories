import React from 'react';
import { Story, Meta } from '@storybook/react';
import BlockManagerDragDrop from '../index';
import { createArticles } from '../../PageblockV2/stories/mockData';
import { mockVideos } from './video.mock';

interface BlockManagerDragDropProps {
  articles: any[];
  blockType: 'grid' | 'list' | 'mixed' | 'featured';
  isDarkTheme?: boolean;
  onSave: (columns: { [key: string]: any[] }) => void;
  variant?: string;
  pageId: string;
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
      <div className="h-screen p-4 w-full">
        <Story />
      </div>
    )
  ]
} as Meta;

const mockArticles = createArticles(30);

const Template: Story<BlockManagerDragDropProps> = (args) => (
  <div className="w-full mx-auto"><BlockManagerDragDrop {...args} /></div>
);

// Grid Variants
export const Grid_Standard = Template.bind({});
Grid_Standard.args = {
  blockType: 'grid',
  articles: mockArticles,
  isDarkTheme: false,
  onSave: (columns) => console.log('Updated columns:', columns),
  variant: 'standard',
  pageId: 'mock-page-id'
};
Grid_Standard.storyName = 'Grid/Standard';

export const Grid_Featured = Template.bind({});
Grid_Featured.args = {
  ...Grid_Standard.args,
  blockType: 'grid',
  variant: 'featured'
};
Grid_Featured.storyName = 'Grid/Featured';

export const Grid_Masonry = Template.bind({});
Grid_Masonry.args = {
  ...Grid_Standard.args,
  blockType: 'grid',
  variant: 'masonry'
};
Grid_Masonry.storyName = 'Grid/Masonry';

export const Grid_Sidebar = Template.bind({});
Grid_Sidebar.args = {
  ...Grid_Standard.args,
  blockType: 'grid',
  variant: 'sidebargrid'
};
Grid_Sidebar.storyName = 'Grid/Sidebar';

export const Grid_News = Template.bind({});
Grid_News.args = {
  ...Grid_Standard.args,
  blockType: 'grid',
  variant: 'newsgrid'
};
Grid_News.storyName = 'Grid/News';

export const Grid_NewsFeed = Template.bind({});
Grid_NewsFeed.args = {
  ...Grid_Standard.args,
  blockType: 'grid',
  variant: 'newsfeed'
};
Grid_NewsFeed.storyName = 'Grid/News Feed';

// List Variants
export const List_Chronological = Template.bind({});
List_Chronological.args = {
  blockType: 'list',
  articles: mockArticles,
  isDarkTheme: false,
  onSave: (columns) => console.log('Updated columns:', columns),
  pageId: 'mock-page-id'
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

// Mixed Variants
export const Mixed_Sidebar = Template.bind({});
Mixed_Sidebar.args = {
  blockType: 'mixed',
  articles: mockArticles,
  isDarkTheme: false,
  onSave: (columns) => console.log('Updated columns:', columns),
  pageId: 'mock-page-id'
};
Mixed_Sidebar.storyName = 'Mixed/Sidebar';

export const Mixed_Showcase = Template.bind({});
Mixed_Showcase.args = {
  ...Mixed_Sidebar.args,
  blockType: 'mixed',
};
Mixed_Showcase.storyName = 'Mixed/Showcase';

export const Mixed_Newspaper = Template.bind({});
Mixed_Newspaper.args = {
  ...Mixed_Sidebar.args,
  blockType: 'mixed',
};
Mixed_Newspaper.storyName = 'Mixed/Newspaper';

export const Mixed_Magazine = Template.bind({});
Mixed_Magazine.args = {
  ...Mixed_Sidebar.args,
  blockType: 'mixed',
};
Mixed_Magazine.storyName = 'Mixed/Magazine';

export const Mixed_VideoGrid = Template.bind({});
Mixed_VideoGrid.args = {
  blockType: 'mixed',
  articles: mockArticles,
  isDarkTheme: false,
  onSave: (columns) => console.log('Updated columns:', columns),
  variant: 'videogrid',
  pageId: 'mock-page-id',
  videos: mockVideos
};
Mixed_VideoGrid.storyName = 'Mixed/Video Grid';

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

export const Theme_Dark_Mixed = Template.bind({});
Theme_Dark_Mixed.args = {
  ...Mixed_Sidebar.args,
  isDarkTheme: true,
};
Theme_Dark_Mixed.storyName = 'Theme/Dark/Mixed';

// Featured Variants
export const Featured_Hero = Template.bind({});
Featured_Hero.args = {
  blockType: 'featured',
  articles: mockArticles,
  isDarkTheme: false,
  onSave: (columns) => console.log('Updated columns:', columns),
  variant: 'hero',
  pageId: 'mock-page-id'
};
Featured_Hero.storyName = 'Featured/Hero';

export const Featured_Split = Template.bind({});
Featured_Split.args = {
  ...Featured_Hero.args,
  blockType: 'featured',
  variant: 'split'
};
Featured_Split.storyName = 'Featured/Split';

export const Featured_Triple = Template.bind({});
Featured_Triple.args = {
  ...Featured_Hero.args,
  blockType: 'featured',
  variant: 'triple'
};
Featured_Triple.storyName = 'Featured/Triple'; 