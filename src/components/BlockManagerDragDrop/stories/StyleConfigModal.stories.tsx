import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import StyleConfigModal from '../components/StyleConfigModal';
import { BlockConfig } from '../components/StyleConfigModal';

const defaultConfig: BlockConfig = {
  layout: {
    columns: '3',
    gap: '16px',
    styles: {
      width: '100%',
      backgroundColor: 'transparent'
    }
  },
  styles: {
    theme: {
      light: {
        columnStyle: {
          background: '#ffffff',
          padding: '16px'
        },
        headingProps: {
          fontSize: 'xl',
          fontWeight: 'semibold',
          color: '#1f2937'
        },
        subtitleProps: {
          fontSize: 'base',
          color: '#4b5563'
        }
      },
      dark: {
        columnStyle: {
          background: '#1f2937',
          padding: '16px'
        },
        headingProps: {
          fontSize: 'xl',
          fontWeight: 'semibold',
          color: '#f3f4f6'
        },
        subtitleProps: {
          fontSize: 'base',
          color: '#9ca3af'
        }
      }
    },
    showExcerpt: true
  },
  mediaConfig: {
    videoConfig: {
      autoplay: false,
      loop: false,
      muted: true,
      controls: true,
      customUrl: ''
    },
    imageConfig: {
      fit: 'cover',
      position: 'center',
      overlay: {
        enabled: true,
        color: '#000000',
        opacity: 0.5
      }
    }
  }
};

const meta = {
  title: 'Components/BlockManager/StyleConfigModal',
  component: StyleConfigModal,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StyleConfigModal>;

export default meta;
type Story = StoryObj<typeof StyleConfigModal>;

export const Grid_Standard: Story = {
  args: {
    isOpen: true,
    currentConfig: defaultConfig,
    blockType: 'grid',
    variantType: 'standard',
    onClose: () => console.log('close'),
    onSave: (config) => console.log('save', config)
  }
};

export const Grid_Masonry: Story = {
  args: {
    ...Grid_Standard.args,
    variantType: 'masonry',
    currentConfig: {
      ...defaultConfig,
      styles: {
        ...defaultConfig.styles,
        minCellHeight: '200px'
      }
    }
  }
};

export const Grid_Sidebar: Story = {
  args: {
    ...Grid_Standard.args,
    variantType: 'sidebar',
    currentConfig: {
      ...defaultConfig,
      styles: {
        ...defaultConfig.styles,
        sidebarPosition: 'right'
      }
    }
  }
};

export const List_Chronological: Story = {
  args: {
    ...Grid_Standard.args,
    blockType: 'list',
    variantType: 'chronological',
    currentConfig: {
      ...defaultConfig,
      styles: {
        ...defaultConfig.styles,
        itemSpacing: '16px'
      }
    }
  }
};

export const List_Card: Story = {
  args: {
    ...Grid_Standard.args,
    blockType: 'list',
    variantType: 'card',
    currentConfig: {
      ...defaultConfig,
      styles: {
        ...defaultConfig.styles,
        cardSize: 'medium'
      }
    }
  }
};

export const Featured_Hero: Story = {
  args: {
    ...Grid_Standard.args,
    blockType: 'featured',
    variantType: 'hero',
    currentConfig: {
      ...defaultConfig,
      styles: {
        ...defaultConfig.styles,
        heroHeight: '500px'
      }
    }
  }
};

export const Featured_Split: Story = {
  args: {
    ...Grid_Standard.args,
    blockType: 'featured',
    variantType: 'split',
    currentConfig: {
      ...defaultConfig,
      styles: {
        ...defaultConfig.styles,
        splitRatio: '1:1'
      }
    }
  }
};

export const Featured_Triple: Story = {
  args: {
    ...Grid_Standard.args,
    blockType: 'featured',
    variantType: 'triple'
  }
};

export const Video_Grid: Story = {
  args: {
    ...Grid_Standard.args,
    variantType: 'video'
  }
}; 