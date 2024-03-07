import { Box } from '../../components/Boxes';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/Box',
  component: Box,
  tags: ['autodocs'],
  parameters: {},

} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const T: Story = {
  args: {
    as: 'div',
    children: 'Meu Box',
    css: {alignContent: 'center'}
  }
}