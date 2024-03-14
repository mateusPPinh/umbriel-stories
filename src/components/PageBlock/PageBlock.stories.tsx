/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Meta, StoryObj } from '@storybook/react'

import PageBlockRenderer from './PageBlock'
import Box from '../Boxes/Boxes'

const meta: Meta<typeof PageBlockRenderer> = {
  title: 'Componentes/PageBlockRenderer',
  component: PageBlockRenderer
}

export default meta
type Story = StoryObj<typeof PageBlockRenderer>

export const Primary: Story = {
  args: {
    layout: '',
    template: 'Template5050'
  },
  decorators: [
    (Story, context) => {
      const template = context.args.template
      let content

      if (template === 'Template100') {
        content = {
          slot100: {
            bgColor: '#f7e4f7',
            genericCarrousel: [
              {
                /* Dados do carrossel aqui */
              }
            ],
            genericFooter: [
              { footer: { title_bottom: 'Teste', title_top: 'Teste 2' } }
            ],
            genericMenu: [{ title: 'Home', href: '/' }],
            template: 'Template100',
            transparent: false,
            children: <p>Conteúdo adicional que será renderizado</p>
          }
        }
      } else if (template === 'Template5050') {
        content = {
          centerMiddle: {
            blockPosition: 0,
            layout: '',
            template: 'Template5050',
            align_text_slot_left: 'left',
            align_text_slot_right: 'left',
            anchorHandlerProps: {
              href: '/',
              isSlotImageLeftAnchor: true,
              isSlotLeftTitleAnchor: true,
              isSlotImageRightAnchor: true,
              isSlotRightTitleAnchor: true
            },
            target: '_blank',
            slot_left_bgColor: '#7159c1',
            slot_right_bgColor: '#333',
            items: [
              {
                slot_left_items: {
                  content: [
                    {
                      title: 'Produto do Mateus',
                      subtitle: 'Subtítulo 1',
                      image: {
                        desktop_image_path:
                          'http://localhost:3001/uploads/a96788fcc1e5ea73af18-desk-nextproject-panvel_vita_c.jpg',
                        image_mobile_path:
                          'http://localhost:3001/uploads/a96788fcc1e5ea73af18-desk-nextproject-panvel_vita_c.jpg'
                      }
                    },
                    {
                      title: 'Produto do Mateus',
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
                }
              }
            ]
          }
        }
      }

      return (
        <Box css={{ bgColor: 'negative500' }}>
          {/* @ts-expect-error */}
          <PageBlockRenderer {...context.args} {...content} />
        </Box>
      )
    }
  ],
  argTypes: {
    template: {
      control: 'select',
      options: ['Template100', 'Template5050'],
      bgColor: { control: 'color' },
      slot_left_bgColor: { control: 'color' },
      slot_right_bgColor: { control: 'color' }
    }
  }
}
