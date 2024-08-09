import type { Meta, StoryObj } from '@storybook/react'

import GalleryV2 from './index'
import { photosArrMock } from './mock'
import { type ImageDataProps } from './types'

/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const mock: ImageDataProps[] = photosArrMock

const meta: Meta<typeof GalleryV2> = {
  title: 'Componentes/UmbrielGallery',
  component: GalleryV2,
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    titleFontProps: {
      fontSize: { control: 'text' },
      fontWeight: { control: 'text' },
      fontLineHeight: { control: 'text' }
    },
    subtitleFontProps: {
      fontSize: { control: 'text' },
      fontWeight: { control: 'text' },
      fontLineHeight: { control: 'text' }
    },
    useSlide: { control: 'boolean' },
    images: { control: 'object' }
  }
}

export default meta
type Story = StoryObj<typeof GalleryV2>

export const Primary: Story = {
  args: {
    title: 'Awesome Image Gallery',
    subtitle: 'A collection of beautiful images',
    titleFontProps: {
      fontSize: '23',
      fontWeight: '500',
      fontLineHeight: '20'
    },
    subtitleFontProps: {
      fontSize: '18',
      fontWeight: '400',
      fontLineHeight: '22'
    },
    useSlide: true,
    images: mock
  },
  decorators: [
    (Story, context) => {
      return (
        <>
          <Story {...context.args} />
        </>
      )
    }
  ]
}
