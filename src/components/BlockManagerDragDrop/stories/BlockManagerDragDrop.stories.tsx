import React from 'react';
import { Story, Meta } from '@storybook/react';
import BlockManagerDragDrop from '../index';
import { createArticles } from '../../PageblockV2/stories/mockData';
import { mockVideos } from './video.mock';
import { editorialsMock } from './editorials.mock';
import { Editorial } from '../interfaces/editorial.types';
import { PageResponse } from '../interfaces/pages.types';
import { pageMock } from './page.mock';
interface BlockManagerDragDropProps {
  articles: any[];
  blockType: 'grid' | 'list' | 'mixed' | 'featured';
  isDarkTheme?: boolean;
  onSave: (columns: { [key: string]: any[] }) => void;
  variant?: string;
  pageId: string;
  pageData?: PageResponse[];
  editorialsData?: Editorial;
  isPagesLoading?: boolean;
  isEditorialsLoading?: boolean;
  onPageSelect?: (pageId: string) => void;
  onEditorialSelect?: (editorialId: string, subEditorialId?: string) => void;
  onPublishBlock?: () => void;
  showSidebar?: boolean;
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

// Common props for all stories
const commonProps = {
  articles: mockArticles,
  isDarkTheme: false,
  onSave: (columns) => console.log('Updated columns:', columns),
  pageId: 'mock-page-id',
  pageData: pageMock,
  editorialsData: editorialsMock,
  isPagesLoading: false,
  isEditorialsLoading: false,
  onPageSelect: (pageId) => console.log('Selected page:', pageId),
  onEditorialSelect: (editorialId, subEditorialId) => console.log('Selected editorial:', editorialId, subEditorialId),
  onPublishBlock: () => console.log('Publishing block'),
  showSidebar: true
};

// Grid Variants
export const Grid_Standard = Template.bind({});
Grid_Standard.args = {
  ...commonProps,
  blockType: 'grid',
  variant: 'standard',
};
Grid_Standard.storyName = 'Grid/Standard';

export const Grid_Featured = Template.bind({});
Grid_Featured.args = {
  ...commonProps,
  blockType: 'grid',
  variant: 'featured'
};
Grid_Featured.storyName = 'Grid/Featured';

export const Grid_Masonry = Template.bind({});
Grid_Masonry.args = {
  ...commonProps,
  blockType: 'grid',
  variant: 'masonry'
};
Grid_Masonry.storyName = 'Grid/Masonry';

export const Grid_Sidebar = Template.bind({});
Grid_Sidebar.args = {
  ...commonProps,
  blockType: 'grid',
  variant: 'sidebargrid'
};
Grid_Sidebar.storyName = 'Grid/Sidebar';

export const Grid_News = Template.bind({});
Grid_News.args = {
  ...commonProps,
  blockType: 'grid',
  variant: 'newsgrid'
};
Grid_News.storyName = 'Grid/News';

export const Grid_NewsFeed = Template.bind({});
Grid_NewsFeed.args = {
  ...commonProps,
  blockType: 'grid',
  variant: 'newsfeed'
};
Grid_NewsFeed.storyName = 'Grid/News Feed';

// List Variants
export const List_Chronological = Template.bind({});
List_Chronological.args = {
  ...commonProps,
  blockType: 'list',
};
List_Chronological.storyName = 'List/Chronological';

export const List_Compact = Template.bind({});
List_Compact.args = {
  ...commonProps,
  blockType: 'list',
};
List_Compact.storyName = 'List/Compact';

export const List_Card = Template.bind({});
List_Card.args = {
  ...commonProps,
  blockType: 'list',
};
List_Card.storyName = 'List/Card';

// Mixed Variants
export const Mixed_Sidebar = Template.bind({});
Mixed_Sidebar.args = {
  ...commonProps,
  blockType: 'mixed',
};
Mixed_Sidebar.storyName = 'Mixed/Sidebar';

export const Mixed_Showcase = Template.bind({});
Mixed_Showcase.args = {
  ...commonProps,
  blockType: 'mixed',
};
Mixed_Showcase.storyName = 'Mixed/Showcase';

export const Mixed_Newspaper = Template.bind({});
Mixed_Newspaper.args = {
  ...commonProps,
  blockType: 'mixed',
};
Mixed_Newspaper.storyName = 'Mixed/Newspaper';

export const Mixed_Magazine = Template.bind({});
Mixed_Magazine.args = {
  ...commonProps,
  blockType: 'mixed',
};
Mixed_Magazine.storyName = 'Mixed/Magazine';

export const Mixed_VideoGrid = Template.bind({});
Mixed_VideoGrid.args = {
  ...commonProps,
  blockType: 'mixed',
  variant: 'videogrid',
  videos: mockVideos
};
Mixed_VideoGrid.storyName = 'Mixed/Video Grid';

// Dark Theme Examples
export const Theme_Dark_Grid = Template.bind({});
Theme_Dark_Grid.args = {
  ...commonProps,
  isDarkTheme: true,
  blockType: 'grid',
};
Theme_Dark_Grid.storyName = 'Theme/Dark/Grid';

export const Theme_Dark_List = Template.bind({});
Theme_Dark_List.args = {
  ...commonProps,
  isDarkTheme: true,
  blockType: 'list',
};
Theme_Dark_List.storyName = 'Theme/Dark/List';

export const Theme_Dark_Mixed = Template.bind({});
Theme_Dark_Mixed.args = {
  ...commonProps,
  isDarkTheme: true,
  blockType: 'mixed',
};
Theme_Dark_Mixed.storyName = 'Theme/Dark/Mixed';

// Featured Variants
export const Featured_Hero = Template.bind({});
Featured_Hero.args = {
  ...commonProps,
  blockType: 'featured',
  variant: 'hero',
};
Featured_Hero.storyName = 'Featured/Hero';

export const Featured_Split = Template.bind({});
Featured_Split.args = {
  ...commonProps,
  blockType: 'featured',
  variant: 'split'
};
Featured_Split.storyName = 'Featured/Split';

export const Featured_Triple = Template.bind({});
Featured_Triple.args = {
  ...commonProps,
  blockType: 'featured',
  variant: 'triple'
};
Featured_Triple.storyName = 'Featured/Triple';

// Without Sidebar
export const Without_Sidebar = Template.bind({});
Without_Sidebar.args = {
  ...commonProps,
  blockType: 'grid',
  variant: 'standard',
  showSidebar: false
};
Without_Sidebar.storyName = 'Without Sidebar'; 