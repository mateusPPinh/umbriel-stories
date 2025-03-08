import React from 'react';
import { Story, Meta } from '@storybook/react';
import CompactList from '../blocks/ListBlock/variants/CompactList';
import { BlockVariant, ClientTheme } from '../types';
import { createArticles } from './mockData';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';
import { mockClientTheme } from './mockClientTheme';

export default {
  title: 'PageBlockV2/List/CompactList',
  component: CompactList,
  decorators: [
    (Story) => (
      <ResponsiveDeviceProvider>
        <Story />
      </ResponsiveDeviceProvider>
    ),
  ],
  parameters: {
    controls: {
      expanded: true
    }
  },
  argTypes: {
    layout: {
      control: { type: 'radio' },
      options: ['single', 'grid'],
      defaultValue: 'single',
      description: 'Layout type for the list'
    },
    isDarkTheme: {
      control: 'boolean'
    }
  }
} as Meta;

// Componente wrapper para garantir que a prop layout seja passada corretamente
const TemplateWithControls: Story<{ 
  variant: BlockVariant; 
  isDarkTheme?: boolean; 
  clientGeneralSettingsData: ClientTheme;
  layout: 'single' | 'grid';
}> = (args) => {
  console.log('Storybook rendering with layout:', args.layout);
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
      <h2 className="mb-4 text-lg font-semibold">Layout: {args.layout}</h2>
      <CompactList {...args} clientGeneralSettingsData={mockClientTheme} />
    </div>
  );
};

// Create mock articles for the list
const listArticles = {
  'col-0': createArticles(6)
};

// Base variant mock
const baseCompactVariant: BlockVariant = {
  variantType: 'compact',
  variantPosition: 1,
  config: {
    layout: {
      columns: 1,
      gap: '16px',
      padding: '24px',
      responsive: {
        mobile: 1,
        tablet: 1,
        desktop: 1
      }
    },
    articles: listArticles,
    styles: {
      theme: {
        light: {
          columnStyle: {
            background: "transparent",
            borderBottom: "1px solid #e2e8f0",
            padding: "16px 0"
          },
          headingProps: {
            fontSize: "lg",
            fontWeight: "medium",
            color: "#1a1a1a"
          },
          subtitleProps: {
            fontSize: "sm",
            color: "#4a5568"
          }
        },
        dark: {
          columnStyle: {
            background: "transparent",
            borderBottom: "1px solid #2d3748",
            padding: "16px 0"
          },
          headingProps: {
            fontSize: "lg",
            fontWeight: "medium",
            color: "#ffffff"
          },
          subtitleProps: {
            fontSize: "sm",
            color: "#a0aec0"
          }
        }
      },
      titleSize: 'lg',
      showExcerpt: true,
      showMetadata: true,
      hoverEffect: 'background',
      dividerStyle: 'solid',
      spacing: {
        itemPadding: '16px 0',
        itemGap: '0'
      }
    }
  }
};

// Single Column Layout (Default)
export const SingleColumn = TemplateWithControls.bind({});
SingleColumn.args = {
  variant: baseCompactVariant,
  isDarkTheme: false,
  layout: 'single'
};

// Grid Layout
export const GridLayout = TemplateWithControls.bind({});
GridLayout.args = {
  variant: baseCompactVariant,
  isDarkTheme: false,
  layout: 'grid'
};

// Dark theme with single column
export const DarkThemeSingle = TemplateWithControls.bind({});
DarkThemeSingle.args = {
  variant: baseCompactVariant,
  isDarkTheme: true,
  layout: 'single'
};

// Dark theme with grid
export const DarkThemeGrid = TemplateWithControls.bind({});
DarkThemeGrid.args = {
  variant: baseCompactVariant,
  isDarkTheme: true,
  layout: 'grid'
}; 