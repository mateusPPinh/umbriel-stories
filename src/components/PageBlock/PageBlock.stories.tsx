import type { Meta, StoryObj } from '@storybook/react';

import { PageBlockRenderer } from '.';
import { Box } from '../Boxes';

const meta: Meta<typeof PageBlockRenderer> = {
  title: 'Componentes/PageBlockRenderer',
  component: PageBlockRenderer,
};

export default meta;
type Story = StoryObj<typeof PageBlockRenderer>;

export const Primary: Story = {
  args: {
   layout: '',
   template: 'Template100',
   genericCarrousel: [
    {
      layoutCarrousel: {

      }
    }
   ],
   genericFooter: [],
   genericMenu: [],
   items: {
    slot_left_items: {
      content: [],
    },
    slot_right_items: {
      content: [],
    },
   },
   centerMiddle: {
    blockPosition: 0,
    layout: '',
    template: '',
    items: []
   }
  },
  decorators: [
    (Story) => {
      return (
        <Box css={{bgColor: 'neutral900'}}>
          <Story />
        </Box>
      )
    }
  ],
};