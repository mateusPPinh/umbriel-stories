import React from 'react';
import { Story, Meta } from '@storybook/react';
import VideoGrid from '../blocks/MixedBlock/variants/VideoGrid';
import { BlockVariant } from '../types';
import { createArticles } from './mockData';
import { ResponsiveDeviceProvider } from '../contexts/ResponsiveDeviceContext';
import { mockClientTheme } from './mockClientTheme';

export default {
  title: 'PageBlockV2/Mixed/VideoGrid',
  component: VideoGrid,
  decorators: [
    (Story) => (
      <ResponsiveDeviceProvider>
        <Story />
      </ResponsiveDeviceProvider>
    ),
  ],
} as Meta;

const Template: Story<{ variant: BlockVariant; isDarkTheme?: boolean }> = (args) => (
  <VideoGrid {...args} clientGeneralSettingsData={mockClientTheme} />
);

// Mock articles for each column
const videoArticles = {
  'col-0': [createArticles(1)[0]], // Main article
  'col-1': createArticles(3), // Secondary articles
  'col-2': createArticles(3), // Tertiary articles
};

// Base variant configuration
const baseVideoVariant: BlockVariant = {
  variantType: 'video',
  variantPosition: 1,
  config: {
    layout: {
      columns: 3,
      gap: '24px',
      padding: '24px',
      responsive: {
        mobile: 1,
        tablet: 2,
        desktop: 3
      }
    },
    articles: videoArticles,
    mediaConfig: {
      videoConfig: {
        autoplay: false,
        loop: false,
        muted: true,
        controls: false,
        customUrl: 'https://barzuputru.local.api.umbrielcms.com.br:3001/uploads/07106966111274600aac-ortega.mp4'
      }
    },
    styles: {
      theme: {
        light: {
          columnStyle: {
            background: "transparent",
            padding: "16px"
          },
          headingProps: {
            fontSize: "xl",
            fontWeight: "bold",
            color: "#1a1a1a"
          },
          subtitleProps: {
            fontSize: "lg",
            color: "#4a5568"
          }
        },
        dark: {
          columnStyle: {
            background: "transparent",
            padding: "16px"
          },
          headingProps: {
            fontSize: "xl",
            fontWeight: "bold",
            color: "#ffffff"
          },
          subtitleProps: {
            fontSize: "lg",
            color: "#a0aec0"
          }
        }
      },
      showExcerpt: true
    }
  }
};

// Default variant
export const Default = Template.bind({});
Default.args = {
  variant: baseVideoVariant,
  isDarkTheme: false
};

// With native controls
export const WithControls = Template.bind({});
WithControls.args = {
  variant: {
    ...baseVideoVariant,
    config: {
      ...baseVideoVariant.config,
      mediaConfig: {
        videoConfig: {
          ...baseVideoVariant.config.mediaConfig?.videoConfig,
          controls: true
        }
      }
    }
  },
  isDarkTheme: false
};

// Autoplay and Loop
export const AutoplayLoop = Template.bind({});
AutoplayLoop.args = {
  variant: {
    ...baseVideoVariant,
    config: {
      ...baseVideoVariant.config,
      mediaConfig: {
        videoConfig: {
          ...baseVideoVariant.config.mediaConfig?.videoConfig,
          autoplay: true,
          loop: true,
          muted: true,
          controls: false
        }
      }
    }
  },
  isDarkTheme: false
};

// Dark theme
export const DarkTheme = Template.bind({});
DarkTheme.args = {
  variant: baseVideoVariant,
  isDarkTheme: true
};
