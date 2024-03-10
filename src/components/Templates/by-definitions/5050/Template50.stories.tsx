import type { Meta, StoryObj } from '@storybook/react'

import Template5050 from './Template50'
import Box from '../../../Boxes/Boxes'

const meta: Meta<typeof Template5050> = {
  title: 'Componentes/Template5050',
  component: Template5050,
}

export default meta
type Story = StoryObj<typeof Template5050>

export const Primary: Story = {
  args: {
    blockPosition: 1,
    layout: '',
    maxImagesLeft: 2,
    maxImagesRight: 2,
    slot_left_items: {
      content: [
        {
          title: 'Título Esquerdo 1',
          subtitle: 'Subtítulo 1',
          image: {
            desktop_image_path:
              'http://localhost:3001/uploads/a96788fcc1e5ea73af18-desk-nextproject-panvel_vita_c.jpg',
            image_mobile_path:
              'http://localhost:3001/uploads/a96788fcc1e5ea73af18-desk-nextproject-panvel_vita_c.jpg',
          },
        },
        {
          title: 'Título Esquerdo 1',
          subtitle: 'Subtítulo 1',
          image: {
            desktop_image_path:
              'http://localhost:3001/uploads/a96788fcc1e5ea73af18-desk-nextproject-panvel_vita_c.jpg',
            image_mobile_path:
              'http://localhost:3001/uploads/a96788fcc1e5ea73af18-desk-nextproject-panvel_vita_c.jpg',
          },
        },
      ],
    },
    slot_left_bgColor: '#dddcdf',
    slot_right_bgColor: '#f7e3f7',
    slot_right_items: {
      content: [
        {
          title: 'Título Esquerdo 1',
          subtitle: 'Subtítulo 1',
          image: {
            desktop_image_path:
              'http://localhost:3001/uploads/a96788fcc1e5ea73af18-desk-nextproject-panvel_vita_c.jpg',
            image_mobile_path:
              'http://localhost:3001/uploads/a96788fcc1e5ea73af18-desk-nextproject-panvel_vita_c.jpg',
          },
        },
        {
          title: 'Título Esquerdo 1',
          subtitle: 'Subtítulo 1',
          image: {
            desktop_image_path:
              'http://localhost:3001/uploads/a96788fcc1e5ea73af18-desk-nextproject-panvel_vita_c.jpg',
            image_mobile_path:
              'http://localhost:3001/uploads/a96788fcc1e5ea73af18-desk-nextproject-panvel_vita_c.jpg',
          },
        },
      ],
    },
    template: 'Template5050',
  },
  render: (args) => {
    console.log(args, 'argumentos')
    return (
      <Box
        css={{
          alignItems: 'column',
          justifyContent: 'center',
          display: 'flex',
          margin: 'auto',
          flexDirection: 'column',
          width: 'calc(100% - 32px)',
        }}
      >
        <Template5050 {...args} />
      </Box>
    )
  },
}
