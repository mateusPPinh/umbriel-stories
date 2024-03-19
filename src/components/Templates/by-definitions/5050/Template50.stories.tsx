import type { Meta, StoryObj } from '@storybook/react'

import Template5050 from './Template50'
import Box from '../../../Boxes/Boxes'

const meta: Meta<typeof Template5050> = {
  title: 'Componentes/Template5050',
  component: Template5050
}

export default meta
type Story = StoryObj<typeof Template5050>

export const Primary: Story = {
  args: {
    blockPosition: '1',
    layout: '',
    slot_left_items: {
      content: [
        {
          title: 'Título Esquerdo 1',
          subtitle: 'Subtítulo 1',
          image: {
            desktop_image_path:
              'http://localhost:3001/uploads/a96788fcc1e5ea73af18-desk-nextproject-panvel_vita_c.jpg',
            image_mobile_path:
              'http://localhost:3001/uploads/a96788fcc1e5ea73af18-desk-nextproject-panvel_vita_c.jpg'
          }
        },
        {
          title: 'Título Esquerdo 1',
          subtitle: 'Subtítulo 1',
          image: {
            desktop_image_path:
              'http://localhost:3001/uploads/a96788fcc1e5ea73af18-desk-nextproject-panvel_vita_c.jpg',
            image_mobile_path:
              'http://localhost:3001/uploads/a96788fcc1e5ea73af18-desk-nextproject-panvel_vita_c.jpg'
          }
        }
      ]
    },
    slot_right_items: {
      content: [
        {
          title: 'Título Esquerdo 1',
          subtitle: 'Subtítulo 1',
          image: {
            desktop_image_path:
              'http://localhost:3001/uploads/a96788fcc1e5ea73af18-desk-nextproject-panvel_vita_c.jpg',
            image_mobile_path:
              'http://localhost:3001/uploads/a96788fcc1e5ea73af18-desk-nextproject-panvel_vita_c.jpg'
          }
        },
        {
          title: 'Título Esquerdo 1',
          subtitle: 'Subtítulo 1',
          image: {
            desktop_image_path:
              'http://localhost:3001/uploads/a96788fcc1e5ea73af18-desk-nextproject-panvel_vita_c.jpg',
            image_mobile_path:
              'http://localhost:3001/uploads/a96788fcc1e5ea73af18-desk-nextproject-panvel_vita_c.jpg'
          }
        }
      ]
    },
    template: 'Template5050',
    textProps: {
      color: '#7159c1',
      as: 'h2',
      font_size: 23
    },
    template50Options: {
      align_text_slot_left: 'center',
      align_text_slot_right: 'center',
      slot_left_bgColor: 'white',
      slot_right_bgColor: 'white',
      anchorHandlerProps: {
        href: '/',
        isSlotImageLeftAnchor: false,
        isSlotLeftTitleAnchor: true,
        isSlotImageRightAnchor: true,
        isSlotRightTitleAnchor: true
      }
    },
    target: '_blank'
  },
  render: (args) => {
    return (
      <Box
        css={{
          alignItems: 'column',
          justifyContent: 'center',
          display: 'flex',
          margin: 'auto',
          flexDirection: 'column',
          width: 'calc(100% - 32px)'
        }}
      >
        <Template5050 {...args} />
      </Box>
    )
  }
}
