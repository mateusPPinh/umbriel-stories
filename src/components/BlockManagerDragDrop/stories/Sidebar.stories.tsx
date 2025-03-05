import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Sidebar } from '../index';
import { createArticles } from '../../PageblockV2/stories/mockData';
import { DragDropContext } from '@hello-pangea/dnd';

interface SidebarProps {
  articles?: any[];
  isLoading?: boolean;
  className?: string;
  pageData: any[];
  editorialsData: any;
  isPagesLoading: boolean;
  isEditorialsLoading: boolean;
  blockConfig: any;
  onPageSelect?: (pageId: string) => void;
  onEditorialSelect?: (editorialId: string, subEditorialId?: string) => void;
  onClearSelection?: () => void;
  onPublishBlock?: () => void;
}

export default {
  title: 'Components/BlockManager/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
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
      <div className="h-screen p-4" style={{ width: '320px' }}>
        <DragDropContext onDragEnd={(result) => console.log('Drag ended:', result)}>
          <Story />
        </DragDropContext>
      </div>
    )
  ]
} as Meta;

const mockArticles = createArticles(30);

// Mock data for pages and editorials
const mockPages = [
  { id: 'page-1', title: 'Home Page' },
  { id: 'page-2', title: 'About Us' },
  { id: 'page-3', title: 'Contact' },
  { id: 'page-4', title: 'Blog' },
  { id: 'page-5', title: 'Products' },
];

const mockEditorials = {
  editorials: [
    { 
      id: 'ed-1', 
      title: 'News', 
      children: [
        { id: 'sub-ed-1', title: 'Politics' },
        { id: 'sub-ed-2', title: 'Economy' },
        { id: 'sub-ed-3', title: 'World' }
      ] 
    },
    { 
      id: 'ed-2', 
      title: 'Sports', 
      children: [
        { id: 'sub-ed-4', title: 'Football' },
        { id: 'sub-ed-5', title: 'Basketball' },
        { id: 'sub-ed-6', title: 'Tennis' }
      ] 
    },
    { 
      id: 'ed-3', 
      title: 'Entertainment', 
      children: [
        { id: 'sub-ed-7', title: 'Movies' },
        { id: 'sub-ed-8', title: 'Music' },
        { id: 'sub-ed-9', title: 'TV Shows' }
      ] 
    }
  ]
};

const defaultBlockConfig = {
  layout: {
    columns: '3',
    gap: '6',
    styles: {
      width: '100%',
      backgroundColor: 'transparent'
    }
  },
  styles: {
    theme: {
      light: {
        columnStyle: {
          background: 'white',
          padding: '1rem'
        },
        headingProps: {
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#111827'
        },
        subtitleProps: {
          fontSize: '0.875rem',
          color: '#6B7280'
        }
      },
      dark: {
        columnStyle: {
          background: '#1F2937',
          padding: '1rem'
        },
        headingProps: {
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#F9FAFB'
        },
        subtitleProps: {
          fontSize: '0.875rem',
          color: '#9CA3AF'
        }
      }
    },
    showExcerpt: true
  }
};

const Template: Story<SidebarProps> = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
  articles: mockArticles,
  pageData: mockPages,
  editorialsData: mockEditorials,
  isPagesLoading: false,
  isEditorialsLoading: false,
  blockConfig: defaultBlockConfig,
  onPageSelect: (pageId) => console.log('Selected page:', pageId),
  onEditorialSelect: (editorialId, subEditorialId) => console.log('Selected editorial:', editorialId, subEditorialId),
  onClearSelection: () => console.log('Cleared selection'),
  onPublishBlock: () => console.log('Publishing block')
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  isPagesLoading: true,
  isEditorialsLoading: true
};

export const EmptyArticles = Template.bind({});
EmptyArticles.args = {
  ...Default.args,
  articles: []
};

export const EmptyPages = Template.bind({});
EmptyPages.args = {
  ...Default.args,
  pageData: []
};

export const EmptyEditorials = Template.bind({});
EmptyEditorials.args = {
  ...Default.args,
  editorialsData: { editorials: [] }
}; 